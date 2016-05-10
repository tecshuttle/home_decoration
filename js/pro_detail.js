$(document).ready(function(){
    $("#pkg-detail-tab-bd li a").removeClass("hover");
       $("#pkg-detail-tab-bd li").on("click", function () {
            var i = $(this).attr("rel");
            var box_top = $("#"+i).offset().top - 40;
            $("#pkg-detail-tab-bd li").removeClass("current");
            $(this).addClass("current");
            window.scrollTo(0, box_top);
           $("#pkgDetailTab").css({"position":"fixed"})
        });
                var isIE=!!window.ActiveXObject;
            var isIE6=isIE&&!window.XMLHttpRequest;
    var oneTop =$("#pkg-detail-tab-bd").offset().top;
        $(window).scroll( function() { 
           var left_nav = $("#pkg-detail-tab-bd li"),
               sidebar = $("#tripall").offset().top,
                fysm = $("#fysm").offset().top-100,
               fysm22 = $("#fysm").offset().top-300,
                    docTop =$(document).scrollTop(); 
                if (docTop >=oneTop) {
                    if(isIE6)
                    {
                    $("#pkgDetailTab").css({"position":"absolute"});   
                        
                    }
                    else
                    {
    
                      $("#pkgDetailTab").css({"position":"fixed"})
                    }
                    $(".booknow").css({"display":"block"});
                         if (docTop >=sidebar&&docTop<fysm22) {
                            if(isIE6)
                            {
                            $(".sidebar").css({"position":"absolute","top":"44px","marginTop":"0px"});   

                            }
                            else
                            {

                              $(".sidebar").css({"position":"fixed","top":"43px","marginTop":"0px"})
                            }

                        } else {

                            $(".sidebar").css({"position":"static","top":"44px","marginTop":"2px"});
                            $(".sidebar a").removeClass("current");
                            $(".sidebar a:eq(0)").addClass("current");
                        }
                    var allday=0;
                    $(".tripdays").each(function(index, domEle){
                        index=index+1;
                          var uH_top = $(domEle).offset().top,
                        uH_bot = uH_top +$(domEle).height();

                    if (docTop < uH_bot && docTop >= uH_top) {
                        $(".sidebar a").removeClass("current");
                        $(".sidebar a:eq("+index+")").addClass("current");              
                        

                    }
                    else if (docTop ==sidebar) {
                        $(".sidebar a").removeClass("current");
                        $(".sidebar a:eq(0)").addClass("current");
                    }
                    else {
                        return;
                    }
                       });
                       $(".pkg-detail-infor").each(function(index, domEle){
                          var uH_top = $(domEle).offset().top-40,
                        uH_bot = uH_top +$(domEle).height();

                    if (docTop < uH_bot && docTop >= uH_top) {
                        $("#pkg-detail-tab-bd li").removeClass("current");
                        $("#pkg-detail-tab-bd li:eq("+index+")").addClass("current");

                    }
                    else if (docTop ==sidebar) {
                        $("#pkg-detail-tab-bd li").removeClass("current");
                        $("#pkg-detail-tab-bd li:eq(0)").addClass("current");
                    }
                    else {
                        return;
                    }
                       });
                   
                    
                } else {
            
                    $("#pkgDetailTab").css({"position":"static"});                    
                    $(".booknow").css({"display":"none"})
                }
        });
        var backleght=0;
        var p_length =0+ $("#p_length").val()-1;
    $(".gy-back").click(function(){
        if(backleght==0)
            {
              backleght=p_length;
            }
        else
            {
              backleght=backleght-1;
            }
        if(backleght>4){
      	   $(".gy-thumb-list li").hide();
      	   for(var i=0,j=backleght;i<5;j--,i++){
      		   $(".gy-thumb-list li:eq("+j+") ").show();
      	   }
         }else{
         	 $(".gy-thumb-list li").hide();
        	   for(var i=0;i<=4;i++){
        		   $(".gy-thumb-list li:eq("+i+") ").show();
        	   }
         }
        var srcImg=$(".gy-thumb-list li:eq("+backleght+") a img").attr("src")
        $(".gy-image img").attr("src",srcImg);
        

    })
    $(".gy-forward").click(function(){
    	if(backleght==p_length){
        	backleght=0;
        }else{
        	 backleght=backleght+1;
        }
    	if(backleght>4){
     	   $(".gy-thumb-list li").hide();
     	   for(var i=0,j=backleght;i<5;j--,i++){
     		   $(".gy-thumb-list li:eq("+j+") ").show();
     	   }
        }else{
        	 $(".gy-thumb-list li").hide();
       	   for(var i=0;i<=4;i++){
       		   $(".gy-thumb-list li:eq("+i+") ").show();
       	   }
        }
        var srcImg=$(".gy-thumb-list li:eq("+backleght+") a img").attr("src")
        $(".gy-image img").attr("src",srcImg);
    })
    $(".gy-thumb-list li a img").click(function(){
        var srcImg=$(this).attr("src")
        $(".gy-image img").attr("src",srcImg);
        backleght=$(this).attr("data-num");

    })
     $(".sidebar a").click(function(){
       var i = $(this).attr("rel");
            var box_top = $("#"+i).offset().top-40;
            $(".sidebar a").removeClass("current");            
            window.scrollTo(0, box_top);
           $(this).addClass("current");

    })
    $(".sales").click(function(){
        $("#mPrint").height(window.document.body.offsetHeight);
$("#mPrint").css({"display":"block"})
$("#openWindow").css({"display":"block"})

    })
    $(".closes,.cancel").click(function(){       
$("#mPrint").css({"display":"none"})
$("#openWindow").css({"display":"none"})

    })
    
})    
//人数加1
$("#jia").click(function(){
	if($(".inputNum").val()==""){
		$(".inputNum").val(0);
	}else{
		$(".inputNum").val(parseInt($(".inputNum").val())+1);
	}
})
//人数减1
$("#jian").click(function(){
	if($(".inputNum").val()==""||$(".inputNum").val()==0){
		$(".inputNum").val(0);
	}else{
		$(".inputNum").val(parseInt($(".inputNum").val())-1);
	}
	
})       














