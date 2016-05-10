<div id="contents">
    <div id="contents-list">
        <p v-on="click: onNew" v-show="user" class="blog-item" style="text-align: center;">新建blog</p>

        <p v-repeat="items" v-on="click: onClick" v-text="text | title"
           class="blog-item {{active ? 'active' : ''}} {{saved ? '' : 'saving'}}"></p>

        <p class="blog-item" id="load-mark">{{loadAll ? 'done' : ''}}</p>
    </div>
</div>

<div id="blog">
    <div class="blog-toolbar" v-show="user">
        <span v-on="click: onEdit" class="btn">
            <span class="glyphicon glyphicon-pencil"></span>
        </span>

        <span v-on="click: onDelete" class="btn">
            <span class="glyphicon glyphicon-trash"></span>
        </span>
    </div>

    <div class="blog-preview">
        <div v-html="text | marked" class="blog-content"></div>
    </div>
</div>


<div id="editor">
    <div class="edit-toolbar">
        <span v-on="click: onCancel" class="btn">
            <span class="glyphicon glyphicon-arrow-left"></span>
        </span>


        <span v-on="click: onSave" class="btn">
            <span class="glyphicon glyphicon-ok"></span>
        </span>
    </div>


    <div id="textarea-wrap">
        <textarea v-model="input" class="form-control"></textarea>
    </div>


    <div class="edit-preview">
        <div v-html="input | marked" class="blog-content"></div>
    </div>
</div>