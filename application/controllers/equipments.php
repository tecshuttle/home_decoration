<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

require(dirname(__DIR__) . '/libraries/UploadHandler.php');

/**
 * 重载两个方法：
 *  handle_file_upload()
 *      1、上传文件改名
 *      2、文件记录到数据库
 *
 *  gd_create_scaled_image()
 *      1、缩略图改名
 *
 */
class MyUpload extends UploadHandler
{
    public $timeFileName;

    protected function handle_file_upload($uploaded_file, $name, $size, $type, $error, $index = null, $content_range = null)
    {
        $file = new \stdClass();
        $file->name = $this->get_file_name($uploaded_file, $name, $size, $type, $error, $index, $content_range);
        $file->size = $this->fix_integer_overflow(intval($size));
        $file->type = $type;
        if ($this->validate($uploaded_file, $file, $error, $index)) {
            $this->handle_form_data($file, $index);
            $upload_dir = $this->get_upload_path();
            if (!is_dir($upload_dir)) {
                mkdir($upload_dir, $this->options['mkdir_mode'], true);
            }
            $file_path = $this->get_upload_path($file->name);
            $append_file = $content_range && is_file($file_path) && $file->size > $this->get_file_size($file_path);
            if ($uploaded_file && is_uploaded_file($uploaded_file)) {
                // multipart/formdata uploads (POST method uploads)
                if ($append_file) {
                    file_put_contents(
                        $file_path,
                        fopen($uploaded_file, 'r'),
                        FILE_APPEND
                    );
                } else {
                    move_uploaded_file($uploaded_file, $file_path);
                }
            } else {
                // Non-multipart uploads (PUT method support)
                file_put_contents(
                    $file_path,
                    fopen('php://input', 'r'),
                    $append_file ? FILE_APPEND : 0
                );
            }
            $file_size = $this->get_file_size($file_path, $append_file);
            if ($file_size === $file->size) {
                $file->url = $this->get_download_url($file->name);
                if ($this->is_valid_image_file($file_path)) {
                    $this->handle_image_file($file_path, $file);
                }
            } else {
                $file->size = $file_size;
                if (!$content_range && $this->options['discard_aborted_uploads']) {
                    unlink($file_path);
                    $file->error = $this->get_error_message('abort');
                }
            }
            $this->set_additional_file_properties($file);
        }

        $this->rename_time_file($file_path);

        return $file;
    }

    protected function gd_create_scaled_image($file_name, $version, $options)
    {
        if (!function_exists('imagecreatetruecolor')) {
            error_log('Function not found: imagecreatetruecolor');
            return false;
        }
        list($file_path, $new_file_path) = $this->get_scaled_image_file_paths($file_name, $version);

        $type = strtolower(substr(strrchr($file_name, '.'), 1));
        switch ($type) {
            case 'jpg':
            case 'jpeg':
                $src_func = 'imagecreatefromjpeg';
                $write_func = 'imagejpeg';
                $image_quality = isset($options['jpeg_quality']) ?
                    $options['jpeg_quality'] : 75;
                break;
            case 'gif':
                $src_func = 'imagecreatefromgif';
                $write_func = 'imagegif';
                $image_quality = null;
                break;
            case 'png':
                $src_func = 'imagecreatefrompng';
                $write_func = 'imagepng';
                $image_quality = isset($options['png_quality']) ?
                    $options['png_quality'] : 9;
                break;
            default:
                return false;
        }
        $src_img = $this->gd_get_image_object(
            $file_path,
            $src_func,
            !empty($options['no_cache'])
        );
        $image_oriented = false;
        if (!empty($options['auto_orient']) && $this->gd_orient_image(
                $file_path,
                $src_img
            )
        ) {
            $image_oriented = true;
            $src_img = $this->gd_get_image_object(
                $file_path,
                $src_func
            );
        }
        $max_width = $img_width = imagesx($src_img);
        $max_height = $img_height = imagesy($src_img);
        if (!empty($options['max_width'])) {
            $max_width = $options['max_width'];
        }
        if (!empty($options['max_height'])) {
            $max_height = $options['max_height'];
        }
        $scale = min(
            $max_width / $img_width,
            $max_height / $img_height
        );
        if ($scale >= 1) {
            //xx: 这里加了两个图片改名.原因,原图小于缩略图,原代码会直接返回.

            if ($image_oriented) {
                $sr = $write_func($src_img, $new_file_path, $image_quality);
                //先处理小图，再处理原图。在此处，先把文件名记下来。处理原图时，直接用这个文件名。
                $this->timeFileName = $this->time_file_name($new_file_path);
                return $sr;
            }
            if ($file_path !== $new_file_path) {
                $sr = copy($file_path, $new_file_path);
                //先处理小图，再处理原图。在此处，先把文件名记下来。处理原图时，直接用这个文件名。
                $this->timeFileName = $this->time_file_name($new_file_path);
                return $sr;
            }

            return true;
        }
        if (!empty($options['crop'])) {
            $new_width = $img_width * $scale;
            $new_height = $img_height * $scale;
            $dst_x = 0;
            $dst_y = 0;
            $new_img = imagecreatetruecolor($new_width, $new_height);
        } else {
            if (($img_width / $img_height) >= ($max_width / $max_height)) {
                $new_width = $img_width / ($img_height / $max_height);
                $new_height = $max_height;
            } else {
                $new_width = $max_width;
                $new_height = $img_height / ($img_width / $max_width);
            }
            $dst_x = 0 - ($new_width - $max_width) / 2;
            $dst_y = 0 - ($new_height - $max_height) / 2;
            $new_img = imagecreatetruecolor($max_width, $max_height);
        }
        // Handle transparency in GIF and PNG images:
        switch ($type) {
            case 'gif':
            case 'png':
                imagecolortransparent($new_img, imagecolorallocate($new_img, 0, 0, 0));
            case 'png':
                imagealphablending($new_img, false);
                imagesavealpha($new_img, true);
                break;
        }
        $success = imagecopyresampled(
                $new_img,
                $src_img,
                $dst_x,
                $dst_y,
                0,
                0,
                $new_width,
                $new_height,
                $img_width,
                $img_height
            ) && $write_func($new_img, $new_file_path, $image_quality);
        $this->gd_set_image_object($file_path, $new_img);

        //先处理小图，再处理原图。在此处，先把文件名记下来。处理原图时，直接用这个文件名。
        $this->timeFileName = $this->time_file_name($new_file_path);

        return $success;
    }

