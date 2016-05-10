<div class="container-fluid">
    <div class="row">
        <div class="col-xs-12" style="margin-top: 1em;">
            <ol class="breadcrumb">
                <li><a href="/">首页</a></li>
                <li class="active"><?= $cat->name ?></li>
            </ol>
        </div>

        <div class="col-xs-9" style="margin-bottom: 2em;padding: 0em 2em;">
            <div style="border: 1px solid #d2d2d2;padding: 1em;height: 300px;margin-bottom: 1em;">
                滚动图
            </div>

            <?php foreach ($articles as $article): ?>
                <div style="border-bottom: 1px solid #d2d2d2;margin-bottom: 1em;padding-bottom: 1em;">
                    <p>
                    <span style="background-color: deeppink;color: white;width:100px;text-align: center;padding: 0.5em;margin-right: 1em;">
                        <?= $cat->name ?>
                    </span>
                        <a href="/pages/<?= $article->id ?>" style="font-size: 24px;"><?= $article->name ?></a>
                    </p>
                    <?= $article->digest ?>
                    <a href="/pages/<?= $article->id ?>">[查看详细]</a>

                    <p>
                        <span style="float:left;"><?= date('Y-m-d H:i:s', $article->mtime) ?> 更新</span>
                        <span style="float:right;">浏览: <?= $article->pv ?></span>
                    </p>
                </div>
            <?php endforeach; ?>

            <?= $pager ?>
        </div>

        <div class="col-xs-3" style="margin-bottom: 2em;padding: 0em 2em;">
            <div style="border: 1px solid #d2d2d2;padding: 1em;height: 200px;">
                热门专题
            </div>

            <div style="border: 1px solid #d2d2d2;padding: 1em;height: 200px;margin: 1em 0em;">
                铁杆二维码
            </div>

            <div style="border: 1px solid #d2d2d2;padding: 1em;height: 200px;">
                热文排行
            </div>
        </div>
    </div>
</div>