const { EntityRepository, Repository } = require("typeorm");
import { Book } from "../entities/book.js"

@EntityRepository(Book)
export class BookRepository extends Repository{
  async createBook(title, isbn, author){
    try{
      const book = new Book();
      book.title = title;
      book.isbn = isbn;
      book.author = author;
      return await this.save(book)
    }
    catch(error){
      return error;
    }
  }

  async getList(){
    try{
      return await this.find()
    }catch(error){
      return error
    }
  }

  async getBook(param){
    try{
      if (isNaN(Number.parseInt(param))){
        return await this.findOne({isbn: param})
      }else{
        return await this.findOne({id: Number.parseInt(param)})
      }
    }catch(error){
      return error
    }
  }

  async deleteBook(id){
    try{
      const bookRemoved = this.findOne({id: id})
      return await this.delete(id)
    }catch(error){
      return error
    }
  }

  async updateBook(id, book){
    try{
      const deletedObject = await this.delete(id);
      const newBook = book;
      newBook.id = id;
      return await this.save(newBook)
    }catch(error){
        return error;;
    }
  }
}