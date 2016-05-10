<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class user extends MY_Controller
{
    public function __construct($type = NULL)
    {
        parent::__construct();

        $this->slogan = '这世上只有一种成功，就是能够用自己喜欢的方式度过自己的一生。';
    }

    public function index()
    {
        if (!$this->user) {
            header('Location: /user/login');
        }

        $data = array(
            'title' => '会员中心',
            'menu' => 'index',
            'css' => array(),
            'js' => array()
        );

        $this->load->view('header', $data);
        $this->load->view('user/index', $data);
        $this->load->view('copy_right', $data);
        $this->load->view('footer', $data);
    }

    public function account()
    {
        if (!$this->user) {
            header('Location: /user/login');
        }

        $data = array(
            'title' => '会员中心',
            'menu' => 'account',
            'css' => array(),
            'js' => array()
        );

        $this->load->view('header', $data);
        $this->load->view('user/account', $data);
        $this->load->view('copy_right', $data);
        $this->load->view('footer', $data);
    }


    public function getUser()
    {
        session_start();

        if (isset($_SESSION['uid'])) {
            $this->load->model('users_model');
            $user = $this->users_model->getByID($_SESSION['uid']);
            return $user;
        } else if (isset($_COOKIE['uid'])) {
            $this->load->model('users_model');
            $user = $this->users_model->getByID($_COOKIE['uid']);
            return $user;
        } else {
            return false;
        }
    }

    public function register()
    {
        $data = array(
            'title' => '注册',
            'menu' => 'about_us',
            'css' => array(),
            'js' => array()
        );

        $this->load->view('header', $data);
        $this->load->view('user/register', $data);
        $this->load->view('copy_right', $data);
        $this->load->view('footer', $data);
    }

    public function register_submit()
    {
        $this->load->model('users_model');

        $this->users_model->insert(array(
            'email' => $this->input->post('email', true),
            'password' => md5($this->input->post('pwd', true))
        ));

        header('Location: /user/login');
    }

    public function login()
    {
        $data = array(
            'title' => '登入',
            'menu' => 'about_us',
            'css' => array(),
            'js' => array()
        );

        $this->load->view('header', $data);
        $this->load->view('user/login', $data);
        $this->load->view('copy_right', $data);
        $this->load->view('footer', $data);
    }


    public function login_submit()
    {
        $email = $_POST['email'];
        $password = $_POST['pwd'];

        $this->load->model('users_model');
        $user = $this->users_model->login($email, $password);

        if ($user) {
            session_start();
            $_SESSION['uid'] = $user->uid;
            $_SESSION['user_name'] = $user->email;

            $expire = time() + 30 * 86400; // 30 day
            setcookie('uid', $user->uid, $expire, '/');
        }

        header('Location: /');
    }

    public function logout()
    {
        session_start();

        unset($_SESSION['uid']);
        unset($_SESSION['user_name']);

        $expire = -1;
        setcookie('uid', '', $expire, '/');

        header('Location: /');
    }

    public function forget_password()
    {
        //取密码
        $this->load->model('users_model');
        $user = $this->users_model->forgetPassword($_POST['email']);
        $password = ($user ? $user->password : '');

        $this->load->library('email'); //加载CI的email类

        //以下设置Email参数
        $config['protocol'] = 'smtp';
        $config['smtp_host'] = 'smtp.163.com';
        $config['smtp_user'] = 'sky007_tom';
        $config['smtp_pass'] = 'tecshuttle';
        $config['smtp_port'] = '25';
        $config['charset'] = 'utf-8';
        $config['wordwrap'] = TRUE;
        $config['mailtype'] = 'html';
        $this->email->initialize($config);

        //以下设置Email内容
        $this->email->from('sky007_tom@163.com', 'tom');
        $this->email->to($_POST['email']);
        $this->email->subject('xs forget password');
        $this->email->message("<h2>Your password is: $password </h2>");

        $this->email->send();

        echo json_encode(array(
            'success' => true
        ));
    }
}

/* End of file */