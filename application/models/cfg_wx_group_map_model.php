<?php
class cfg_wx_group_map_model extends CI_Model
{
    var $table = 'CFG_WX_GROUP_MAP';

    function __construct()
    {
        parent::__construct();
        $this->load->database();
    }


    function get_group_id($name)
    {
        $this->db->where('SCENE_ID', $name);
        $query = $this->db->get($this->table);

        $data = $query->result();

        if ($data) {
            return $data[0]->GROUP_ID;
        } else {
            return false;
        }
    }
}

//end file