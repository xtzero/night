<?php
namespace controller\index;

use core\coreController;
use lib\coreModel;

class index extends coreController {

    private $m;
    const user = 'night_user';
    const moment = 'night_moment';
    const comment = 'night_comment';

    public function __construct()
    {
        crossDomain();
        $this->m = new coreModel();
    }

    public function index() {
        ajax(200, '接口访问成功了！', []);
    }

    /**
     * 检查用户是否存在
     * @throws \Exception
     */
    public function checkUser()
    {
        $this->param('userid');
        $user = $this->m->table(self::user)->mode('select')->where("id='{$this->userid}'")->field('*')->find();
        if (!empty($user)) {
            ajax(200, '用户存在', $user);
        } else {
            ajax(201, '用户不存在');
        }
    }

    /**
     * 添加用户
     * @throws \Exception
     */
    public function addUser()
    {
        $this->param('name,password');
        $ifUserExist = $this->m->table(self::user)->mode('select')->where("name='{$this->name}'")->find();
        if (!empty($ifUserExist)) {
            ajax(400, '这个名字已经被占用了呢');
        }
        $id = appendUserid($this->password);
        $addUser = $this->m->table(self::user)->mode('insert')->data([
            'id' => $id,
            'name' => $this->name,
            'create_at' => date('Y-m-d H:i:s'),
            'password' => $this->password,
            'valid' => 1
        ])->query();
        if ($addUser === '0') {
            ajax(200, '成功', [
                'id' => $id,
                'name' => $this->name
            ]);
        } else {
            ajax(400, '失败');
        }
    }

    /**
     * 发帖
     * @throws \Exception
     */
    public function sendMoment()
    {
        $this->param('userid,content');
        $send = $this->m->table(self::moment)->mode('insert')->data([
            'content' => $this->content,
            'create_at' => date('Y-m-d H:i:s'),
            'valid' => 1,
            'create_user' => $this->userid
        ])->query();
        if ($send) {
            ajax(200, '成功', [
                'id' => $send,
            ]);
        } else {
            ajax(400, '失败');
        }
    }

    /**
     * 帖子列表
     * @throws \Exception
     */
    public function listMoment()
    {
        $this->param('*page=1,*userid');
        $moments = $this->m
                    ->table(self::moment)
                    ->mode('select');
        if ($_userid = $this->userid) {
            $this->m->where("valid=1 AND create_user='{$_userid}'");
        } else {
            $this->m->where("valid=1");
        }

        $moments = $moments->page($this->page)
                    ->limit(10)
                    ->order('create_at DESC')
                    ->query();
        if (!empty($moments)) {
            $_userids = array_column($moments, 'create_user');
            $userids = "'".implode("','", $_userids)."'";
            $users = $this->m->table(self::user)->mode('select')->where("id IN ({$userids})")->query();
            $useridToUser = keyToIndex($users, 'id');
            foreach ($moments as $k => $v) {
                $moments[$k]['name'] = $useridToUser[$v['create_user']]['name']??'';
            }
            ajax(200, '成功', $moments);
        } else {
            ajax(400, '没有更多数据了');
        }
    }

    public function momentCount()
    {
        $this->param('userid');
        $c = $this->m
            ->table(self::moment)
            ->mode('select')
            ->field('COUNT(*) AS \'count\'')
            ->where("valid=1 AND create_user='{$this->userid}'")
            ->find();
        if (!empty($c)) {
            ajax(200, '', $c);
        } else {
            ajax(200, '', 0);
        }
    }

    /**
     * 发送评论
     * @throws \Exception
     */
    public function sendComment()
    {
        $this->param('mid,userid,content');
        $send = $this->m->table(self::comment)->mode('insert')->data([
            'mid' => $this->mid,
            'content' => $this->content,
            'valid' => 1,
            'create_at' => date('Y-m-d H:i:s'),
            'create_user' => $this->userid
        ])->query();
        if ($send) {
            // 更新评论数
            $updateCcount = $this->m->table(self::moment)->mode('update')->data([
                'c_count' => 'c_count+1'
            ]);
            ajax(200, '成功', [
                'id' => $send
            ]);
        } else {
            ajax(400, '没有更多数据了');
        }
    }

    /**
     * 帖子详情
     * @throws \Exception
     */
    public function momentDetail()
    {
        $this->param('mid');
        $momentDetail = $this->m
                            ->table(self::moment)
                            ->mode('select')
                            ->field('content,create_user,create_at')
                            ->where("id={$this->mid} AND valid=1")
                            ->find();
        if (!empty($momentDetail)) {
            $user = $users = $this->m->table(self::user)->mode('select')->where("id={$momentDetail['create_user']}")->find();
            $momentDetail['name'] = $user['name']??'';
            $comments = $this->m
                            ->table(self::comment)
                            ->mode('select')
                            ->field('content,create_user,create_at')
                            ->where("mid={$this->mid} AND valid=1")
                            ->query();
            if (!empty($comments)) {
                $_userids = array_column($comments, 'create_user');
                $userids = "'".implode("','", $_userids)."'";
                $users = $this->m->table(self::user)->mode('select')->where("id IN ({$userids})")->query();
                $useridToUser = keyToIndex($users, 'id');
                foreach ($comments as $k => $v){
                    $comments[$k]['name'] = $useridToUser[$v['create_user']]['name'];
                }
            }
            $momentDetail['comments'] = $comments;
            ajax(200, '成功', $momentDetail);
        } else {
            ajax(400, '这个帖子不存在');
        }
    }
}
