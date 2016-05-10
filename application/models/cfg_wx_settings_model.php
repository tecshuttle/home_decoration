<?php
class cfg_wx_settings_model extends CI_Model
{
    var $table = 'CFG_WX_SETTINGS';

    function __construct()
    {
        parent::__construct();
        $this->load->database();
    }


    function getByName($name)
    {
        $this->db->where('NAME', $name);
        $query = $this->db->get($this->table);

        $data = $query->result();

        return $data[0]->VALUE;
    }

    function getRowByName($name)
    {
        $this->db->where('NAME', $name);
        $query = $this->db->get($this->table);

        $data = $query->result();

        return (count($data) > 0 ? $data[0] : false);
    }

    function updateByName($option)
    {
        $this->db->update($this->table, $option, array('NAME' => $option['NAME']));
    }

    function update($option)
    {
        $this->db->update($this->table, $option, array('ID' => $option['ID']));
    }

    function insert($option)
    {
        $this->db->insert($this->table, $option);
    }

    function deleteByID($id)
    {
        $this->db->delete($this->table, array('ID' => $id));
    }

    //grid用
    function getList($option)
    {
        $this->db->order_by('NAME', 'ASC');
        $query = $this->db->get($this->table, $option['limit'], $option['start']);

        return (array(
            'data' => $query->result(),
            'total' => $this->db->count_all_results($this->table)
        ));
    }

    //grid用
    function getWeiXinAutoReplyList($option)
    {
        $this->db->like('NAME', 'auto_', 'after');
        $this->db->order_by('NAME', 'ASC');
        $query = $this->db->get($this->table, $option['limit'], $option['start']);

        return (array(
            'data' => $query->result(),
            'total' => $this->db->count_all_results($this->table)
        ));
    }


    function findKeyword($name)
    {
        $this->db->like('NAME', $name, 'after');
        $query = $this->db->get($this->table);

        $data = $query->result();
        return (count($data) > 0 ? $data[0] : false);

    }


}

//end file