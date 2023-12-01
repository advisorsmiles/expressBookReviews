/*code correct per discussion forum Trouble with Task 8 and 9
require() is a method built in Node js and is used to incorporate external modules that are included in different files. 
The require() statment essentially reads and executes a Java Script file before returning the export*/
const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

/*The app.use() function is used to mount the specified middleware function(s) at the path which is being specified. 
It is mostly used to set up middleware for your application. 
app.use(path,callback)

Parameters:

path: It is the path for which the middleware function is being called. It can be a string representing a path or path pattern or a regular expression pattern to match the paths.
callback: It is a middleware function or a series/array of middleware functions.*/

const app = express();

app.use(express.json());

//a session object with user-defined secret as a middle ware to intercept the requests and ensure that the sessionis valid before processing
app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true})) 

app.use("/customer/auth/*", function auth(req,res,next){
    //Write the authenication mechanism here
    if(req.session.authorization){
        token = req.session.authorization['accessToken'];
        jwt.verify(token, "access",(err,user)=>{
            if(!err){
                req.user = user;
                next();
            }
            else{
                return res.status(403).json({message: "user not authenticated"})
            }
        });
    }  else {
            return res.status(403).json({message: "User not logged in"})
        }
});
//Previous block of code was added per updating the code for the authentication mechanism step

const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is an absulutely awesome purple butthole"));
