<div class="header-inner">
    <a data-bn-ipg="head-logo" class="header-inner-logo" href="/"></a>
    <!-- nav -->
    <div class="nav">
        <ul class="nav-ul">
			<li class="nav-list"><a class="nav-span" href="#" title="首页">首页</a></li>
            <li class="nav-list <?= ($menu == 'product' ? 'nav-list-selected' : '') ?>"><a class="nav-span" href="/equipments" title="朝圣">朝圣</a></li>
            <li class="nav-list <?= ($menu == 'back' ? 'nav-list-selected' : '') ?>"><a class="nav-span" href="/cat/225" title="荣归">荣归</a></li>
            <li class="nav-list <?= ($menu == 'travel' ? 'nav-list-selected' : '') ?>"><a class="nav-span" href="/cat/223" title="旅行那些事儿">旅行那些事儿</a></li>
            <li class="nav-list <?= ($menu == 'news' ? 'nav-list-selected' : '') ?>"><a class="nav-span" href="/cat/227" title="天下足球">天下足球</a></li>
            <li class="nav-list <?= ($menu == 'fan' ? 'nav-list-selected' : '') ?>"><a class="nav-span" href="/doc/about" title="我是铁杆">我是铁杆</a></li>
        </ul>
    </div>
    <!-- fun -->
    <div class="fun">
        <div class="service-phone">
            <i class="ico-phone"></i><span style="font-size: 24px;">400-188-6468</span>
        </div>
        <div id="userStatus" class="status" style="display:none;">
            <div class="login">
                <a href="#">注册</a>
                <a href="#">登录</a>
            </div>
        </div>
    </div>
</div>