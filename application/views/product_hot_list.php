<?php if (count($products) > 0): ?>
    <div class="xg_sidle_box">
        <div class="xg_tit">
            <h3>热门赛事门票推荐</h3>
        </div>
        <div class="txt_con">
            <ul>
                <?php foreach ($products as $r): ?>
                    <li>
                        <p>
                            <a href="/match/<?= $r->id ?>" target="_blank"><?= $r->name ?></a>
                            <span>出发日期：<?= $r->travel_begin ?></span>
                            <span>行程概览：<?= $r->brief ?></span>
                            <em>低至 <b>¥<?= $r->price ?></b></em>
                        </p>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
    </div>
<?php endif; ?>