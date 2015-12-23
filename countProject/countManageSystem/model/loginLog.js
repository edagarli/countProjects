/**
 * Created by jhp-android on 15/8/9.
 */
var mongodb = require("./db");

function LoginLog(loginLog){
    this.platform = loginLog.platform;
    this.userId = loginLog.userId;
    this.loginTime = loginLog.loginTime;
    this.osVer = loginLog.osVer;
    this.appVersion = loginLog.appVersion;
    this.deviceId = loginLog.deviceId;
    this.ip = loginLog.ip;
}

module.exports = LoginLog;


LoginLog.getByTime = function(loginTime , callback){

    mongodb.open(function(err , db){
        if(err){
            return callback(err);
        }

        db.collect('LoginLog',function(err , collection){
            if(err){
                mongodb.close();
                return callback(err);
            }

            var bTime ;
            if(loginTime){

            }

            collection.count();
        });
    });
};

