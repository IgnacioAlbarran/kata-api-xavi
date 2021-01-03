import express from 'express';
import { createConnection, Repository, getCustomRepository, getRepository } from "typeorm"
import { Book } from './entities/book';
import { BookRepository } from './repositories/bookRepository';

const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

(async ()=> {
    try{
        const connection = await createConnection();
        const queryRunner = await connection.createQueryRunner();
        console.log("Connection stablished? : ", connection.isConnected);
    }catch(error){
        console.error(error)
    }
})()

app.get('/', (req, res) => {
    res.send("hello world");
})

// book index route
app.get('/books', async (req, res) => {
    const bookList = await new getCustomRepository(BookRepository).getList();
    res.json(bookList);
})

// book route
app.get("/book/:identifier", async(req, res) => {
    var { identifier } = req.params;
    var book = await new getCustomRepository(BookRepository).getBook(identifier)
    res.send(book)
})

// // book route
// app.get("/book/:isbn", async(req, res) => {
//     var { isbn } = req.params;
//     console.log(req.params)
//     var book = await new getCustomRepository(BookRepository).getBook(isbn)
//     res.send(book)
// })

// create book route
app.post("/books", async(req, res) => {
    const { title, isbn, author } = req.body;

    const createdBook = await new getCustomRepository(BookRepository).createBook(title, isbn, author)
        .then(createdBook => res.send(createdBook))
        .catch(error => console.error(error))
        //// ESTO ESTÁ BIEN HECHO??? NO SÉ SI ME ESTÁ CAPTURANDO LOS ERRORES, PORQUE ME SALIÓ UNO POR CONSOLA, PERO NUNCA MAS, Y POR POSTMAN NO SALEN...
})

// update book route
app.put('/books/:id', async(req, res) => {
    const { id } = req.params
    const newObject = req.body
    const newBook = await new getCustomRepository(BookRepository).updateBook(id, newObject)
        .then(newBook => res.send(newBook))
        .catch(error => console.error(error));
})

// delete book route
app.delete('/books/:id', async(req, res) => {
    const { id } = req.params
    const deletedBook = await new getCustomRepository(BookRepository).deleteBook(id)
        .then(res.send("Eliminada la id: " + id))
        .catch(error => console.error(error))
})

app.listen(3000, () => {
    console.log('Ready on port 3000!');
});
