const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
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


// Get the book list available in the shop
public_users.get('/books',function (req, res) {
  res.send(JSON.stringify(books, null, 4));
  const getBooks = new Promise((resolve, reject) => {
    resolve(res.send(JSON.stringify({books}, null, 4)));
  });

  getBooks.then(() => console.log("Promise for Task 10"));
});


// Get book details based on ISBN Promise
public_users.get('/books/isbn/:isbn',function (req, res) {
    const getBooksIsbn = new Promise((resolve, reject) => {
        const isbn = req.params.isbn;
        // console.log(isbn);
            if (req.params.isbn <= 10) {
            resolve(res.send(books[isbn]));
        }
            else {
                reject(res.send('ISBN not valid'));
            }
        });
        getBooksIsbn
            then(function(){
                console.log("Promise for task 11");
       }).
            catch(function () { 
                    console.log('ISBN not valid');
      });
      });
// Get book details based on ISBN 
      public_users.get('/isbn/:isbn',function (req, res) {
  booksList = books;
  newList = {};
  
  for(var key in booksList) {
      if(booksList.hasOwnProperty(key)) {
          var value = booksList[key];
          if  (value["isbn"] == isbn) {
              newList[key] = value;
          }

      }
  }
  res.send(newList);

  });
  
// Get book details based on author Promise
public_users.get('/books/author/:author',function (req, res) {
    const booksByAuthor = new Promise((resolve, reject) => {

        let booksByAuthor = [];
        let ISBN = Object.keys(books);
        isbn.forEach((isbn) => {
          if(books[isbn]["author"] === req.params.author) {
            booksByAuthor.push({"isbn":isbn,
                                "title":books[isbn]["title"],
                                "reviews":books[isbn]["reviews"]});
          resolve(res.send(JSON.stringify({booksByAuthor}, null, 4)));
          }
        });
        reject(res.send("author not valid"))
            
        });
    
        booksByAuthor.then(function(){
                console.log("Promise resolved");
       }).catch(function () { 
                    console.log("author not valid");
      });
    });
// Get book details based on author 
 public_users.get('author/:author',function (req, res) { 
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
  

// Get all books based on title Promise
public_users.get('/books/title/:title',function (req, res) {
const booksByTitle = new Promise((resolve, reject) => {
    const byTitle = req.params.title;
    // console.log(isbn);
        if (req.params.isbn <= 10) {
        resolve(res.send(books[title]));
    }
        else {
            reject(res.send('title not valid'));
        }
    });
    booksByTitle
        then(function(){
            console.log("Promise for task 13");
   }).
        catch(function () { 
                console.log('title not valid');
  });
  });
// Get all books based on title 
public_users.get('/title/:title',function (req, res) {
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
    const isbn = req.params.isbn;
    booksList = books;
    newList = {};
    
    for(var key in booksList) {
        if(booksList.hasOwnProperty(key)) {
            var value = booksList[key];
            if  (value["isbn"] == isbn) {
                newList[key] = value["reviews"];
            }
  
        }
    }
    res.send(newList);

});

module.exports.general = public_users;


