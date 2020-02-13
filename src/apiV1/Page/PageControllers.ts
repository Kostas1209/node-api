import { Request, Response, } from 'express';
import Book from './BookModel';

export default class {
    public findThree = async(req: Request, resp: Response ): Promise<any> =>{
        try{
            if(!req.params.pageId)
            {
                req.params.pageId = "1";
            }
            console.log(req.params.pageId);
            const pageNumber : number = <number> <unknown>req.params.pageId;
            const threeBooks = await Book.find( {}, { comments: { $slice: [(pageNumber-1)*3, 3] } } )
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
            console.log(JSON.stringify(req.body));
            return resp.status(200).send({
                success: true,
                data: "Save"
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