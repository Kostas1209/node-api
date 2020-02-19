import { Request, Response, } from 'express';
import { GetBookOnPageService, AddBooksService } from './printing-editions.service';
import { Book } from '../shared/types/Printing-edition.types';

export async function GetBooksOnPageHandler(req: Request, resp: Response ): Promise<any>
{
    let PageNumber : number = <number> <unknown>req.params['page'];  
    try{
        let BooksOnPage = await GetBookOnPageService(PageNumber);
        console.log("Books " + BooksOnPage );
        return resp.status(200).send({
            success: true,
            data: BooksOnPage
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