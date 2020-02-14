import { Request, Response, } from 'express';
import Book from './BookModel';

export default class {
    public findThree = async(req: Request, resp: Response ): Promise<any> =>{
        try{
            if(!req.params.pageId)
            {
                req.params.pageId = "1";
            }
            const pageNumber : number = <number> <unknown>req.params.pageId;
            const threeBooks = await Book.find( {} ).skip((pageNumber-1)*3).limit(3); 
            if(!threeBooks || threeBooks.length === 0 ){
                return resp.status(404).send({
                    success: false,
                    message: "Book catalog is empty",
                    data: null
                })
            }

            resp.status(200).send({
                success: true,
                data: threeBooks
            });

        }
        catch(error) {
            resp.status(500).send(
                {
                    success: false,
                    message: error.toString(),
                    data: null
                }
            )
        }
    }

    public postBook = async(req: Request, resp: Response ): Promise<any> =>{
        try{
            const book = new Book({
                title : req.body.title,
                author: req.body.author,
                price: req.body.price,
                amount_in_storage: req.body.amount_in_storage
            })
            await book.save();

            return resp.status(200).send({
                success: true,
                data: "Save Book"
            })
        }
        catch(error)
        {
            resp.status(500).send(
                {
                    success: false,
                    message: error.toString(),
                    data: null
                }
            )
        }
    }
}