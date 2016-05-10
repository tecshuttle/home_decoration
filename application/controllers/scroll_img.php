<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class scroll_img extends CI_Controller
{
    function __construct()
    {
        parent::__construct(); // Call the Model constructor
        $this->load->model('scroll_img_model');
    }

    public function save()
    {
        $img = $this->upload_file('file_img');
        $_POST['img'] = ($img == '' ? $_POST['img'] : '/uploads/' . $img);

        $_POST['mtime'] = time();

        if ($_POST['id'] == 0) {
            $this->scroll_img_model->insert($_POST);
        } else {
            $this->scroll_img_model->update($_POST);
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

        //resize image
        if ($name === 'file_img__') {
            include_once dirname(dirname(dirname(__FILE__))) . '/resizeImage.php';

            $src_img = $file_path;
            $dst_img = $new_file_path;
            new resizeImage($src_img, "810", "390", "0", $dst_img);

            unlink($file_path);
        } else {
            rename($file_path, $new_file_path);
        }

        return $new_file_name;
    }
}

/* End of file */