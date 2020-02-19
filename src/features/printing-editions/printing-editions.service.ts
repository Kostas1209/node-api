import { GetBooksOnPage, AddBook, GetAllBooks } from "./printing-editions.repository";
import { Book } from "../shared/types/Printing-edition.types";
import { ModesForSortingBooks } from "../shared/enums";



export function GetBookOnPageService(PageNumber : number)
{
    if(PageNumber >= 1)
    {
        return GetBooksOnPage(PageNumber);
    }
    else{
        throw new Error("page number is not valid");
    }
}

export function AddBooksService(book: Book)
{
    /// check valid

    AddBook(book);
}

export async function GetSortedListService(mode :string) : Promise<Book[]>
{
    let books: Book[] = await GetAllBooks();
    let comparator : (first: Book, second: Book) => number;

    switch(mode)
    {
        case ModesForSortingBooks.AMOUNT_IN_STORAGE:
            comparator = (first : Book, second: Book)=>{
                if (first.amountInStorage > second.amountInStorage) {
                    return 1;
                }
            
                if (first.amountInStorage < second.amountInStorage) {
                    return -1;
                }
        
                return 0;
            }
            break;
        case ModesForSortingBooks.PRICE:
            comparator = (first : Book, second: Book)=>{
                if (first.price > second.price) {
                    return 1;
                }
            
                if (first.price < second.price) {
                    return -1;
                }
        
                return 0;
            }
            break;
        
        case ModesForSortingBooks.TITLE:
            comparator = (first : Book, second: Book)=>{
                if (first.title > second.title) {
                    return 1;
                }
            
                if (first.title < second.title) {
                    return -1;
                }
        
                return 0;
            }
            break;

        default:
            throw new Error("Mode is wrong");
    }

    books = books.sort(comparator);

    return Promise.resolve(books)
}