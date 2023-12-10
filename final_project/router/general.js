const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

//Function to check if the user exists


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.query.username;
  const password = req.query.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

//   return res.status(300).json({message: "Yet to be implemented"});
// });

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  
  let promiseGetAllBooks = new Promise((resolve, reject)=> {
    let populatedBooks = books;
    resolve(populatedBooks);
  });

  promiseGetAllBooks.then(
      (data)=> res.send(data), 
      (err)=>console.log(err)
  );
//   return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let promiseGetBookByIsbn = new Promise((resolve,reject)=> {
    let bookByIsbn = {};
    bookByIsbn[isbn] = books[isbn];
    resolve(bookByIsbn);
  });
  
  promiseGetBookByIsbn.then(
      (data)=> res.send(data), 
      (err)=>console.log(err)
  );
  //   return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let promiseGetBookByAuthor = new Promise((resolve,reject)=> {
    let bookByAuthor = {};
    for(const [key,value] of Object.entries(books)){
        if(value.author == author) {
            bookByAuthor[key] = value;
            resolve(bookByAuthor);
        }
    }
  });
  
  promiseGetBookByAuthor.then(
      (data)=> res.send(data),

      (err)=> console.log(err)
  );
  
//   return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  let bookByTitle = {};
  for(const [key,value] of Object.entries(books)) {
      if(value.title == title) bookByTitle[key] = value;
  }
  res.send(bookByTitle);
//   return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let reviewsByIsbn = {};
  reviewsByIsbn[isbn] = {"reviews" : books[isbn].reviews};

  res.send(reviewsByIsbn);
//   return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
