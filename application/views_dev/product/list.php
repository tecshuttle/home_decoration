<div class="container-fluid" style="margin-top: 1em;">
    <div class="row" style="margin-bottom: 1em;">
        <div class="col-xs-12">
            <span>相关主题：</span>

            <a href="/equipments" class="option alls <?= ($tag_id == 0 ? 'hover' : '') ?>">全部</a>
            <?php foreach ($tags as $t): ?>
                <a href="/equipments/<?= $t->id ?>" class="option alls <?= ($tag_id == $t->id ? 'hover' : '') ?>">
                    <?= $t->name ?>
                </a>
            <?php endforeach; ?>
        </div>
    </div>

    <?php foreach ($matchs['data'] as $m): ?>
        <div class="row">
            <div class="col-xs-12 " style="padding: 0em 1em;margin-bottom: 1em;">
                <div class="img-thumbnail" style="width: 100%;padding: 1em;">
                    <div style="width: 30%;float:left;">
                        <img src="<?= (empty($m->cover) ? '#' : $m->cover) ?>">
                    </div>

                    <div style="width: 50%;float:left;padding-left: 1em;">
                        <h2 style="margin:10px 0px;">
                            <a href="/match/<?= $m->id ?>"> <?= $m->name ?> </a>
                        </h2>

                        <p>行程天数: <?= $m->travel_long ?>

                        <p>出发日期: <?= $m->travel_begin ?>

                        <p>行程概览: <?= $m->brief ?>
                    </div>

                    <div style="width: 20%;float:left;text-align: center;">
                        <div style="margin: 1.5em 0em;">
                            <span style="color: orange;font-size: 24px;">￥<?= $m->price ?></span>起
                        </div>

                        <span style="display:inline-block;padding: 5px; width: 90px;background-color: orange;">
                            <a href="/match/<?= $m->id ?>" style="color: white;text-underline: none;">预订</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    <?php endforeach; ?>

    <?= $pager ?>
</div>