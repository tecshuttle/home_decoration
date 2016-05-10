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
            if ($image_oriented) {
                return $write_func($src_img, $new_file_path, $image_quality);
            }
            if ($file_path !== $new_file_path) {
                return copy($file_path, $new_file_path);
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

        $new_file_name = (round(microtime(true) * 10000)) . '.' . $info['extension'];

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
            'type_id' => $this->CI->input->post('type_id', true),
            'name' => $info['basename'],
            'ctime' => time(),
            'download' => $this->timeFileName,
            'mtime' => time()
        );

        $this->CI->gallery_model->insert($option);
    }
}

class gallery extends CI_Controller
{
    var $productBelongLinks = array(); //产品的所属分类链，用于展开相应菜单

    function __construct()
    {
        parent::__construct(); // Call the Model constructor
        $this->load->model('gallery_model');
    }

    public function save()
    {
        $config['upload_path'] = './uploads/';
        $config['allowed_types'] = 'gif|jpg|png|txt|doc|pdf';
        $config['max_size'] = '9000000'; //9MB
        $config['max_width'] = '4096';
        $config['max_height'] = '4096';

        $this->load->library('upload', $config);

        if (!$this->upload->do_upload()) {
            $error = array('error' => $this->upload->display_errors());
        } else {
            $data = array('upload_data' => $this->upload->data());
            $_POST['download'] = $this->time_file_name($data['upload_data']['full_path']);
        }

        foreach ($_POST as $key => $item) {
            if (empty($_POST[$key])) {
                unset($_POST[$key]);
            }
        }

        if (isset($_POST['id'])) {
            $_POST['ctime'] = strtotime($_POST['ctime']);
            $_POST['mtime'] = time();
            $this->gallery_model->update($_POST);
        } else {
            $_POST['ctime'] = time();
            $_POST['mtime'] = time();

            $this->gallery_model->insert($_POST);
        }

        echo json_encode(array('success' => true));
    }

    public function update()
    {
        $_POST['mtime'] = time();
        $this->gallery_model->update($_POST);

        echo json_encode(array(
            'success' => true,
            'name' => $_POST['name']
        ));
    }

    private function time_file_name($file_path)
    {
        $info = pathinfo($file_path);

        $new_file_name = (round(microtime(true) * 10000)) . '.' . $info['extension'];

        $new_file_path = $info['dirname'] . '/' . $new_file_name;

        rename($file_path, $new_file_path);

        return $new_file_name;
    }

    public function batch_submit()
    {
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

    public function getList()
    {
        $option = $_GET;
        $data = $this->gallery_model->get($option);
        echo json_encode($data);
    }

    public function delete()
    {
        $id = $_POST['id'];

        //删除图像文件
        $rows = $this->gallery_model->loadByID($id);

        $root = dirname(dirname(__DIR__));

        $ds = DIRECTORY_SEPARATOR;

        $img = $root . $ds . 'uploads' . $ds . $rows[0]->download;
        @unlink($img);

        $thumb = $root . $ds . 'uploads' . $ds . 'thumbnail' . $ds . $rows[0]->download;
        @unlink($thumb);

        //删除数据库记录
        $this->gallery_model->deleteByID($id);

        echo json_encode(array(
            'img' => $img,
            'thumb' => $thumb,
            'success' => true
        ));
    }

    public function deleteByids()
    {
        $ids = $_POST['ids'];

        $idss = explode(',', $ids);

        foreach ($idss as $id) {
            //删除图像文件
            $rows = $this->gallery_model->loadByID($id);

            $root = dirname(dirname(__DIR__));

            $ds = DIRECTORY_SEPARATOR;

            $img = $root . $ds . 'uploads' . $ds . $rows[0]->download;
            @unlink($img);

            $thumb = $root . $ds . 'uploads' . $ds . 'thumbnail' . $ds . $rows[0]->download;
            @unlink($thumb);

            //删除数据库记录
            $this->gallery_model->deleteByID($id);
        }

        echo json_encode(array(
            'img' => $ids,
            //'thumb' => $thumb,
            'success' => true
        ));
    }
}

/* End of file */