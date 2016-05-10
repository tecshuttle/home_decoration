<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class admins extends CI_Controller
{
    function __construct()
    {
        parent::__construct(); // Call the Model constructor
        $this->load->model('admins_model');
    }

    public function save()
    {
        if ($_POST['id'] == 0) {
            $_POST['password'] = md5($_POST['password']);
            $this->admins_model->insert($_POST);
        } else {
            $admin = $this->admins_model->get(array('id' => $_POST['id']));

            if ($admin->password === $_POST['password']) {
                unset($_POST['password']);
            } else {
                $_POST['password'] = md5($_POST['password']);
            }

            $this->admins_model->update($_POST);
        }

        echo json_encode(array('success' => true));
    }
}

/* End of file */