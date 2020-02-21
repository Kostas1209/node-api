import { Request, Response, } from 'express';
import { GetBookOnPageService, AddBooksService, GetSortedListService, SearchBooksService } from './printing-editions.service';
import { Book } from '../shared/types/Printing-edition.types';

export async function GetBooksOnPageHandler(req: Request, resp: Response ): Promise<any>
{
    let PageNumber : number = <number> <unknown>req.params['page'];  
    try{
        let BooksOnPage : Book[] = await GetBookOnPageService(PageNumber);
        let responseData = [];
        BooksOnPage.forEach(element => {
            responseData.push({
                id : element._id,
                author: "Get from author bd",
                title: element.title,
                amount_in_storage: element.amountInStorage,
                price: element.price
            })
        }); 
        return resp.status(200).send({
            success: true,
            data: responseData
        })
    }
    catch(error){
        return resp.status(500).send(
            {
                success: false,
                message: error.toString(),
                data: null
            }
        )
    }
    

}

export async function AddBooksHandler(req: Request, resp: Response): Promise<any>
{
    /*
    *  request should contain arguments 'title', 'description', 'coverImage', 'price',
    *  'amountInStorage', array(authorIds) 
    */
    let book : Book ={
        title: req.body.title,
        description: req.body.description,
        coverImage: req.body.coverImage,
        price: req.body.price,
        amountInStorage: req.body.amountInStorage,
        authorIds: req.body.authorIds
    }
    try{
        AddBooksService(book);
        return resp.status(200).send({
            success: true,
            data: "Book was saved"
        })
    }
    catch(error){
        return resp.status(500).send({
            success: false,
            message: error.toString()
        })
    }
}

export async function SortBookHandler(req: Request, resp: Response): Promise<any>
{
    /*
    *  Request must containe column sorting by
    */

   try
   {
       let mode: string = req.body.mode;
       let books : Book[] = await GetSortedListService(mode);

       return resp.status(200).send({
           success: true,
           data: books
       })
   }
   catch(error)
   {
       return resp.status(500).send({
           success: false,
           data : null,
           message: error.toString()
       })
   }
        

}

export async function SearchBookHandle(req: Request, resp: Response): Promise<any>
{
    /*
    *   request must containe 'needle'
    */

    try{
        let stringForSearch: string = req.body.needle
        let books: Book[] = await SearchBooksService(stringForSearch);
        return resp.status(200).send({
            success: true,
            data: books
        })
    }
    catch(error)
    {
        return resp.status(500).send({
            success: false,
            data : null,
            message: error.toString()
        })
    }
}