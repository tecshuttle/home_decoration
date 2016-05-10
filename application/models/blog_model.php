<?php

class blog_model extends CI_Model
{
    var $table = 'blog';

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
        $qualificationArray = array('cid');

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

        if (isset($options['cid'])) {
            return $query->row(0);
        } else {
            return array(
                'data' => $query->result(),
                'total' => $total
            );
        }
    }

    function search($keyword)
    {
        $sql = "select * from blog where text like '%{$keyword}%' order by ctime desc limit 50";
        $query = $this->db->query($sql);
        return $query->result();
    }

    function getUnTagged()
    {
        $sql = "select * from blog where cid not in (select rec_id from tagged where module = 'ng-blog') order by ctime desc";
        $query = $this->db->query($sql);
        return $query->result();
    }

    function getTags($cid)
    {
        $sql = "select * from tagged where module='ng-blog' and rec_id = $cid";
        $query = $this->db->query($sql);

        $tags = $query->result();

        foreach ($tags as &$tag) {
            $tag->tag_id = (int)$tag->tag_id;
        }

        return $tags;
    }

    //查找打上了指定标记的文章，支持多标签并集。
    function getTagged($tagged_id)
    {
        //找出所有标签下的文章
        $sql = "select rec_id, count(*) as total from tagged where module = 'ng-blog' and tag_id in($tagged_id) group by rec_id";
        $query = $this->db->query($sql);
        $blogs = $query->result();

        //文章被打标签个数，等于查询标签个数，则提出
        $num_tag = count(explode(',', $tagged_id));

        $cids = array();

        foreach ($blogs as $row) {
            if ($row->total == $num_tag) {
                $cids[] = $row->rec_id;
            }
        }

        //没有符合条件的文章，返回空数组。
        if (count($cids) === 0) {
            return array();
        }

        $sql = 'select * from blog where cid in (' . implode(', ', $cids) . ')';
        $query = $this->db->query($sql);

        return $query->result();
    }

    function update($option)
    {
        $this->db->update($this->table, $option, array('cid' => $option['cid']));
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