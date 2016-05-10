<?php

/**
 * Class articles_model
 * 这个类和products类是一样的，如果有修改，请同步更新到这里，有时间，重构时，合并成一个类。
 *
 */
class articles_model extends CI_Model
{
    var $table = 'articles';

    function __construct()
    {
        // Call the Model constructor
        parent::__construct();
        $this->load->database();
    }

    //grid用
    function get($option)
    {
        $this->db->where('type_id', $option['type_id']);
        $this->db->order_by('mtime', 'DESC');
        $query = $this->db->get('articles', 20, $option['start']);

        $this->db->where('type_id', $option['type_id']); //取记录数条件

        return (array(
            'data' => $query->result(),
            'total' => $this->db->count_all_results('articles')
        ));
    }

    //查询，统后用这个方法
    function select($options = array())
    {
        $options = $this->_default(array('sortDirection' => 'DESC'), $options);

        // Add where clauses to query
        $qualificationArray = array('id', 'is_draft', 'type_id', 'ctime', 'code');

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

        if (isset($options['id']) or isset($options['code'])) {
            return $query->row(0);
        } else {
            return array(
                'data' => $query->result(),
                'total' => $total
            );
        }
    }

    function getCatList($option)
    {
        $type_id = $option['type_id'];

        $sql = "SELECT a.*, t.name as cat_name from articles as a left join types as t on (a.type_id = t.id) WHERE a.type_id = $type_id";
        $query = $this->db->query($sql);
        $cat = $query->result();

        return $cat;
    }

    function getDoc($type_id)
    {
        //取下级分类
        $sql = "SELECT * from types WHERE belong = $type_id ORDER BY weight DESC";
        $query = $this->db->query($sql);
        $cat = $query->result();

        //取下级分类文档
        foreach ($cat as &$row) {
            $sql = "SELECT * from articles WHERE type_id = {$row->id}";
            $query = $this->db->query($sql);
            $row->articles = $query->result();
        }

        return $cat;
    }

    function insert($data)
    {
        $this->db->insert('articles', $data);
    }

    function update()
    {
        $this->db->update('articles', $_POST, array('id' => $_POST['id']));
    }

    function get_menu($type_id)
    {
        $this->db->where('type_id', $type_id);
        $this->db->order_by('ctime', 'DESC');
        $query = $this->db->get('articles');

        return ($query->result());
    }

    function loadByID($id)
    {
        $this->db->where('id', $id);
        $query = $this->db->get('articles');
        $data = $query->result();

        return $data[0];
    }

    function getListByType($type_id)
    {
        $this->db->where('type_id', $type_id);
        $this->db->order_by('ctime', 'DESC');
        $query = $this->db->get('articles');

        return ($query->result());
    }

    function getDownloadList($option)
    {
        $page = isset($option['page']) ? $option['page'] : 1;
        $per_page = isset($option['per_page']) ? $option['per_page'] : 10;

        $this->db->where('type_id', $option['type_id']);
        $this->db->order_by('ctime', 'DESC');
        $query = $this->db->get('articles', $per_page, ($page - 1) * $per_page);

        $this->db->where('type_id', $option['type_id']); //取记录数条件

        return (array(
            'data' => $query->result(),
            'total' => $this->db->count_all_results('articles')
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

    function pv_inc($id, $count = 1)
    {
        $sql = "UPDATE articles SET pv = pv+{$count} WHERE id = $id";
        $this->db->query($sql);
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
        $query = $this->db->query('select * from articles where is_hot = 1 AND type_id != 44 ORDER BY ctime DESC');
        $data = $query->result();

        return $data;
    }

    function getNewestExhibition()
    {
        $query = $this->db->query('select * from articles where type_id = 44 ORDER BY ctime DESC LIMIT 1');
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