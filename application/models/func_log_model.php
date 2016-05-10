<?php

class func_log_model extends CI_Model
{
    var $table = 'CFG_WX_FUNC_LOG';

    function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    function get($options = array())
    {
        $options = array_merge(array('sortDirection' => 'DESC'), $options);

        // Add where clauses to query
        $qualificationArray = array('IS_REDO');

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

        if ($query->num_rows() == 0) return false;

        if (isset($options['MOBILE']) AND isset($options['SMS_CODE_TYPE']) AND isset($options['VALID'])) {
            return $query->row(0);
        } else {
            return array(
                'data' => $query->result(),
                'total' => $total
            );
        }
    }

    function insert($log)
    {
        $this->db->insert($this->table, $log);
    }

    function update($log)
    {
        if (isset($log['LOG_ID'])) {
            $this->db->update($this->table, $log, array('LOG_ID' => $log['LOG_ID']));
        }

        if (isset($log['TICKET'])) {
            $this->db->update($this->table, $log, array('TICKET' => $log['TICKET']));
        }
    }

    function getList($option)
    {
        //取记录
        $this->setSQL($option);

        if (isset($option['is_order_by_runtime']) AND $option['is_order_by_runtime'] === '1') {
            $this->db->order_by('RUN_TIME', 'DESC');
        } else {
            $this->db->order_by('CALL_TIME', 'DESC');
        }

        $this->db->limit($option['limit'], $option['start']);

        $query = $this->db->get();

        //取记录数
        $this->setSQL($option);
        $total = $this->db->count_all_results();

        return (array(
            'data' => $query->result(),
            'total' => $total
        ));
    }

    function getFuncName($option)
    {
        $sql = "SELECT DISTINCT FUNC FROM {$this->table}";
        $query = $this->db->query($sql);

        return (array(
            'data' => $query->result(),
            'total' => 0
        ));
    }

    private function setSQL($option)
    {
        $this->db->select('*, (RETURN_TIME - CALL_TIME) AS RUN_TIME');

        if (isset($option['from_date'])) {
            $start_time = strtotime($option['from_date']);
            $end_time = strtotime($option['to_date'] . ' 23:59:59');

            $this->db->where('CALL_TIME >=', $start_time);
            $this->db->where('CALL_TIME <=', $end_time);
        }

        if (isset($option['func']) AND $option['func'] !== '') {
            $this->db->where('FUNC', $option['func']);
        }

        $this->db->from($this->table);
    }
}

//end file
