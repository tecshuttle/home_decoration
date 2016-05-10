<div class="container-fluid">
    <div class="row" style="margin: 0 1em 0em 0em;">
        <div class="col-xs-12" style="text-align: center;">
            <h1>朝圣</h1>
        </div>
    </div>

    <?php foreach ($products as $key => $article): ?>
        <?php if ($key === 0 or $key === 4) : ?>
            <div class="row" style="margin: 0 1em 0em 1em;">

        <?php endif; ?>

        <div class="col-xs-3 " style="padding: 0.5em;">
            <div class="img-thumbnail" style="width: 100%;text-align: center;padding: 6em;">
                <a href="/match/<?= $article->id ?>"><?= $article->name ?></a>
            </div>
        </div>

        <?php if ($key === 3 or $key === 7) : ?>
            </div>

        <?php endif; ?>
    <?php endforeach; ?>

    <div class="row" style="text-align:center;padding: 2em;margin: 0 1em 0em 0em;">
        <a href="/equipments">更多</a>
    </div>
</div>


<?php foreach ($nav_menu as $menu): ?>
    <div class="container-fluid">
        <div class="row" style="margin: 0 1em 0em 0em;">
            <div class="col-xs-12" style="text-align: center;">
                <h1><?= $menu->name ?></h1>
            </div>
        </div>

        <?php foreach ($menu->articles as $key => $article): ?>
            <?php if ($key === 0 or $key === 4) : ?>
                <div class="row" style="margin: 0 1em 0em 1em;">

            <?php endif; ?>

            <div class="col-xs-3 " style="padding: 0.5em;">
                <div class="img-thumbnail" style="width: 100%;text-align: center;padding: 6em 1em;">
                    <a href="/pages/<?= $article->id ?>"><?= $article->name ?></a>
                </div>
            </div>

            <?php if ($key === 3 or $key === 7) : ?>
                </div>

            <?php endif; ?>
        <?php endforeach; ?>
    </div>
<?php endforeach; ?>