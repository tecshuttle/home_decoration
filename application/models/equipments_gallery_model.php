<?php

/**
 * Class articles_model
 * 这个类和products类是一样的，如果有修改，请同步更新到这里，有时间，重构时，合并成一个类。
 *
 */
class equipments_gallery_model extends CI_Model
{
    var $table = 'equipments_gallery';

    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
        $this->load->database();
    }

    function get($option)
    {
        $this->db->where('pid', $option['pid']);
        $this->db->order_by('weight', 'ASC');
        $query = $this->db->get($this->table);

        $this->db->where('pid', $option['pid']); //取记录数条件

        return (array(
            'data' => $query->result(),
            'total' => $this->db->count_all_results($this->table)
        ));
    }

    function insert($data)
    {
        $this->db->insert($this->table, $data);
    }

    function update($data)
    {
        $this->db->update($this->table, $data, array('id' => $data['id']));
    }

    function get_menu($type_id)
    {
        $this->db->where('type_id', $type_id);
        $this->db->order_by('id', 'DESC');
        $query = $this->db->get($this->table);

        return ($query->result());
    }

    function loadByID($id)
    {
        $this->db->where('id', $id);
        $query = $this->db->get($this->table);

        return ($query->result());
    }

    function getListByType($type_id)
    {
        $this->db->where('type_id', $type_id);
        $query = $this->db->get($this->table);

        return ($query->result());
    }

    function getDownloadList($option)
    {
        $this->db->where('type_id', $option['type_id']);
        $this->db->order_by('id', 'DESC');
        $query = $this->db->get($this->table, 20, ($option['page'] - 1) * 20);

        $this->db->where('type_id', $option['type_id']); //取记录数条件

        return (array('data' => $query->result(),
            'total' => $this->db->count_all_results($this->table)
        ));
    }

    function getDownloadListSearch($keyword)
    {
        $sql = "SELECT * from articles WHERE type_id IN (69,70,71,72) AND name LIKE '%$keyword%'";

        $query = $this->db->query($sql);


        return (array('data' => $query->result(),
            'total' => 0
        ));
    }

    function news_search($keyword)
    {
        $sql = "SELECT * from articles WHERE type_id IN (42,43,44) AND name LIKE '%$keyword%'";

        $query = $this->db->query($sql);


        return (array('data' => $query->result(),
            'total' => 0
        ));
    }

    function getHotArticles()
    {
        $query = $this->db->query('select * from articles where is_hot = 1 ORDER BY ctime DESC');
        $data = $query->result();

        return $data;
    }

    function new_news()
    {
        $sql = "SELECT * from articles WHERE type_id IN (42,43,44) ORDER BY ctime DESC LIMIT 6";
        $query = $this->db->query($sql);

        return $query->result();
    }

    function deleteByID($id)
    {
        $this->db->delete($this->table, array('id' => $id));
    }
}

//end file