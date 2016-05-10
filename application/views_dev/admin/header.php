<html>
<head>
    <meta http-equiv=Content-Type content="text/html;charset=utf-8">
    <title><?= $title ?></title>

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

        .x-html-editor-input {
            border-left: 1px solid #d0d0d0;
            border-right: 1px solid #d0d0d0;
            border-bottom: 1px solid #d0d0d0;
        }
    </style>
</head>

<body>