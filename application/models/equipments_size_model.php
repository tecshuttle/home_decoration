<?php
/**
 * Class products_model
 * 这个类和articles类是一样的，如果有修改，请同步更新到这里，有时间，重构时，合并成一个类。
 */
class equipments_size_model extends CI_Model
{
    var $table = 'equipments_size';

    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
        //$this->lang = $_SESSION['lang'];
        $this->load->database();
    }

    //后台grid调用
    function get($option)
    {
        $this->db->order_by('ctime', 'DESC');
        $query = $this->db->get($this->table, 20, $option['start']);

        return (array(
            'data' => $query->result(),
            'total' => $this->db->count_all_results($this->table)
        ));
    }



    //查询，统后用这个方法
    function select($options = array())
    {
        $options = $this->_default(array('sortDirection' => 'DESC'), $options);

        // Add where clauses to query
        $qualificationArray = array('id', 'pid');

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

        if ($query->num_rows() == 0) {
            return array(
                'data' => array(),
                'total' => 0
            );
        }

        if (isset($options['id'])) {
            return $query->row(0);
        } else {
            return array(
                'data' => $query->result(),
                'total' => $total
            );
        }
    }


    //前台调用
    function getListByID($id)
    {
        $this->db->where('type_id', $id);
        $this->db->order_by('ctime', 'DESC');
        $query = $this->db->get('products');

        return ($query->result());
    }

    //前台调用
    function getByID($id)
    {
        $this->db->where('id', $id);
        $query = $this->db->get('products');
        $data = $query->result();

        return $data[0];
    }

    //前台调用
    function getByCode($code)
    {
        $this->db->where('code', $code);
        $this->db->where('lang', $this->lang);
        $query = $this->db->get('products');
        $data = $query->result();

        return (count($data) > 0 ? $data[0] : false);
    }

    //前台调用
    function getByIDs($ids)
    {
        $query = $this->db->query('select * from products where id in (' . join(',', $ids) . ')');
        $data = $query->result();

        return $data;
    }

    function insert($data)
    {
        $this->db->insert($this->table, $data);
    }

    function update()
    {
        $this->db->update($this->table, $_POST, array('id' => $_POST['id']));
    }

    function search($keyword)
    {
        $sql = "SELECT * from products WHERE name LIKE '%$keyword%'";

        $query = $this->db->query($sql);

        return (array(
            'data' => $query->result(),
            'total' => 0
        ));
    }

    function getHotProducts()
    {
        $sql = "select t.lang, p.* from products as p left join types as t on (p.type_id = t.id) where is_hot = 1 and t.lang = '{$_SESSION['lang']}' ORDER BY ctime DESC";
        $query = $this->db->query($sql);
        $data = $query->result();

        return $data;
    }

    function getNewProducts()
    {
        $query = $this->db->query('select * from products ORDER BY ctime DESC limit 2');
        $data = $query->result();

        return $data;
    }

    function deleteByID($id)
    {
        $this->db->delete($this->table, array('id' => $id));
    }

    function clone_from_id($id)
    {
        $row = $this->getByID($id);
        unset($row->id);
        $this->insert((array)$row);
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
