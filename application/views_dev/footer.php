
<?php
//设置默认值
$js = (isset($js) ? $js : array());
$css_js_version = $this->config->config['css_js_version'];
?>

<script src="/js/jquery-1.11.1.min.js?version=<?= $css_js_version ?>" type="text/javascript"></script>
<script src="/css/bootstrap-3.3.4/js/bootstrap.min.js?version=<?= $css_js_version ?>" type="text/javascript"></script>

<?php foreach ($js as $jsFile): ?>
    <script src="<?= $jsFile ?>?version=<?= $css_js_version ?>" type="text/javascript"></script>
<?php endforeach; ?>

</body>
</html>