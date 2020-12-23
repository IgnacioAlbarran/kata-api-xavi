import express from 'express';
import { createConnection, Repository, getCustomRepository } from "typeorm"

const app = express();
app.use(express.json);

(async ()=> {
    try{
        const connection = await createConnection();
        console.log("Connection stablished? : ", connection.isConnected);
    }catch(error){
        console.error(error)
    }
})()

app.listen(3000, () => {
    console.log('Ready on port 3000!');
});