    private function time_file_name($file_path)
    {
        $info = pathinfo($file_path);

        $new_file_name = guid() . '.' . $info['extension'];

        $new_file_path = $info['dirname'] . '/' . $new_file_name;

        rename($file_path, $new_file_path);

        return $new_file_name;
    }

    private function rename_time_file($file_path)
    {
        $info = pathinfo($file_path);

        //print_r($info);

        $new_file_path = $info['dirname'] . '/' . $this->timeFileName;

        rename($file_path, $new_file_path);

        //把图片入数据库
        $option = array(
            'pid' => $this->CI->input->post('product_id', true),
            'name' => $info['basename'],
            'ctime' => time(),
            'download' => $this->timeFileName,
            'mtime' => time()
        );

        $this->CI->equipments_gallery_model->insert($option);
    }
}


class equipments extends MY_Controller
{
    var $productBelongLinks = array(); //产品的所属分类链，用于展开相应菜单

    function __construct()
    {
        parent::__construct(); // Call the Model constructor
        $this->load->model('equipments_model');
        $this->load->model('equipments_size_model');
    }

    public function index($tag_id, $page)
    {
        //取产品列表
        $this->load->model('equipments_model');

        $per_page = 10;

        $option = array(
            'sortBy' => array(
                array('sortBy' => 'type_id', 'sortDirection' => 'DESC'),
                array('sortBy' => 'order', 'sortDirection' => 'ASC')
            ),
            'limit' => $per_page,
            'offset' => ($page - 1) * $per_page
        );

        if ($tag_id != 0) {
            $this->load->model('equipments_tagged_model');
            $ids = $this->equipments_tagged_model->getTeamIDByTagID($tag_id);
            $option['ids'] = $ids;
        }

        $matchs = $this->equipments_model->select($option);

        //取产品分类
        $sql = 'select * from equipments_tag order by `order` asc';
        $rows = $this->db->query($sql);

        $data = array(
            'title' => '比赛',
            'css' => array(),
            'js' => array(),
            'menu' => 'product',
            'tags' => $rows->result(),
            'tag_id' => $tag_id,
            'matchs' => $matchs,
            'pager' => build_pagebar($matchs['total'], $per_page, $page, '/equipments/' . $tag_id . '/__page__')
        );

        if (ENVIRONMENT === 'production') {
            $this->load->view('product_list', $data);
        } else {
            $this->load->view('header', $data);
            $this->load->view('product/list', $data);
            $this->load->view('copy_right', $data);
            $this->load->view('footer', $data);
        }
    }

