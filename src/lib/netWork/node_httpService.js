/**
 * Created by lx on 2016/12/5.
 */
var http = require('http');
var url = require('url');
http.createServer(function (req,res) {
    var query = url.parse(req.url,true).query;
    var wy_url = query.myUrl;
    var resultData = '';
    res.setHeader('Access-control-Allow-Origin','*');
    if (wy_url) {
        http.get(wy_url,function (response) {
            response.on('data',function (result) {
                resultData += result;
            });
            response.on('end',function () {
                if (query.callback) {
                    var str = query.callback + '(' + resultData + ')';

                }else {
                    var str = resultData;
                }
                res.end(str);
                console.log(resultData);
            })
        })
    }else {
        res.end()
    }
}).listen('3000',function (err) {
    if (!err){
        console.log('服务开启成功,服务为3000');
    }
});
