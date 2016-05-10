Vue.filter('title', function (blog) {
    return blog.split('\n')[0].substr(1);
});

var blog = new Vue({
    el: '#blog',
    vue: '',
    data: {
        text: ''
    },
    filters: {
        marked: marked
    },
    created: function () {
        var me = this;

        $.ajax({
            url: "/review/getReview",
            type: "POST",
            dataType: "json",
            success: function (blog) {
                me.text = blog.text;
            }
        });
    }
});


//end file