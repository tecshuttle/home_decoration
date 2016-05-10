<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends MY_Controller
{

    /**
     * Index Page for this controller.
     *
     * Maps to the following URL
     *        http://example.com/index.php/welcome
     *    - or -
     *        http://example.com/index.php/welcome/index
     *    - or -
     * Since this controller is set as the default controller in
     * config/routes.php, it's displayed at http://example.com/
     *
     * So any other public methods not prefixed with an underscore will
     * map to /index.php/welcome/<method_name>
     * @see http://codeigniter.com/user_guide/general/urls.html
     */
    public function index()
    {
        $this->load->model('articles_model');
        $this->load->model('types_model');
        $this->load->model('equipments_model');

        //取铁杆文章分类
        $nav_menu = $this->types_model->get_nav_menu(234);

        //铁杆文章每分类取8篇
        foreach ($nav_menu as &$menu) {
            $articles = $this->articles_model->select(array(
                'type_id' => $menu->id,
                'is_draft' => 0,
                'sortBy' => 'ctime',
                'limit' => ($menu->id == 225 ? 8 : 9)
            ));

            $menu->articles = $articles['data'];
        }

        //取滚动图
        $this->load->model('scroll_img_model');
        $scroll_img = $this->scroll_img_model->get(array(
            'sortBy' => 'order',
            'sortDirection' => 'ASC',
            'type_id' => 0
        ));

        //取产品
        $products = $this->equipments_model->select(array(
            'type_id' => 0,
            'sortBy' => 'order',
            'sortDirection' => 'ASC',
            'limit' => 9
        ));

        //取荣归
        $go_home = $this->articles_model->select(array(
            'type_id' => 225,
            'is_draft' => '0',
            'sortBy' => 'is_hot',
            'limit' => 8
        ));

        //取官方文档
        $doc = $this->articles_model->getDoc(226);

        $data = array(
            'css' => array(),
            'js' => array(),
            'menu' => 'home',
            'nav_menu' => $nav_menu,
            'scroll_img' => $scroll_img['data'],
            'products' => $products['data'],
            'go_home' => $go_home['data'],
            'doc' => $doc
        );

        if (ENVIRONMENT === 'production') {
            $this->load->view('home', $data);
        } else {
            $this->load->view('header', $data);
            $this->load->view('home', $data);
            $this->load->view('help_center', $data);
            $this->load->view('copy_right', $data);
            $this->load->view('partner_links', $data);
            $this->load->view('footer', $data);
        }
    }
}

//end file