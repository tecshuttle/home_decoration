<?php

class item_model extends CI_Model
{
    var $table = 'item';

    function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    //查询，统后用这个方法
    function get($options = array())
    {
        $options = array_merge(array('sortDirection' => 'DESC'), $options);

        // Add where clauses to query
        $qualificationArray = array('id', 'rec_id', 'module');

        foreach ($qualificationArray as $qualifier) {
            if (isset($options[$qualifier]))
                $this->db->where($qualifier, $options[$qualifier]);
        }

        // If limit / offset are declared (usually for pagination) then we need to take them into account
        $total = $this->db->count_all_results($this->table);
        if (isset($options['limit'])) {

            //取得记录数据后，重新设置一下条件
            foreach ($qualificationArray as $qualifier) {
                if (isset($options[$qualifier]))
                    $this->db->where($qualifier, $options[$qualifier]);
            }

            if (isset($options['offset'])) {
                $this->db->limit($options['limit'], $options['offset']);
            } else if (isset($options['limit'])) {
                $this->db->limit($options['limit']);
            }
        }

        // sort
        if (isset($options['sortBy'])) {
            $this->db->order_by($options['sortBy'], $options['sortDirection']);
        }

        foreach ($qualificationArray as $qualifier) {
            if (isset($options[$qualifier]))
                $this->db->where($qualifier, $options[$qualifier]);
        }

        $query = $this->db->get($this->table);

        if (isset($options['id'])) {
            return $query->row(0);
        } else {
            return array(
                'data' => $query->result(),
                'total' => $total
            );
        }
    }

    function getList($option)
    {
        $this->db->order_by('order', 'ASC');
        $query = $this->db->get($this->table, $option['limit'], $option['start']);

        return (array('data' => $query->result(),
            'total' => $this->db->count_all_results($this->table)
        ));
    }

    function deleteByID($id)
    {
        $this->db->delete($this->table, array('id' => $id));
    }

    function getByID($id)
    {
        $this->db->where('id', $id);
        $query = $this->db->get($this->table);
        $data = $query->result();

        return $data[0];
    }

    function update($option)
    {
        $this->db->update($this->table, $option, array('id' => $option['id']));
    }

    function insert($option)
    {
        $this->db->insert($this->table, $option);
    }

    function delete($option)
    {
        $this->db->delete($this->table, $option);
    }

}

//end file