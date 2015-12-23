/**
 * Created by jhp-android on 15/8/7.
 */
var mongodb = require('./db');

function Admin(admin) {
    this.email = admin.email;
    this.password = admin.password;
};

module.exports = Admin;

Admin.prototype.save = function(callback) {

    var admin = {
        email: this.email,
        password: this.password
    };

    mongodb.open(function(err, db){
       if(err){
           return callback(err);
       }

       db.collection('admin',function(err, collection){
           if(err){
               mongodb.close();
               return callback(err);
           }

           collection.insert(admin,{
               safe : true
           },function(err, admin){
               mongodb.close();
               if(err){
                   return callback(err);
               }

               callback(null, admin[0]);
           });
       });
    });
};

Admin.get = function(email, callback){

    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }

        db.collection('admin',function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }

            collection.findOne({
                email : email
            },function(err, admin){
                mongodb.close();
                if(err){
                    return callback(err);
                }

                callback(null, admin);
            });
        });
    });
};


