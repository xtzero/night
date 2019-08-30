<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header("Content-type: text/html; charset=utf-8");

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
