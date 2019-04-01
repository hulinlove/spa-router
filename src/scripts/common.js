
/**
 * Get data with async requests
 * example Request.http({
 *    loading: //Boolean, default true, show loading icon,
 *    url: // String, the request url,
 *    type: // String, the request type, default get,
 *    params: // Object, the params for request,
 *    toast: // String, the msg which show pages when request back/fault with setTimeout,
 *    callback: // Function has tow arguments。the error first & result second
 * });
 * @type {{http: Request.http}}
 */
var Request = {
  http: function (option) {
    layui.use('layer', function () {
      var layer = layui.layer;
      if (option.loading !== false) {
        layer.load(2, {
          shade: [0.1, '#fff']
        });
      }
      $.ajax({
        url: option.url,
        type: option.type || 'get',
        data: option.params,
        dataType: 'json',
        cache: false,
        success: function (result) {
          closeLoading();
          if (option.toast) layer.msg(option.toast);
          if (option.callback) option.callback(null, result);
        },
        error: function (error) {
          closeLoading();
          if (option.callback) option.callback(error);
        }
      });

      // close loading when async callback, after callback the max timeout is 100ms
      function closeLoading() {
        setTimeout(function () {
          layer.closeAll('loading');
        }, 100);
      }
    });
  }
}