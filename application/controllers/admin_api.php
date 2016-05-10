<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class admin_api extends MY_Controller
{
    public function index()
    {
       echo 'admin api';
    }


    public function getFuncLog()
    {
        $this->load->model('func_log_model');

        $option = $_GET;
        $data = $this->func_log_model->getList($option);

        echo json_encode($data);
    }

    public function getFuncName()
    {
        $this->load->model('func_log_model');

        $option = $_GET;
        $data = $this->func_log_model->getFuncName($option);

        echo json_encode($data);
    }
}

/* End of file */