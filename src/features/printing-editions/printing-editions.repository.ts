import BookModel from '../shared/db-models/Printing-edition';
import { Book } from '../shared/types/Printing-edition.types';

export async function GetBooksOnPage(PageNumber : number)
{
    let getBooks = await BookModel.find( {} ).skip((PageNumber-1)*3).limit(3); 
    if(!getBooks || getBooks.length === 0 ){
        throw new Error("Book catalog is empty");
    }
    return getBooks;
}

export async function AddBook(book : Book)
{
    BookModel.create({title : book.title, 
                      description: book.description,
                      coverImage: book.coverImage,
                      price: book.price,
                      amountInStorage: book.amountInStorage,
                      authorIds: book.authorIds
                    })
}

export async function GetAllBooks()
{
    let getBooks = await BookModel.find()
    if(!getBooks || getBooks.length === 0 ){
        throw new Error("Book catalog is empty");
    }
    return getBooks;
}