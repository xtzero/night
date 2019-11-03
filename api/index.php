<?php
echo json_encode([
    'code' => '0',
    'msg' => '这个项目已经下机',
    'data' => []
]);
die();
//错误提示
error_reporting(E_ALL);

//配置时区
date_default_timezone_set('PRC');

//载入其他文件
require_once 'lib/fullload.php';

/**
 * 没别的事了
 * 甚至可以闲得写注释
 */
