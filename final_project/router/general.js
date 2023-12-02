const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

/*express.post()is a method meant to serve the create requests to the serve. It has two parameters, first defines the end point and 
the second is a function taking the request-handler and the response handler*/

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  
  if (username && password) {
    if (!isValid(username)) {
      users.push({"username":username, "password":password});
      return res.status(200).json({message: "Registered."});
    } else {
      return res.status(404).json({message: "User exists"});
    }
  }
  return res.status(404).json({message: "Error not able to register."});
});

/* express.get() is a method meant to serve the retrieve requests to the server. It has two parameters;first defines the end point and 
second is a function taking the request-handler and the response handler*/

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books, null, 4));
  
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn]);
  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  findAuthor = req.params.author;
  booksList = books;
  newList = {};
  
  for(var key in booksList) {
      if(booksList.hasOwnProperty(key)) {
          var value = booksList[key];
          if  (value["author"] == findAuthor) {
              newList[key] = value;
          }

      }
  }
  res.send(newList);
      
  });
  

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  findTitle = req.params.title;
  booksList = books;
  newList = {};
  
  for(var key in booksList) {
      if(booksList.hasOwnProperty(key)) {
          var value = booksList[key];
          if  (value["title"] == findTitle) {
              newList[key] = value;
          }

      }
  }
  res.send(newList);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  findIsbn = req.params.isbn;
  booksList = books;
  newList = {};
  another_array = {};
  
  for(var key in booksList) {
      if(booksList.hasOwnProperty(key)) {
          var value = booksList[key];
          if  (key == findIsbn) {
              newList[key] = value;
          }
          another_array[key] = newList["review"];

      }
  }
  res.send(another_array);

});

module.exports.general = public_users;

