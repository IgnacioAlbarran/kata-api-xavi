import express from 'express';
import { createConnection, Repository, getCustomRepository } from "typeorm"
import { BookRepository } from './repositories/bookRepository';

const app = express();
app.use(express.json);

(async ()=> {
    try{
        const connection = await createConnection();
        console.log("Connection stablished? : ", connection.isConnected);
        const createdBook = await new getCustomRepository(BookRepository).createBook("La historia interminable", "B23453", "Michael Ende");
        console.log(createdBook);

    }catch(error){
        console.error(error)
    }
})()

app.listen(3000, () => {
    console.log('Ready on port 3000!');
});