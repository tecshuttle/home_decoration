<?php
class site_settings_model extends CI_Model
{
    var $table = 'site_settings';

    function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    function getList($option)
    {
        $this->db->order_by('id', 'DESC');
        $query = $this->db->get($this->table, $option['limit'], $option['start']);

        return (array('data' => $query->result(),
            'total' => $this->db->count_all_results($this->table)
        ));
    }

    function getByName($name)
    {
        $this->db->where('name', $name);
        $query = $this->db->get($this->table);

        $data = $query->result();
        return $data[0];
    }

    function getValues($names)
    {
        $this->db->where_in('name', $names);
        $query = $this->db->get($this->table);
        $rows = $query->result();

        $values = array();

        foreach ($rows as $row) {
            $values[$row->name] = $row->value;
        }

        return $values;
    }

    function insert($data)
    {
        $this->db->insert($this->table, $data);
    }

    function deleteByID($id)
    {
        $this->db->delete($this->table, array('id' => $id));
    }

    function update()
    {
        $this->db->update($this->table, $_POST, array('id' => $_POST['id']));
    }
}

//end file