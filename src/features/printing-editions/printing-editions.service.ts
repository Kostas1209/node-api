import { GetBooksOnPage, AddBook } from "./printing-editions.repository";
import { Book } from "../shared/types/Printing-edition.types";


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