<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');
/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	http://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There area two reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router what URI segments to use if those provided
| in the URL cannot be matched to a valid route.
|
*/


$route['default_controller'] = 'welcome';
$route['404_override'] = '';

//自定义路由
$route['pages/(:any)'] = "pages/single/$1"; //单页文章
$route['doc/(:any)'] = "pages/doc/$1"; //官方文档

$route['cat/(:num)'] = "articles/cat/$1/1"; //文章分类列表
$route['cat/(:num)/(:num)'] = "articles/cat/$1/$2"; //文章分类列表,带分页

$route['equipments'] = "equipments/index/0/1"; //比赛详情
$route['equipments/(:num)'] = "equipments/index/$1/1"; //比赛详情
$route['equipments/(:num)/(:num)'] = "equipments/index/$1/$2"; //比赛详情

$route['match/(:num)'] = "equipments/match/$1"; //比赛详情


/* End of file routes.php */
/* Location: ./application/config/routes.php */