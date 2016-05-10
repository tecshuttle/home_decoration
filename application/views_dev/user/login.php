<div class="container-fluid">
    <div class="row">
        <div class="col-xs-6 col-xs-offset-3">
            <div class="page-header" style="border:none;margin: 0px;">
                <h1><?= $this->slogan ?></h1>
            </div>
        </div>
    </div>

    <div class="row" style="margin-bottom: 2em;">
        <div class="col-xs-6 col-xs-offset-3">
            <form action="/user/login_submit" method="post">
                <div class="form-group">
                    <input type="email" class="form-control" name="email" placeholder="请您输入用户名">
                </div>

                <div class="form-group">
                    <input type="password" class="form-control" name="pwd" placeholder="请您输入密码">
                </div>

                <button type="submit" class="col-xs-12 col-sm-12 btn btn-primary">登录</button>
            </form>

            <br/> <br/> <br/>

            <a href="/user/register" class="col-xs-4 col-sm-4 btn btn-link">立即注册</a>
            <span class="col-xs-4 col-sm-4 "></span>
            <a href="#" class="col-xs-4 col-sm-4 btn btn-link">忘记密码？</a>
        </div>
    </div>
</div>