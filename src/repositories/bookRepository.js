const { EntityRepository, Repository } = require("typeorm");
import { Book } from "../entities/book.js"

@EntityRepository(Book)
export class BookRepository extends Repository{
  async createBook(title, isbn, author){
    const book = new Book();
    book.title = title;
    book.isbn = isbn;
    book.author = author;

  return await this.save(book)
  }
}