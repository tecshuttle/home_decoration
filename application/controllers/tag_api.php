<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class tag_api extends MY_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->load->model('tag_model');
    }

    public function index()
    {
        echo '';
    }

    public function getList()
    {
        $option = array(
            'module' => 'blog'
        );

        $query = $this->tag_model->get($option);

        $tags = $query['data'];

        echo json_encode($tags);
    }

    public function getListTotal()
    {
        $tags = $this->tag_model->getListTotal();

        foreach ($tags as &$tag) {
            $tag->id = (int)$tag->id;
            $tag->total = (int)$tag->total;
        }

        echo json_encode($tags);
    }

    public function tag()
    {
        $request_body = file_get_contents('php://input', true);
        $body = json_decode($request_body, true);
        $cid = $body['blog_id'];
        $tag_id = $body['tag_id'];
        $is_tagged = $body['is_tagged'];

        if ($is_tagged === true) {
            $this->tag_model->add_tag($cid, $tag_id);
        } else {
            $this->tag_model->del_tag($cid, $tag_id);
        }
    }
}

/* End of file */