    //在内容区加载产品
    public function load_product()
    {
        $article = $_POST['product'];
        echo $this->load->view('products/' . $article, true);
    }

    //从菜单项，加载产品
    public function load_article()
    {
        $article = $_POST['article'];
        echo $this->load->view('products/' . $article, true);
    }

    public function match($id)
    {
        //取产品
        $this->load->model('equipments_model');
        $match = $this->equipments_model->select(array(
            'id' => $id
        ));

        //取产品图库
        $this->load->model('equipments_gallery_model');
        $galleries = $this->equipments_gallery_model->get(array(
            'pid' => $id
        ));

        //取产品分类
        if (!empty($match->tag_id)) {
            $this->load->model('tag_model');
            $tag = $this->tag_model->getByID($match->tag_id);
            $match->tag_name = $tag->name;
        }

        //取相关产品
        $match->relative_product = $this->equipments_model->getRelative($match->relative);


        //取产品排行
        $products = $this->equipments_model->select(array(
            'sortBy' => 'order',
            'sortDirection' => 'ASC',
            'limit' => 9
        ));

        $match->seat_desc = '<p>' . preg_replace('/\n/', '<p>', $match->seat_desc);

        //取销售条件
        $this->load->model('site_settings_model');
        $terms = $this->site_settings_model->getValues(array(
            'SALE_TERM_PAYMENT', 'SALE_TERM_BOOKING', 'SALE_TERM_CANCEL',
            'SALE_TERM_BUY', 'SALE_TERM_DELIVERY'
        ));


        $data = array(
            'title' => '比赛',
            'css' => array(),
            'js' => array(),
            'menu' => 'product',
            'match' => $match,
            'products' => $products['data'],
            'galleries' => $galleries['data'],
            'terms' => $terms
        );

        if (ENVIRONMENT === 'production') {
            $this->load->view('product_detail', $data);
        } else {
            $this->load->view('header', $data);
            $this->load->view('product/match', $data);
            $this->load->view('copy_right', $data);
            $this->load->view('footer', $data);
        }
    }

    public function save()
    {
        //标签数组转换为字符串
        if (isset($_POST['tag_id'])) {
            $_POST['tag_id'] = implode(',', $_POST['tag_id']);
        } else {
            $_POST['tag_id'] = '';
        }

        $logo = $this->upload_product_cover('file_logo');
        $_POST['logo'] = ($logo == '' ? $_POST['logo'] : '/uploads/' . $logo);

        $cover = $this->upload_product_cover('file_cover');
        $_POST['cover'] = ($cover == '' ? '' : '/uploads/' . $cover);

        $cover1 = $this->upload_product_cover('file_cover1');
        $_POST['cover1'] = ($cover1 == '' ? '' : '/uploads/' . $cover1);

        $cover2 = $this->upload_product_cover('file_cover2');
        $_POST['cover2'] = ($cover2 == '' ? '' : '/uploads/' . $cover2);

        $cover3 = $this->upload_product_cover('file_cover3');
        $_POST['cover3'] = ($cover3 == '' ? '' : '/uploads/' . $cover3);

        if ($cover != '') {
            $_POST['cover'] = '/uploads/' . $cover;
        }

        foreach ($_POST as $key => $item) {
            if ($key === 'type_id' || $key === 'id' || $key === 'tag_id' || $key === 'is_hot' || $key === 'desc' || $key === 'keywords') continue; //指定允许空值的字段

            if (empty($_POST[$key])) {
                unset($_POST[$key]);
            }
        }

        if ($_POST['id'] == 0) {
            $_POST['ctime'] = time();
            $_POST['mtime'] = time();
            $this->equipments_model->insert($_POST);
            $pid = $this->db->insert_id();
        } else {
            $pid = $_POST['id'];
            $_POST['mtime'] = time();
            $this->equipments_model->update($_POST);
        }

        //增加标签记录
        $this->update_tagging($pid, $_POST['tag_id']);

        echo json_encode(array('success' => true));
    }

    private function update_tagging($id, $tag_id_str)
    {
        $this->load->model('equipments_tagged_model');
        $this->equipments_tagged_model->deleteByPID($id);

        if ($tag_id_str === '') return;

        $tagging = explode(',', $tag_id_str);

        foreach ($tagging as $tag_id) {

            $this->equipments_tagged_model->insert(array(
                'team_id' => $id,
                'tag_id' => $tag_id
            ));
        }
    }

    public function size_save()
    {
        if ($_POST['id'] == 0) {
            $_POST['ctime'] = time();
            $_POST['mtime'] = time();
            $this->equipments_size_model->insert($_POST);
        } else {
            $_POST['mtime'] = time();
            $this->equipments_size_model->update($_POST);
        }

        echo json_encode(array('success' => true));
    }


