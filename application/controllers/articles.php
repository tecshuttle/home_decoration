<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class articles extends MY_Controller
{
    function __construct()
    {
        parent::__construct(); // Call the Model constructor
        $this->load->model('articles_model');
        $this->load->model('equipments_model');
        $this->load->model('types_model');

        $this->menu = array(
            225 => 'back',
            223 => 'travel',
            227 => 'news',
            233 => 'fan',
        );
    }

    public function index()
    {
        $data = array(
            'title' => 'Article',
            'menu' => '',
            'css' => array(),
            'js' => array()
        );

        $this->load->view('header', $data);
        $this->load->view('building');
        $this->load->view('footer', $data);
    }

    public function load_article()
    {
        $article = $_POST['article'];
        echo $this->load->view('about_us/' . $article, true);
    }


    public function loadByID()
    {
        $id = $_POST['id'];
        $article = $this->articles_model->loadByID($id);

        $gallery = '';
        if (trim($article->picture_gallery) != '') {
            $pictures = explode("\n", trim($article->picture_gallery));
            $gallery = $this->load->view('news/gallery', array('pictures' => $pictures), true);
        }

        echo $article->content . $gallery;
    }

    public function save()
    {

        $cover = $this->upload_file('product_cover');
        $download = $this->upload_file('userfile');

        $_POST['cover'] = ($cover == '' ? '' : '/uploads/' . $cover);
        $_POST['download'] = ($download == '' ? '' : $download);

        foreach ($_POST as $key => $item) {
            if ($key === 'is_draft' || $key === 'is_hot' || $key === 'tag' ||
                $key === 'desc' || $key === 'keywords'
            ) continue; //指定允许空值的字段

            if (empty($_POST[$key])) {
                unset($_POST[$key]);
            }
        }

        if (isset($_POST['id'])) {
            if (isset($_POST['is_draft'])) {
                //不设置时间
            } else {
                $_POST['ctime'] = strtotime($_POST['ctime']);
                $_POST['mtime'] = time();
            }

            $this->articles_model->update($_POST);
        } else {
            $_POST['ctime'] = time();
            $_POST['mtime'] = time();
            $this->articles_model->insert($_POST);
        }

        echo json_encode(array('success' => true));
    }

    private function upload_file($name)
    {
        $config['upload_path'] = './uploads/';
        $config['allowed_types'] = 'gif|jpg|png|txt|doc|pdf';
        $config['max_size'] = '9000000'; //9MB
        $config['max_width'] = '5096';
        $config['max_height'] = '5096';

        $this->load->library('upload', $config);

        if (!$this->upload->do_upload($name)) {
            $error = array('error' => $this->upload->display_errors());
            //print_r($error);
            return '';
        }

        $data = array('upload_data' => $this->upload->data());

        return $this->time_file_name($data['upload_data']['full_path'], $name);
    }

    private function time_file_name($file_path, $name = '')
    {
        $info = pathinfo($file_path);

        $new_file_name = guid() . '.' . $info['extension'];

        $new_file_path = $info['dirname'] . '/' . $new_file_name;

        //rename($file_path, $new_file_path);

        //resize image
        if ($name === 'product_cover') {
            include_once dirname(dirname(dirname(__FILE__))) . '/resizeImage.php';

            $src_img = $file_path;
            $dst_img = $new_file_path;
            new resizeImage($src_img, "484", "272", "0", $dst_img);

            unlink($file_path);
        } else {
            rename($file_path, $new_file_path);
        }

        return $new_file_name;
    }

    public function getList()
    {
        $option = $_GET;

        if (isset($option['type_id'])) {
            $data = $this->articles_model->get($option);
            echo json_encode($data);
        }
    }

    public function add_rand_pv()
    {
        $query = $this->db->query('select id, name, pv from articles');
        $articles = $query->result();

        foreach ($articles as $a) {
            $this->articles_model->pv_inc($a->id, rand(10, 100));
        }

        $log_file = dirname(dirname(dirname(__FILE__))) . DIRECTORY_SEPARATOR . 'add_rand_pv.log';

        $log = '[' . date('Y-m-d H:i:s') . '] add rand(10, 100) pv for each articles of (' . count($articles) . ").\n";

        file_put_contents($log_file, $log, FILE_APPEND);

        echo $log;
    }

    public function cat($cat_id, $page)
    {
        //取滚动图
        $this->load->model('scroll_img_model');
        $scroll_img = $this->scroll_img_model->get(array(
            'sortBy' => 'order',
            'sortDirection' => 'ASC',
            'type_id' => $cat_id
        ));

        //取文章内容
        $per_page = 10;

        $articles = $this->articles_model->select(array(
            'type_id' => $cat_id,
            'is_draft' => 0,
            'sortBy' => 'ctime',
            'limit' => $per_page,
            'offset' => ($page - 1) * $per_page
        ));

        foreach ($articles['data'] as &$a) {
            //markdown文章转义
            if ($a->editor === 'markdown') {
                $parse_down = new Parsedown();
                $a->content = $parse_down->text($a->content);
            }
            //$a->digest = mb_substr(strip_tags($a->content), 0, 370);
            $a->digest = '<p>' . preg_replace('/\n/', '<p>', $a->desc);
        }

        //取分类信息
        $cat = $this->types_model->getByID($cat_id);

        //取热文
        $hot_articles = $this->articles_model->select(array(
            'type_id' => $cat_id,
            'is_draft' => 0,
            'sortBy' => 'pv',
            'limit' => 10
        ));

        //取产品
        $products = $this->equipments_model->select(array(
            'sortBy' => 'order',
            'sortDirection' => 'ASC',
            'limit' => 9
        ));

        $data = array(
            'title' => '文章列表',
            'css' => array(),
            'js' => array(),
            'menu' => $this->menu[$cat_id],
            'cat' => $cat,
            'scroll_img' => $scroll_img['data'],
            'articles' => $articles['data'],
            'products' => $products['data'],
            'hot_articles' => $hot_articles['data'],
            'pager' => build_pagebar($articles['total'], $per_page, $page, '/cat/' . $cat_id . '/__page__')
        );

        if (ENVIRONMENT === 'production') {
            $this->load->view('article_list', $data);
        } else {
            $this->load->view('header', $data);
            $this->load->view('pages/cat', $data);
            $this->load->view('copy_right', $data);
            $this->load->view('footer', $data);
        }
    }

    public function getDownloadList()
    {
        $type_id = $_GET['type_id'];
        $page = $_GET['page'];

        $list = $this->articles_model->getDownloadList($_GET);

        $data = array(
            'list' => $list['data'],
            'pager' => $this->build_pagebar($list['total'], 10, $page, '/adf/__page__', $type_id)
        );

        echo $this->load->view('supports_services/download-center', $data, true);
    }

    public function getDownloadListSearch()
    {
        $keyword = $_POST['keyword'];

        $list = $this->articles_model->getDownloadListSearch($keyword);

        $data = array(
            'list' => $list['data'],
            'pager' => ''
        );

        echo $this->load->view('supports_services/download-center', $data, true);
    }

    public function getListByType()
    {
        $type_id = $_POST['type_id'];

        $data = $this->articles_model->getListByType($type_id);

        echo json_encode($data);
    }

    public function loadNewsList()
    {
        $type_id = $_POST['type_id'];
        //$page = $_GET['page'];

        $list = $this->articles_model->getListByType($type_id);

        $this->load->model('types_model');

        $data = array(
            'type_info' => $this->types_model->getByID($type_id),
            'list' => $list,
            'pager' => '' //$this->build_pagebar($list['total'], 20, $page, '/adf/__page__', $type_id)
        );

        echo $this->load->view('news/news-list', $data, true);
    }

    public function loadSupportsServicesList()
    {
        $type_id = $_POST['type_id'];

        $list = $this->articles_model->getListByType($type_id);

        $this->load->model('types_model');

        $data = array(
            'type_info' => $this->types_model->getByID($type_id),
            'list' => $list,
            'pager' => ''
        );

        echo $this->load->view('supports_services/category-list', $data, true);
    }

    /**
     * 生成分页条
     *
     * @param integer $total 总记录数
     * @param integer $perpage 每页显示记录数
     * @param integer $page 当前页码
     * @param string $url 链接,其中的__page__将用页码替换
     *
     * @return string
     */
    function build_pagebar($total, $perpage, $page, $url, $type_id = 0)
    {
        $pages = ceil($total / $perpage);
        $page = $page <= 0 ? 1 : $page;

        $total = $total <= 0 ? 1 : $total;

        /*
        if (false === strpos($url, ".") && substr($url, -1) != '/')
        {
            $url .= '/';
        }
        */

        $html = '<div class="pagination"><ul class="clearfix">';

        if ($pages <= 11) {
            $start = 1;
            $end = $pages;
        } else if ($page > 6 && $page + 5 <= $pages) {
            $start = $page - 5;
            $end = $page + 5;
        } else if ($page + 5 > $pages) {
            $start = $pages - 10;
            $end = $pages;
        } else if ($page <= 6) {
            $start = 1;
            $end = 11;
        }

        //
        if ($page == 1) {
            $html .= "<li><a>Prev</a></li>";
        } else {
            //$html .= "<li><a href=\"" . str_replace("__page__", $page - 1, $url) . "\">Prev</a></li>";
            $html .= "<li><a href=\"javascript: getDownloadList(" . $type_id . ", " . ($page - 1) . ");\">Prev</a></li>";
        }

        if ($start > 1) {
            $html .= "<li><a href=\"" . str_replace("__page__", 1, $url) . "\">1</a></li>";
        }

        if ($start > 2) {
            $html .= "<li><a href=\"" . str_replace("__page__", 2, $url) . "\">2</a></li>";
        }

        if ($start > 3) {
            $html .= "<li><a>...</a></li>";
        }

        for ($i = $start; $i <= $end; $i++) {
            if ($page == $i) {
                $html .= "<li class=\"active\"><a href=\"javascript: void(0)\">$i</li>";
            } else {
                $html .= "<li><a href=\"javascript: getDownloadList(" . $type_id . ", " . $i . ");\">$i</a></li>";
            }
        }

        if ($end < $pages - 1) {
            $html .= "<li><a>...</a></li>";
        }

        if ($end < $pages) {
            $html .= "<li><a href=\"" . str_replace("__page__", $pages, $url) . "\">$pages</a></li>";
        }

        if ($page >= $pages) {
            $html .= "<li><a>Next</a></li>";
        } else {
            //$html .= "<li><a href=\"" . str_replace("__page__", $page + 1, $url) . "\">Next</a></li>";
            $html .= "<li><a href=\"javascript: getDownloadList(" . $type_id . ", " . ($page + 1) . ");\">Next</a></li>";
        }

        $html .= "</ul></div>";

        return $html;
    }


    public function delete()
    {
        $id = $_POST['id'];

        $this->articles_model->deleteByID($id);

        echo json_encode(array(
            'success' => true
        ));
    }
}

/* End of file */