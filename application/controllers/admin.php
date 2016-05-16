<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class admin extends MY_Controller
{
    public function index()
    {
        $admin = false;
        if (isset($_SESSION['admin'])) {
            $admin = $_SESSION['admin'];
        } else if (isset($_COOKIE['admin'])) {
            $admin = $_COOKIE['admin'];
        }

        if (!$admin) {
            header('Location: /admin/login');
        }

        $data = array(
            'user' => $admin,
            'title' => 'admin',
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs4/resources/css/ext-all.css',
                '/css/admin/themes/css/index.css',
                '/css/admin/themes/css/common.css'
            ),
            'js' => array(
                '/js/extjs4/bootstrap.js',
                '/js/extjs4/locale/ext-lang-zh_CN.js',
                '/js/extjs4/ux/TabCloseMenu.js',
                '/js/admin/main/menuConfig.js',
                '/js/admin/main/main.js'
            )
        );

        $this->load->view('admin/home_header', $data);
        $this->load->view('admin/script', $data);
    }

    //显示登入页面
    public function login()
    {
        $data = array(
            'title' => '后台登入',
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs4/resources/css/ext-all.css',
                '/css/admin/themes/ijobs-v3/css/index.css',
                '/css/admin/themes/ijobs-v3/css/ijobs.css'

            ),
            'js' => array(
                '/js/extjs4/bootstrap.js',
                '/js/admin/login_form.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    //登入验证
    public function login2()
    {
        $name = $_POST['name'];
        $password = $_POST['password'];

        $users = array(
            'admin' => 'admin',
            'user' => 'user',
            'system' => 'system',
            'dba' => 'dba',
            'guest' => 'guest'
        );

        if (isset($users[$name])) {
            if ($users[$name] == $password) {
                $_SESSION['admin'] = $name;

                $expire = time() + 30 * 86400; // 30 day
                setcookie('admin', $name, $expire, '/');

                echo json_encode(array(
                    'success' => true
                ));
            } else {
                echo json_encode(array(
                    'success' => false,
                    'msg' => 'password incorrect'
                ));
            }
        } else {
            echo json_encode(array(
                'success' => false,
                'msg' => 'no user'
            ));
        }
    }

    public function logout()
    {
        unset($_SESSION['admin']);

        $expire = -1;
        setcookie('admin', '', $expire, '/');

        $this->login();
    }


    public function articles()
    {
        $data = array(
            'msg' => 'admin-文章',
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs6/build/MyApp-all.css',
                '/styles/kendo.bootstrap.min.css',
                '/styles/kendo.common-bootstrap.min.css',
                '/css/admin.css',
                '/css/gallery.css'
            ),
            'js' => array(
                '/js/extjs6/ext-all.js',
                '/js/admin/common/columnAction.js',
                '/js/jquery-1.9.1.min.js',
                '/js/admin/ke_config.js',
                '/js/kendo.all.min.js',
                '/js/moment.js',
                '/js/extjs6/ux/classic/src/DataView/DragSelector.js',
                '/js/admin/gallery_picker_grid.js',
                '/js/admin/gallery_picker.js',
                '/js/admin/Articleform.js',
                '/js/admin/Articlegrid.js',
                '/js/admin/Articletypeinfo.js',
                '/js/admin/Articletree.js',
                '/js/admin/Articlepanel.js',
                '/js/admin/articles.js',
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function gallery()
    {
        $data = array(
            'msg' => 'Admin-Gallery',
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs6/build/MyApp-all.css',
                '/css/gallery.css'
            ),
            'js' => array(
                '/js/extjs6/ext-all.js',
                '/js/extjs6/ux/classic/src/DataView/DragSelector.js',
                '/js/extjs6/ux/classic/src/DataView/LabelEditor.js',
                '/js/jquery.min.js',
                '/js/jQuery-File-Upload/jquery.ui.widget.js',
                '/js/jQuery-File-Upload/jquery.fileupload.js',
                '/js/admin/gallery_batch_panel.js',
                '/js/admin/gallery_form.js',
                '/js/admin/gallery_grid.js',
                '/js/admin/gallery.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }


    public function equipments()
    {
        $data = array(
            'msg' => 'admin-产品',
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs6/build/MyApp-all.css',
                '/styles/kendo.bootstrap.min.css',
                '/styles/kendo.common-bootstrap.min.css',
                '/css/admin.css',
                '/css/gallery.css'
            ),
            'js' => array(
                '/js/extjs6/ext-all.js',
                '/js/jquery-1.9.1.min.js',
                '/js/jQuery-File-Upload/jquery.ui.widget.js',
                '/js/jQuery-File-Upload/jquery.fileupload.js',
                '/js/kendo.all.min.js',
                '/js/admin/ke_config.js',
                '/js/moment.js',
                '/js/extjs6/ux/classic/src/DataView/DragSelector.js',
                '/js/extjs6/ux/classic/src/DataView/LabelEditor.js',
                '/js/admin/gallery_picker_grid.js',
                '/js/admin/gallery_picker.js',
                '/js/admin/equipments_form.js',
                '/js/admin/equipments.js',
                '/js/admin/equipments_gallery.js',
                '/js/admin/equipments_size.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }


    public function faqs()
    {
        $data = array(
            'msg' => 'admin-' . __FUNCTION__,
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs4/resources/css/ext-all.css',
                '/css/admin/themes/ijobs-v3/css/index.css',
                '/css/admin/themes/ijobs-v3/css/ijobs.css'
            ),
            'js' => array(
                '/js/extjs4/bootstrap.js',
                '/js/admin/common/common.js',
                '/js/admin/common/utils.js',
                '/js/admin/common/ux/LinkColumn.js',
                '/js/admin/grid.js',
                '/js/admin/faqs.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function users()
    {
        $data = array(
            'msg' => 'admin-' . __FUNCTION__,
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs4/resources/css/ext-all.css',
                '/css/admin/themes/ijobs-v3/css/index.css',
                '/css/admin/themes/ijobs-v3/css/ijobs.css'
            ),
            'js' => array(
                '/js/extjs4/bootstrap.js',
                '/js/admin/common/common.js',
                '/js/admin/common/utils.js',
                '/js/admin/common/ux/LinkColumn.js',
                '/js/admin/grid.js',
                '/js/admin/users.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }


    public function settings()
    {
        $data = array(
            'msg' => 'admin-' . __FUNCTION__,
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs6/build/MyApp-all.css',
                '/styles/kendo.bootstrap.min.css',
                '/styles/kendo.common-bootstrap.min.css',
                '/css/admin.css',
                '/css/gallery.css'
            ),
            'js' => array(
                '/js/extjs6/ext-all.js',
                '/js/admin/common/columnAction.js',
                '/js/jquery-1.9.1.min.js',
                '/js/admin/ke_config.js',
                '/js/kendo.all.min.js',
                '/js/moment.js',
                '/js/MyApp/ext/packages/ux/classic/src/DataView/DragSelector.js',
                '/js/admin/gallery_picker_grid.js',
                '/js/admin/gallery_picker.js',
                '/js/admin/grid.js',
                '/js/admin/grid_form.js',
                '/js/admin/settings.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }


    //铁杆服务主题
    public function tags()
    {
        $data = array(
            'msg' => 'admin-' . __FUNCTION__,
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs6/build/MyApp-all.css',
                '/css/admin.css'
            ),
            'js' => array(
                '/js/extjs6/ext-all.js',
                '/js/admin/common/columnAction.js',
                '/js/moment.js',
                '/js/admin/grid.js',
                '/js/admin/grid_form.js',
                '/js/admin/tags.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    //滚动图设置
    public function scroll_img()
    {
        $data = array(
            'msg' => 'admin-' . __FUNCTION__,
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs6/build/MyApp-all.css',
                '/css/admin.css'
            ),
            'js' => array(
                '/js/extjs6/ext-all.js',
                '/js/admin/common/columnAction.js',
                '/js/moment.js',
                '/js/admin/grid.js',
                '/js/admin/grid_form.js',
                '/js/admin/scroll_img.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function accounts()
    {
        $data = array(
            'msg' => 'admin-' . __FUNCTION__,
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs6/build/MyApp-all.css'
            ),
            'js' => array(
                '/js/extjs6/ext-all.js',
                '/js/admin/common/columnAction.js',
                '/js/admin/grid.js',
                '/js/admin/grid_account_form.js',
                '/js/admin/accounts.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }


    public function gridDelete()
    {
        $id = $_POST['id'];
        $option = $_POST;
        $model = $option['module'] . '_model';

        $this->load->model($model);
        $this->$model->deleteByID($id);

        echo json_encode(array(
            'success' => true
        ));
    }

    public function products_tree()
    {
        $tree = $this->get_tree('products');
        echo json_encode($tree);
    }

    public function articles_tree()
    {
        $tree = $this->get_tree('articles');
        echo json_encode($tree);
    }

    public function gallery_tree()
    {
        $tree = $this->get_tree('gallery');
        echo json_encode($tree);
    }

    private function get_tree($type_name)
    {
        $this->load->model('types_model');

        $data = $this->types_model->get_menu($type_name);

        //数据为空，自动建一个“初始条目”。
        if (count($data) === 0) {
            $this->types_model->init_menu_root($type_name);
            $data = $this->types_model->get_menu($type_name);
        }

        $menu = array();

        //取根分类
        foreach ($data as $key => $row) {
            if ($row->belong == 0) {
                $id = $row->id;
                array_push($menu, array(
                    'text' => $row->name,
                    'id' => $id
                ));
            }
        }

        foreach ($menu as $i => $item) {
            $menu[$i] = $this->get_submenu($item, $data);
        }

        return $menu;
    }

    //递归查询子分类
    public function get_submenu($item, $data)
    {
        $sub = array();
        foreach ($data as $j => $row) {
            if ($row->belong == $item['id']) {
                array_push($sub, array(
                    'text' => $row->name,
                    'id' => $row->id
                ));
            }
        }


        if (count($sub) == 0) {
            $item['leaf'] = true;
        } else {
            foreach ($sub as $j => $ob) {
                $sub[$j] = $this->get_submenu($ob, $data);
            }
            $item['children'] = $sub;
        }

        return $item;
    }


    public function getTypeInfo()
    {
        $this->load->model('types_model');

        $data = $this->types_model->getByID($_POST['id']);
        echo json_encode($data);
    }

    public function saveTypeInfo()
    {
        $this->load->model('types_model');
        $data = $this->types_model->saveTypeInfo($_POST);
    }

    public function addType()
    {
        $this->load->model('types_model');
        $this->types_model->addType($_POST);

        echo json_encode(array(
            'success' => true
        ));
    }

    public function deleteType()
    {
        $this->load->model('types_model');

        $this->types_model->deleteByID($_POST['id']);

        echo json_encode(array(
            'success' => true
        ));
    }

    public function weixin()
    {
        $data = array(
            'msg' => '微信设置',
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs4/resources/ext-theme-neptune/ext-theme-neptune-all.css',
                '/css/admin.css'
            ),
            'js' => array(
                '/js/extjs4/bootstrap.js',
                '/js/extjs4/locale/ext-lang-zh_CN.js',
                '/js/admin/common/ux/LinkColumn.js',
                '/js/admin/weixin.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function func_log()
    {
        $data = array(
            'msg' => '日志',
            //'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs4/resources/ext-theme-neptune/ext-theme-neptune-all.css',
                '/css/admin.css'
            ),
            'js' => array(
                '/js/extjs4/bootstrap.js',
                '/js/moment.js',
                '/js/func.js',
                '/js/extjs4/locale/ext-lang-zh_CN.js',
                '/js/admin/common/ux/LinkColumn.js',
                '/js/admin/func_log.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function getWeixinList()
    {
        $this->load->model('cfg_wx_settings_model');

        $option = $_GET;
        $data = $this->cfg_wx_settings_model->getList($option);
        echo json_encode($data);
    }

    public function getWeixinAutoReplyList()
    {
        $this->load->model('cfg_wx_settings_model');

        $option = $_GET;
        $data = $this->cfg_wx_settings_model->getWeiXinAutoReplyList($option);
        echo json_encode($data);
    }


    public function weixin_save()
    {
        $this->load->model('cfg_wx_settings_model');

        $option = $_POST;

        if (isset($option['ID'])) {
            $this->cfg_wx_settings_model->update($option);
        } else {
            $this->cfg_wx_settings_model->insert($option);
        }

        echo json_encode(array(
            'success' => true
        ));
    }


    public function weixin_remove()
    {
        $this->load->model('cfg_wx_settings_model');

        $option = $_POST;

        $this->cfg_wx_settings_model->deleteByID($option['ID']);

        echo json_encode(array(
            'success' => true
        ));
    }

    public function weixin_auto_reply()
    {
        $data = array(
            'msg' => '自动消息回复',
            'base_url' => $this->config->config['base_url'],
            'css' => array(
                '/js/extjs4/resources/ext-theme-neptune/ext-theme-neptune-all.css',
                '/css/admin.css'
            ),
            'js' => array(
                '/js/extjs4/bootstrap.js',
                '/js/extjs4/locale/ext-lang-zh_CN.js',
                '/js/admin/common/ux/LinkColumn.js',
                '/js/admin/weixin_auto_reply.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function weixin_menu()
    {
        $data = array(
            'msg' => '自定义菜单',
            'css' => array(
                '/js/extjs4/resources/ext-theme-neptune/ext-theme-neptune-all.css',
                '/css/admin.css'
            ),
            'js' => array(
                '/js/extjs4/bootstrap.js',
                '/js/extjs4/locale/ext-lang-zh_CN.js',
                '/js/admin/weixin_menu.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function getMenuData()
    {
        $this->load->model('cfg_wx_settings_model');
        $name = 'custom_menu';
        $tree = $this->cfg_wx_settings_model->getByName($name);

        $menu = '[{"name":"Home","id":"1","type":"view","value":"www.tomtalk.net","leaf":true},'
            . '{"name":"优惠活动","id":"2","type":"click","value":"xxx","leaf":true},'
            . '{"name":"News","id":"3","type":"click","value":"xxx","expanded": "true","children":[{"name":"Products Releases","id":"42","type":"click","value":"xxx","leaf":true}]}'
            . ']';

        echo $tree;
    }

    public function weixin_menu_save()
    {
        $this->load->model('cfg_wx_settings_model');

        $menu = $this->input->post('menu', true);

        $name = 'custom_menu';

        $option = array(
            'NAME' => $name,
            'VALUE' => $menu,
            'DESC' => '自定义菜单'
        );

        $row = $this->cfg_wx_settings_model->getRowByName($name);

        if ($row) {
            $option['ID'] = $row->ID;
            $this->cfg_wx_settings_model->update($option);
        } else {
            $this->cfg_wx_settings_model->insert($option);
        }

        echo json_encode(array(
            'success' => true
        ));
    }

    /*****************************************家装 数据库操作******************************************/
    //根据module，返回相应grid数据
    public function getList()
    {
        $option = (empty($_POST) ? $_GET : $_POST);
        $model = $option['module'] . '_model';

        $this->load->model($model);
        $data = $this->$model->getList($option);

        echo json_encode($data);
    }

    public function save()
    {
        $option = (empty($_POST) ? $_GET : $_POST);
        $option['mtime'] = time();

        $model = $option['module'] . '_model';
        unset($option['module']);

        $this->load->model($model);
        $this->$model->save($option);

        echo json_encode(array('success' => true));
    }

    public function getCatTagList()
    {
        $this->load->model('cat_model');
        $data = $this->cat_model->getTagList();
        echo json_encode($data);
    }

    /*****************************************家装 后台页面******************************************/
    public function cat()
    {
        $data = array(
            'title' => 'admin-分类',
            'css' => array(
                '/js/extjs6/build/MyApp-all.css',
                '/css/admin.css'
            ),
            'js' => array(
                '/js/extjs6/ext-all.js',
                '/js/admin/common/columnAction.js',
                '/js/moment.js',
                '/js/admin/cat/grid.js',
                '/js/admin/cat/form.js',
                '/js/admin/cat/panel.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function brand()
    {
        $data = array(
            'title' => 'admin-品牌',
            'css' => array(
                '/js/extjs6/build/MyApp-all.css',
                '/css/admin.css'
            ),
            'js' => array(
                '/js/extjs6/ext-all.js',
                '/js/admin/common/columnAction.js',
                '/js/moment.js',
                '/js/admin/brand/grid.js',
                '/js/admin/brand/form.js',
                '/js/admin/brand/panel.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function item()
    {
        $data = array(
            'title' => 'admin-单品',
            'css' => array(
                '/js/extjs6/build/MyApp-all.css',
                '/css/admin.css'
            ),
            'js' => array(
                '/js/extjs6/ext-all.js',
                '/js/admin/common/columnAction.js',
                '/js/moment.js',
                '/js/admin/item/grid.js',
                '/js/admin/item/form.js',
                '/js/admin/item/panel.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function tuan()
    {
        $data = array(
            'title' => 'admin-团购',
            'css' => array(
                '/js/extjs6/build/MyApp-all.css',
                '/css/admin.css'
            ),
            'js' => array(
                '/js/extjs6/ext-all.js',
                '/js/admin/common/columnAction.js',
                '/js/moment.js',
                '/js/admin/tuan/grid.js',
                '/js/admin/tuan/form.js',
                '/js/admin/tuan/panel.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function tuan_bill()
    {
        $data = array(
            'title' => 'admin-团购订单',
            'css' => array(
                '/js/extjs6/build/MyApp-all.css',
                '/css/admin.css'
            ),
            'js' => array(
                '/js/extjs6/ext-all.js',
                '/js/admin/common/columnAction.js',
                '/js/moment.js',
                '/js/admin/tuan/bill_grid.js',
                '/js/admin/tuan/bill_form.js',
                '/js/admin/tuan/bill_panel.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }

    public function dealer()
    {
        $data = array(
            'title' => 'admin-商家',
            'css' => array(
                '/js/extjs6/build/MyApp-all.css',
                '/css/admin.css'
            ),
            'js' => array(
                '/js/extjs6/ext-all.js',
                '/js/admin/common/columnAction.js',
                '/js/moment.js',
                '/js/admin/dealer/grid.js',
                '/js/admin/dealer/form.js',
                '/js/admin/dealer/panel.js'
            )
        );

        $this->load->view('admin/header', $data);
        $this->load->view('admin/script', $data);
    }
}

/* End of file */