    private function upload_product_cover($name)
    {
        $config['upload_path'] = './uploads/';
        $config['allowed_types'] = 'gif|jpg|png|jpeg';
        $config['max_size'] = '9000000'; //9MB
        $config['max_width'] = '5024';
        $config['max_height'] = '5024';

        $this->load->library('upload', $config);

        if (!$this->upload->do_upload($name)) {
            $error = array('error' => $this->upload->display_errors());
            //print_r($error);
            return '';
        }

        $data = array('upload_data' => $this->upload->data());

        return $this->time_file_name($data['upload_data']['full_path'], $name);
    }

    public function batch_submit()
    {
        $this->load->model('equipments_gallery_model');

        $option = array(
            'image_versions' => array(
                'thumbnail' => array(
                    'max_width' => 200,
                    'max_height' => 200
                )
            )
        );

        $upload = new MyUpload($option, false);
        $upload->initialize($this);
    }

    public function search_home()
    {
        $keyword = $_POST['filter']['filters'][0]['value'];

        $rows = $this->equipments_model->search_home($keyword);

        echo json_encode($rows);
    }

    private function time_file_name($file_path, $name = '')
    {
        $info = pathinfo($file_path);

        $new_file_name = guid() . '.' . $info['extension'];

        $new_file_path = $info['dirname'] . '/' . $new_file_name;

        //resize image
        if ($name === 'file_cover' or $name === 'file_cover1' or $name === 'file_cover2' or $name === 'file_cover3') {
            include_once dirname(dirname(dirname(__FILE__))) . '/resizeImage.php';

            $src_img = $file_path;
            $dst_img = $new_file_path;

            if ($name === 'file_cover') {
                new resizeImage($src_img, "370", "224", "0", $dst_img);
            }

            if ($name === 'file_cover1' or $name === 'file_cover2' or $name === 'file_cover3') {
                new resizeImage($src_img, "484", "272", "0", $dst_img);
            }

            unlink($file_path);
        } else {
            rename($file_path, $new_file_path);
        }

        return $new_file_name;
    }


    public function getList()
    {
        $option = (empty($_POST) ? $_GET : $_POST);
        $data = $this->equipments_model->getProduct($option);
        echo json_encode($data);
    }

    public function getGalleryList()
    {
        $option = $_GET;

        $this->load->model('equipments_gallery_model');
        $data = $this->equipments_gallery_model->get($option);
        echo json_encode($data);
    }

    public function orderGalleryByids()
    {
        $this->load->model('equipments_gallery_model');

        $ids = $_POST['ids'];

        //print_r($ids);

        foreach ($ids as $weight => $id) {
            $this->equipments_gallery_model->update(array(
                'id' => $id,
                'weight' => $weight
            ));
        }

    }

    public function deleteGalleryByids()
    {
        $this->load->model('equipments_gallery_model');

        $ids = $_POST['ids'];

        $idss = explode(',', $ids);

        foreach ($idss as $id) {
            //删除图像文件
            $rows = $this->equipments_gallery_model->loadByID($id);

            $root = dirname(dirname(__DIR__));

            $ds = DIRECTORY_SEPARATOR;

            $img = $root . $ds . 'uploads' . $ds . $rows[0]->download;
            @unlink($img);

            $thumb = $root . $ds . 'uploads' . $ds . 'thumbnail' . $ds . $rows[0]->download;
            @unlink($thumb);

            //删除数据库记录
            $this->equipments_gallery_model->deleteByID($id);
        }

        echo json_encode(array(
            'img' => $ids,
            'success' => true
        ));
    }

    public function getTagList()
    {
        $data = $this->equipments_model->getTagList();
        echo json_encode($data);
    }

    public function getSizeList()
    {
        $option = (empty($_POST) ? $_GET : $_POST);
        $data = $this->equipments_size_model->select($option);
        echo json_encode($data);
    }

    public function delete()
    {
        $id = $_POST['id'];

        $this->equipments_model->deleteByID($id);

        echo json_encode(array(
            'success' => true
        ));
    }

    public function size_delete()
    {
        $id = $_POST['id'];

        $this->equipments_size_model->deleteByID($id);

        echo json_encode(array(
            'success' => true
        ));
    }

    public function clone_from_id()
    {
        $id = $_POST['id'];

        $this->products_model->clone_from_id($id);

        echo json_encode(array(
            'success' => true
        ));
    }
}

/* End of file */