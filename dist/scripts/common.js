var Request={http:function(c){layui.use("layer",function(){var l=layui.layer;function t(){setTimeout(function(){l.closeAll("loading")},100)}!1!==c.loading&&l.load(2,{shade:[.1,"#fff"]}),$.ajax({url:c.url,type:c.type||"get",data:c.params,dataType:"json",cache:!1,success:function(a){t(),c.toast&&l.msg(c.toast),c.callback&&c.callback(null,a)},error:function(a){t(),c.callback&&c.callback(a)}})})}};