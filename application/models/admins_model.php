<?php
class admins_model extends CI_Model
{
    var $table = 'admins';

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

    //查询，统后用这个方法
    function get($options = array())
    {
        $options = $this->_default(array('sortDirection' => 'DESC'), $options);

        // Add where clauses to query
        $qualificationArray = array('id', 'name');

        foreach ($qualificationArray as $qualifier) {
            if (isset($options[$qualifier]))
                $this->db->where($qualifier, $options[$qualifier]);
        }

        // If limit / offset are declared (usually for pagination) then we need to take them into account
        if (isset($options['limit'])) {
            $total = $this->db->count_all_results($this->table);

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

        $query = $this->db->get($this->table);

        if (isset($options['id']) or isset($options['name'])) {
            return $query->row(0);
        } else {
            return array(
                'data' => $query->result(),
                'total' => $total
            );
        }
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

    /**
     * _default method combines the options array with a set of defaults giving the values
     * in the options array priority.
     *
     * @param array $defaults
     * @param array $options
     * @return array
     */
    function _default($defaults, $options)
    {
        return array_merge($defaults, $options);
    }
}

//end file