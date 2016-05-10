<div class="container-fluid">
    <div class="row" style="background-color: #323232;color: #aaa;padding-top: 1em;">
        <?php foreach ($doc as $cat): ?>
            <li class="col-xs-2">
                <dl>
                    <dt><?= $cat->name ?></dt>
                    <?php foreach ($cat->articles as $article): ?>
                        <dd><a href="/pages/<?= $article->code ?>" target="_blank"><?= $article->name ?></a></dd>
                    <?php endforeach; ?>
                </dl>
            </li>
        <?php endforeach; ?>

        <div class='col-xs-4' style="font-size:24px;padding: 1em;text-align: center;"> 合作伙伴</div>
    </div>
</div>