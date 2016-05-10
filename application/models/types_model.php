<?php
class types_model extends CI_Model
{
    var $table = 'types';
    var $lang = '';
    var $module = array(
        'articles' => 0,
        'products' => 1,
        'downloads' => 2,
        'gallery' => 3,
    );

    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
        $this->lang = 'cn';
        $this->load->database();
    }

    function get_nav_menu($belong)
    {
        $query = $this->db->query("SELECT * FROM types WHERE  belong = $belong ORDER BY weight DESC");
        $data = $query->result();

        return $data;
    }

    function get_menu($type)
    {
        $query = $this->db->query("SELECT * FROM types WHERE lang = '{$this->lang}' AND module = " . $this->module[$type] . ' ORDER BY weight DESC');
        $data = $query->result();

        return $data;
    }

    //查询，统后用这个方法
    function select($options = array())
    {
        $options = $this->_default(array('sortDirection' => 'DESC'), $options);

        // Add where clauses to query
        $qualificationArray = array('id', 'belong');

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

    function get_default_product()
    {
        $query = $this->db->query('select * from types where module = 1 and belong = 0 ORDER BY weight DESC');
        $data = $query->result();

        return $data[0];
    }

    function getByID($id)
    {
        $this->db->where('id', $id);
        $query = $this->db->get('types');
        $data = $query->result();

        return $data[0];
    }

    //前台调用
    function getListByID($id)
    {
        $this->db->where('belong', $id);
        $this->db->order_by('weight', 'DESC');
        $query = $this->db->get('types');

        return ($query->result());
    }

    //取文章的子菜单
    function getSubMenu($id)
    {
        $this->db->where('module', 0);
        $this->db->where('belong', $id);

        $query = $this->db->get('types');
        $data = $query->result();

        return $data;
    }

    function saveTypeInfo($data)
    {
        $id = $data['id'];
        $this->db->update('types', $data, array('id' => $id));
    }

    function init_menu_root($module_name)
    {
        $data = array(
            'module' => $this->module[$module_name],
            'name' => '初始条目',
            'lang' => $this->lang
        );

        $this->db->insert('types', $data);
    }

    function addType($post)
    {
        $data = (object)array();

        $data->module = $post['module'];
        $data->name = $post['name'];
        $data->lang = $this->lang;

        if ($post['type'] == 'children') {
            $data->belong = $post['id'];
        } else {
            //取当前type的所属分类
            $type_row = $this->getByID($post['id']);
            $data->belong = $type_row->belong;
        }

        $this->db->insert('types', $data);
    }

    function deleteByID($id)
    {
        $this->db->delete('types', array('id' => $id));
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