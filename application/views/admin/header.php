<!Doctype html>
<html xmlns=http://www.w3.org/1999/xhtml>
<head>
    <meta http-equiv=Content-Type content="text/html;charset=utf-8">
    <title><?= $msg ?></title>
    <base href="/">

    <?php foreach ($css as $cssFile): ?>
        <link rel="stylesheet" type="text/css" href="<?= $cssFile ?>"/>
    <?php endforeach; ?>

    <style>

        /* text for actioncolumn start */
        .x-action-col-icon {
            width: auto;
            margin-left: 1em;
            font: 300 13px/19px 'Open Sans', 'Helvetica Neue', helvetica, arial, verdana, sans-serif;
            border: 1px solid #5897ce;
            background-color: #5fa2dd;
            color: white;
            padding: 0px 8px;
        }

        .x-action-col-icon:first-child {
            margin-left: 0em;
        }

        /* text for actioncolumn end */
    </style>
</head>

<body>