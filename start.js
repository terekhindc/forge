// To avoid the EXDEV rename error, see http://stackoverflow.com/q/21071303/76173
process.env.TMPDIR ='uploads' ;
//process.env ['NODE_TLS_REJECT_UNAUTHORIZED'] ='0' ; // Ignore 'UNABLE_TO_VERIFY_LEAF_SIGNATURE' authorization error

var app =require ('./server/server') ;

var server =app.listen (app.get ('port'), function () {
    console.log ('Server listening on port ' + server.address ().port) ;
}) ;

if (process.env.NODE_ENV === 'development') {
    server.on('error', function (err) {
        if (err.errno === 'EACCES') {
            console.log('Port ' + app.get('port') + ' already in use.\nExiting...');
            process.exit(1);
        }
    });
}

module.exports = app;
