<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class site_settings extends CI_Controller
{


    function __construct()
    {
        parent::__construct(); // Call the Model constructor
        $this->load->model('site_settings_model');
    }

    public function save()
    {
        if ($_POST['id'] == 0) {
            $this->site_settings_model->insert($_POST);
        } else {
            $this->site_settings_model->update($_POST);
        }

        echo json_encode(array('success' => true));
    }

}

/* End of file */