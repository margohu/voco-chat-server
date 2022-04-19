const express = require("express");

const app = express();
const PORT = 3000;

// array
var books = [
    { id: 1, title: 'Origin',                                author: 'Dan Brown'       },
    { id: 2, title: 'Death On The Nile',                     author: 'Agatha Christie' },
    { id: 3, title: 'Harry Potter and the order of phoenix', author: 'J K Rowling'     }
];


app.get('/', (req, res) => {
    res.send("hello wooooooorld");
});

/*
Route /books/:book
GET     -  Gets all books
POST    -  Adds a new book
DELETE  -  Deletes all books
*/

// get all books
app.get('/books', (req, res) => {
    res.send({
        books: books
    })
});

// add a new book
// route - /books?title=Murder%20On%20The%20Orient%20Express&author=Agatha%20Christie
app.post('/books', (req, res) => {
    const newEntry = {
        id     : books.length + 1,
        title  : req.query.title,
        author : req.query.author
    };
    // add it to array (database)
    books.push(newEntry);

    res.send({
        msg: 'Book added'
    });
});

// delete all books
app.delete('/books', (req, res) => {
    books.length = 0; //delete all elements
    res.send('Successfully deleted all books!');
});

/*
Route /books/:book
GET     -  Gets a specific book
DELETE  -  Deletes a specific book
PUT     -  Updates a specific book - by sending the whole object to update
PATCH   -  Updates a specific book - by sending only properties that need to be changed
*/
app.route('/books/:bookid')
    .get((req, res) => {

        const bookid = Number(req.params.bookid);
        const found = books.find(book => book.id === bookid);

        res.send({
            book: found
        });

    })
    .delete((req, res) => {

        const bookid = Number(req.params.bookid);

        books = books.filter(book => book.id !== bookid)

        res.send("Successfully deleted entry");

    })
    .put((req, res) => {

        const updated   = {
            id     : Number(req.params.bookid),
            title  : req.query.title,
            author : req.query.author
        };

        for (let index = 0; index < books.length; index++) {
            if ( books[index].id === updated.id ) {
                books[index] = updated
                break
            }
        }

        res.send("Updated successfully");

    })
    .patch((req, res) => {

        const bookid = Number(req.params.bookid);

        for (let index = 0; index < books.length; index++) {
            if ( books[index].id === bookid ) {

                const toUpdate = Object.keys(req.query)

                toUpdate.forEach(key => {
                    books[index][key] = req.query[key]
                });
            }
        }

        res.send("Updated successfully");

    });

app.listen(PORT, () => console.log("Server listening"));