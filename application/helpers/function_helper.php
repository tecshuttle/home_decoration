<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');


function print_a($val, $return = false)
{
    $out = "<pre style=\"background: #000; color: #ccc; font: 12px 'fixedsys'; text-align: left; width: 100%; padding: 5px\">\n";
    $out .= print_r($val, true);
    $out .= "</pre>\n";

    if ($return) {
        return $return;
    }

    echo $out;
}

function guid()
{
    if (function_exists('com_create_guid')) {
        $uuid = com_create_guid();
    } else {
        mt_srand((double)microtime() * 10000); //optional for php 4.2.0 and up.
        $charid = strtoupper(md5(uniqid(rand(), true)));
        $hyphen = chr(45); // "-"
        $uuid = chr(123) // "{"
            . substr($charid, 0, 8) . $hyphen
            . substr($charid, 8, 4) . $hyphen
            . substr($charid, 12, 4) . $hyphen
            . substr($charid, 16, 4) . $hyphen
            . substr($charid, 20, 12)
            . chr(125);
        // "}"
    }

    $uuid = trim($uuid, '{}');
    $uuid = strtolower($uuid);

    return str_replace('-', '', $uuid);
}

function time_ms()
{
    list($s1, $s2) = explode(' ', microtime());
    $time = (float)sprintf('%.0f', (floatval($s1) + floatval($s2)) * 1000);

    return $time;
}

/**
 * 生成分页条
 *
 * @param integer $total 总记录数
 * @param integer $perpage 每页显示记录数
 * @param integer $page 当前页码
 * @param string $url 链接,其中的__page__将用页码替换
 *
 * @return string
 */
function build_pagebar($total, $perpage, $page, $url)
{
    if ($total == 0) {
        return '';
    }

    $pages = ceil($total / $perpage);
    $page = $page <= 0 ? 1 : $page;

    $html = '<div class="resultPage clearfix" id="page_div">';

    if ($pages <= 9) {
        $start = 1;
        $end = $pages;
    } else if ($page > 4 && $page + 3 <= $pages) {
        $start = $page - 2;
        $end = $page + 2;
    } else if ($page + 3 > $pages) {
        $start = $pages - 4;
        $end = $pages;
    } else if ($page <= 4) {
        $start = 1;
        $end = 7;
    }

    if ($page == 1) {
        $html .= "<a class='pre'>上一页</a>";
    } else {
        $html .= "<a href=\"" . str_replace("__page__", $page - 1, $url) . "\">上一页</a>";
    }

    if ($start > 1) {
        $html .= "<a href=\"" . str_replace("__page__", 1, $url) . "\">1</a>";
    }

    if ($start > 2) {
        $html .= "<a href=\"" . str_replace("__page__", 2, $url) . "\">2</a>";
    }

    if ($start > 3) {
        $html .= "<a>...</a>";
    }

    for ($i = $start; $i <= $end; $i++) {
        if ($page == $i) {
            $html .= "<a href='#' class='num' style=\" border:1px solid #f60; background:#f60; color:#fff; \">$i</a>";
        } else {
            $html .= "<a href=\"" . str_replace("__page__", $i, $url) . "\">$i</a>";
        }
    }

    if ($end < $pages - 1) {
        $html .= "<a>...</a>";
    }

    if ($end < $pages) {
        $html .= "<a href=\"" . str_replace("__page__", $pages, $url) . "\">$pages</a>";
    }

    if ($page >= $pages) {
        $html .= "<a>下一页</a>";
    } else {
        $html .= "<a href=\"" . str_replace("__page__", $page + 1, $url) . "\" class='next'>下一页</a>";
    }

    $html .= "</div>";

    return $html;
}

//end file