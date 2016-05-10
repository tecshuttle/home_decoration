<?php

class users_model extends CI_Model
{
    var $table = 'users';

    function __construct()
    {
        // Call the Model constructor
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

    function insert($data)
    {
        $this->db->insert($this->table, $data);
    }

    function deleteByID($id)
    {
        $this->db->delete($this->table, array('id' => $id));
    }

    function login($email, $password)
    {
        $pwd = md5($password);
        $sql = "SELECT * from users WHERE email = '$email' and password = '$pwd'";


        $query = $this->db->query($sql);
        $data = $query->result();


        if (count($data) == 0) {
            return false;
        } else {
            return $data[0];
        }
    }

    function forgetPassword($email)
    {
        $sql = "SELECT * from users WHERE email = '$email'";

        $query = $this->db->query($sql);
        $data = $query->result();

        if (count($data) == 0) {
            return false;
        } else {
            return $data[0];
        }
    }

    function getByID($id)
    {
        $this->db->where('uid', $id);
        $query = $this->db->get($this->table);
        $data = $query->result();

        return $data[0];
    }

}

//end file