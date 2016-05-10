<div class="container-fluid">
    <div class="row">
        <div class="col-xs-12" style="margin-top: 1em;">
            <ol class="breadcrumb">
                <li><a href="/">首页</a></li>
                <li class="active"><?= $match->name ?></li>
            </ol>
        </div>
    </div>

    <div class="row">
        <div class="col-xs-12 " style="padding: 0em 1em;">
            <div class="img-thumbnail" style="width: 100%;padding: 1em;">
                <?= $match->desc ?>

                <?php if (empty($match->desc)): ?>
                    暂无产品简介
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>


<div class="container-fluid" style="margin: 1em auto;">
    <div class="row">
        <div class="col-xs-9">
            <div class="img-thumbnail" style="width: 100%;padding:1em;">
                <?= $match->price_table ?>
                <?= $match->content ?>

                <?php if (empty($match->content)): ?>
                    暂无产品详情
                <?php endif; ?>
            </div>
        </div>

        <div class="col-xs-3" style="padding-left: 0em;">
            <div class="img-thumbnail" style="width: 100%;text-align: center;padding: 1em;">
                <?php foreach ($match->relative_product as $r): ?>
                    <div>
                        <a href="/match/<?= $r->id ?>">
                            <?= $r->name ?>
                        </a>
                    </div>
                <?php endforeach; ?>

                <?php if (empty($match->relative_product)): ?>
                    暂无相关产品
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>