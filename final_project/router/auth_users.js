const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    //write code to check is the username is valid

    let validName = users.filter((user)=>{
        return user.username === username
    });
    if(validName.length > 0){
        return true;
    } else {
        return false;
    }
}

const authenticatedUser = (username,password)=>{ //returns boolean
    //write code to check if username and password match the one we have in records.

    let authUser = users.filter((user)=>{
        return (user.username === username && user.password === password)
    });
    if(authUser.length > 0){
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
      return res.status(404).json({message: "Cannot log in"});
  }
  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });
    req.session.authorization = {
      accessToken,username
  }
  console.log("Access Token: " + accessToken + " Username: " + username);
  console.log("req.session.authorization: " + req.session.authorization);
  return res.status(200).send("Success");
  } else {
    return res.status(208).json({message: "Invalid username and password"});
  }
    
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    console.log("Hello this is the PUT REQUEST function")
    const findIsbn = req.params.isbn;
    console.log(findIsbn);
    let listedBook = books[findIsbn]
    console.log(listedBook);
    if (listedBook) { 
        let newReview = req.query.reviews;
        console.log("New Review: "+newReview)
        for(var key in books) {
            if(books.hasOwnProperty(key)) {
                var value = books[key];
                console.log("Value: "+value)
                if  (key == findIsbn) {
                    value["reviews"] = newReview;
                    console.log("Updated value reviews: " + value["reviews"]);
                }

            }
        }

        res.send(`The review for the book with isbn ${findIsbn} has been added/updated. `)
    }

});

regd_users.delete("/auth/review/:isbn", (req, res) => {

    console.log("Hello this is the DELETE REQUEST function")
    uName = req.body.username;
    console.log("Username: " + uName);
    const findIsbn = req.params.isbn;
    console.log(findIsbn);
    let filtered_book = books[findIsbn]
    console.log(listedBook);
    if (listedBook) { //Check if the book exists
        let newReview = {};
        console.log("New Review: "+newReview)
        for(var key in books) {
            if(books.hasOwnProperty(key)) {
                var value = books[key];
                console.log("Value: "+value)
                if  (key == findIsbn) {
                    value["reviews"] = newReview;
                    console.log("Updated value reviews: " + value["reviews"]);
                }

            }
        }

        res.send(`The review for the book by ${uName} with isbn ${findIsbn} has been deleted. `)
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
