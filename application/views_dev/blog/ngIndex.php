<div ng-view></div>


<script id="templates/home.html" type="text/ng-template">
    <div class="ng-tag">
        <a href="//www.tomtalk.net"><span class="btn"><span style="color:#08C;" class="glyphicon glyphicon-home"></span></span></a>
        <input type="text" ng-model="keyword" ng-change="search()" class="search form-control" placeholder="搜索" />
        <span ng-repeat="tag in tags | orderBy: 'total': true" ng-class="tag.tagged ? 'tagged': ''" ng-bind="tag.tag + ' ' + tag.total" ng-click="tagClick(tag)"></span>
        <a href="#edit/0" ng-show="user"><span class="btn"><span style="color:#84b76d;" class="glyphicon glyphicon-plus"></span></span></a>
        <a href="/user/login" ng-show="! user"><span class="btn"><span style="color:#84b76d;" class="glyphicon glyphicon-user"></span></span></a>
    </div>

    <div class="ng-blog-content">
        <p ng-repeat="blog in blogs">
            <a href="#/{{blog.cid}}">{{blog.title}}</a>
        </p>
    </div>
</script>


<script id="templates/blog.html" type="text/ng-template">
    <div class="ng-tag">
        <a href="#/"><span class="btn"><span style="color: #84b76d;" class="glyphicon glyphicon-inbox"></span></span></a>
        <span ng-show="user" ng-repeat="tag in tags | orderBy: 'id'" ng-class="is_tagged(tag) ? 'tagged': ''" ng-bind="tag.tag" ng-click="tagClick(tag)"></span>
        <a href="#/edit/{{blog.cid}}" ng-show="user"><span class="btn"><span style="color:#f90;" class="glyphicon glyphicon-pencil"></span></span></a>
        <a href="/ng/blog?id={{blog.cid}}" target="_blank"><span class="btn" style="color:gray;"><span class="glyphicon glyphicon-link"></span></span></a>
    </div>

    <div ng-bind-html="blog.text | show_img | markdown" class="ng-blog"></div>
</script>


<script id="templates/edit.html" type="text/ng-template">
    <div class="edit-toolbar">
        <a href="#/"><span class="btn"><span style="color: #84b76d;" class="glyphicon glyphicon-inbox"></span> </span></a>
        <a href="#/{{blog.cid}}" ng-show="blog.cid !== 0"><span class="btn"> <span style="color: gray;" class="glyphicon glyphicon-arrow-left"></span> </span></a>
        <span ng-click="save(blog)" class="btn" style="color:#f90;" ng-show="user"> <span class="glyphicon glyphicon-ok"></span> </span>
    </div>

    <div id="textarea-wrap">
        <textarea ng-model="blog.text" class="form-control"></textarea>
    </div>

    <div class="edit-preview">
        <div ng-bind-html="blog.text | show_img | markdown" class="ng-blog-preview"></div>
    </div>
</script>