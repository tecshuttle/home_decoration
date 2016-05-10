<?php if (!defined('BASEPATH')) exit('No direct script access allowed');


class todo_lib
{
    //把任务按日期分组
    public function gather_jobs_by_day($jobs_of_week)
    {
        $list = array();

        foreach ($jobs_of_week as $job) {
            $job->job_desc = str_replace("\n", '</br>', $job->job_desc);
            $i_week = date('w', $job->start_time);

            if (!isset($list[$i_week])) {
                $list[$i_week] = array();
            }

            array_push($list[$i_week], $job);
        }

        //补全7天的数据，数据缺失，页面显示会出错。
        for ($i = 0; $i < 7; $i++) {
            if (!isset($list[$i])) {
                $list[$i] = array();
            }
        }

        return $list;
    }

    public function get_all_jobs_of_week($day, $job_type_id, $project_code, $uid)
    {
        $CI =& get_instance();

        $week = $CI->f->get_time_range_of_week($day);

        $sql = "SELECT * "
            . ($project_code === '' ? '' : ", SUBSTRING(job_name, POSITION(':' IN job_name) + 2) AS job_name ")
            . "FROM todo_lists "
            . "WHERE user_id = $uid AND start_time >= $week->start AND start_time <= $week->end "
            . ($job_type_id === false ? '' : "AND job_type_id = $job_type_id ");


        $sql .= ($project_code === '' ? '' : " AND job_name LIKE '$project_code%'");

        $sql .= "ORDER BY status DESC, start_time ASC";

        $query = $CI->db->query($sql);
        $data = $query->result();

        return $data;
    }
}

/* End of file */