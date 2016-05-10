/**
 * Ext.ux.CodeMirrorTextArea - CodeMirror for ExtJS
 * @author v_jfdong
 * @description CodeMirror的extjs扩展，提供语法高亮等功能的编辑器
 * @requires common/CodeMirror/lib/codemirror.js,common/CodeMirror/lib/codemirror.css,
 */
Ext.namespace('Ext.ux');
/**
  * @class Ext.ux.CodeMirrorTextArea
  * @extends Ext.form.TextArea
  */
Ext.define('Ext.ux.CodeMirrorTextArea', {extend: 'Ext.form.TextArea', 
	alias: 'widget.codemirror',
    hideToolbar : false,//是否隐藏工具条
    enableTheme : true,//是否启用编辑器主题
    enableFormat : false,//是否启用格式化代码（注，目前只支持javascript,xml）
    enableLineNumbers : true,//是否启用行号
    themes : [//所有主题，需要预先加载对应css文件，可以优化成动态加载
        'default',
        'ambiance',
        'blackboard',
        'cobalt',
        'eclipse',
        'elegant',
        'erlang-dark',
        'lesser-dark',
        'monokai',
        'neat',
        'night',
        'vibrant-ink',
        'xq-dark'
    ],
    cacheTheme :{},
    theme : 'erlang-dark',//默认主题皮肤 
    buttonTips : {//工具 条上的按钮
        sourceedit : {//名字不能改，使用ext默认样式
            title: '',
            text: '格式化代码',
            cls: 'x-html-editor-tip'
        },
        insertorderedlist : {
            title: '',
            text: '显示行号',
            cls: 'x-html-editor-tip'
        }        
    },
    //private
    constructor : function(config){
        var personConfig = Ext.value(this.getPersonConfig(),{
            lineNumbers : config.lineNumbers || true,
            theme : config.theme || this.theme
        });
        Ext.apply(config,personConfig);
        config = Ext.apply({
            matchBrackets: true,
            lineWrapping : true/*,
              extraKeys: {
                "Ctrl-F": function(cm) {
                  //me.setFullScreen(cm, !me.isFullScreen(cm));
                },
                "Esc": function(cm) {
                  //if (me.isFullScreen(cm)) me.setFullScreen(cm, false);
                }
              } */           
        },config);
        CodeMirror.modeURL = "../js/common/CodeMirror/mode/%N/%N.js";
        Ext.ux.CodeMirrorTextArea.superclass.constructor.call(this,config);
    },

    initEvents : function(){
        var me = this;
        Ext.ux.CodeMirrorTextArea.superclass.initEvents.call(this);

        if(this.grow){
            var el = Ext.fly(this.mirror.getInputField());
            this.mon(el, 'keyup', this.onKeyUpBuffered, this, {buffer: 50});
            this.mon(el, 'click', this.autoSize, this);
        }        
    },
    // private
    onRender : function(ct, position){
        var me = this;
        me.switchTheme(me.theme);
        Ext.ux.CodeMirrorTextArea.superclass.onRender.call(this, ct, position);
        
        me.wrap = me.el.wrap({
            cls:'x-codemirror-editor-wrap', cn:{cls:'x-html-editor-tb'}
        });
        
        me.createToolbar(me);
        me.tb.doLayout();
        //初始化codemirror
        me.mirror = CodeMirror.fromTextArea(me.getEl().dom,me.initialConfig);
        me.setPersonConfig();
        
        //设置XX语言的语法高亮
        if(!Ext.isEmpty(me.initialConfig.mode)){
            me.setMode(me.initialConfig.mode);
        }
        
        if(!me.grow){
            var scrollEl = Ext.fly( me.mirror.getScrollerElement()),
                tbHeight;
            tbHeight = me.readOnly ? 0 : me.tb.getHeight();
            scrollEl.applyStyles( {
                height : (me.height || me.growMin) - tbHeight - 10,
                overflow : 'auto'
            });
        }       

        me.resizeEl = me.positionEl = me.wrap;
        me.rendered = true;
    },    
    // private
    createThemeOptions : function(){
        var buf = [], ths = this.themes, ff, lc;
        for(var i = 0, len = ths.length; i< len; i++){
            ff = ths[i];
            lc = ff.toLowerCase();
            buf.push(
                '<option value="',lc,'"',
                    (this.theme == lc ? ' selected="true">' : '>'),
                    ff,
                '</option>'
            );
        }
        return buf.join('');
    },
    // private    
    createToolbar : function(editor){
        var items = [],
            personConfig = Ext.value(this.getPersonConfig(),{
	            lineNumbers : this.initialConfig.lineNumbers,
	            theme : this.initialConfig.theme
            });
        var tipsEnabled = Ext.QuickTips && Ext.QuickTips.isEnabled();


        function btn(id, toggle, handler ,pressed){
            return {
                itemId : id,
                cls : 'x-btn-icon',
                iconCls: 'x-edit-'+id,
                enableToggle:toggle !== false,
                pressed  : pressed  !== false,
                scope: editor,
                handler:handler,
                clickEvent:'mousedown',
                tooltip: tipsEnabled ? editor.buttonTips[id] || undefined : undefined,
                overflowText: editor.buttonTips[id].title || undefined,
                tabIndex:-1
            };
        }


        if(this.enableTheme && !Ext.isSafari2){
            var themeSelectItem = new Ext.Toolbar.Item({
               autoEl: {
                    tag:'select',
                    cls:'x-theme-select',
                    title : '编辑器样式',
                    html: this.createThemeOptions()
               }
            });

            items.push(
                themeSelectItem,
                '-'
            );
        }

        if(this.enableFormat){
            items.push(
                btn('sourceedit', true, function(btn){
                    this.formatContent();
                    
                }),
                '-'
            );
        }
        if(this.enableLineNumbers){
            
            items.push(
                btn('insertorderedlist', true, function(btn){
                    this.mirror.setOption('lineNumbers',btn.pressed);
                    this.setPersonConfig();
                },personConfig.lineNumbers),
                '-'
            );
        }        
        
        var tb = new Ext.Toolbar({
            renderTo: this.wrap.dom.firstChild,
            hidden : this.readOnly ? this.readOnly : this.hideToolbar,
            items: items
        });

        if (themeSelectItem) {
            this.themeSelect = themeSelectItem.el;

            this.mon(this.themeSelect, 'change', function(){
                var theme = this.themeSelect.dom.value;
                this.switchTheme(theme);
                this.mirror.setOption("theme", theme);
                this.setPersonConfig();
                this.autoSize();
                this.deferFocus();
            }, this);
        }

        // stop form submits
        this.mon(tb.el, 'click', function(e){
            e.preventDefault();
        });

        this.tb = tb;
        this.tb.doLayout();
    },    

    // private
    deferFocus : function(){
        this.focus.defer(10, this);
    },    
    setMode : function(mode){
        this.mirror.setOption("mode",mode);
        CodeMirror.autoLoadMode(this.mirror, mode);
    },
    setReadOnly: function(readOnly){
        if(readOnly !== this.readOnly){
            this.readOnly = readOnly;
            this.mirror.setOption("readOnly",readOnly);
        }
    },    
    getValue : function(){
        if(this.rendered) {
            return this.mirror.getValue();
        }
        var v = this.el.getValue();
        if(v === this.emptyText || v === undefined){
            v = '';
        }
        return v;
    },
    setValue : function(v){
        if(this.rendered){
            this.el.dom.value = (Ext.isEmpty(v) ? '' : v);
//            this.validate();
            this.mirror.setValue(v);
            this.autoSize();
        }
        return this;
    },
    /**
     * 获取用户针对编辑器的设置
     * @return {json}
     */
    getPersonConfig : function(){
        var v = Ext.util.Cookies.get('ijobs-codemirror');
        return v!==null ? Ext.decode(v) : null;    
    },
    /**
     * 将用户对编辑器的设置保存至cookies
     */
    setPersonConfig : function(){
        var me = this,
            editor = me.mirror,
            config = {
                theme : editor.getOption('theme'),
                lineNumbers : editor.getOption('lineNumbers')
            };
        Ext.util.Cookies.set('ijobs-codemirror',Ext.encode(config));
    },
    /**
     * 切换编辑器主题
     */
    switchTheme : function(theme){
        var me = this;
        if(!me.cacheTheme[theme] && theme!=='default'){
            Ext.util.CSS.swapStyleSheet(theme,'../js/common/CodeMirror/theme/'+theme+'.css');
            me.cacheTheme[theme] =theme;
        }
    },
    /**
     * 格式化代码
     */
    formatContent : function(){
        var editor = this.mirror;
        CodeMirror.commands["selectAll"](editor);
        editor.autoFormatRange(editor.getCursor(true), editor.getCursor(false));
    },
    /**
     * 自适应高度
     */
    autoSize : function(){  
        if(!this.grow || !this.rendered){
            return;
        }

        var contentEl = this.resizeEl.child('.CodeMirror-lines'),
            scrollEl = Ext.fly( this.mirror.getScrollerElement()),
            h;
        h = Math.min(this.growMax, Math.max(contentEl.getHeight(), this.growMin)) ;
        if(h != this.lastHeight){
            this.lastHeight = h;
            this.resizeEl.setHeight(h + this.tb.getHeight() + 10);
            scrollEl.applyStyles(
                h>this.growMax ? {
                    height : this.growMax,
                    overflow : 'scroll'
                } : {
                    height : h
                });
            this.fireEvent("autosize", this, h);
        }
    },
    // private
    onDestroy: function() {
        var editor = this.mirror;
        if(editor){
            Ext.destroy(this.tb);
            Ext.removeNode(editor.getWrapperElement())
            editor = null;
        }
        Ext.ux.CodeMirrorTextArea.superclass.onDestroy.call(this);
    }

});

Ext.form.CodeMirrorTextArea = Ext.ux.CodeMirrorTextArea;

//Ext.reg('codemirror','Ext.form.CodeMirrorTextArea');

//end file