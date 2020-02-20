import { Router } from "express";
import { GetBooksOnPageHandler, AddBooksHandler, SortBookHandler, SearchBookHandle } from "./printing-editiions.user.handler";

const bookRoutes : Router = Router();

bookRoutes.get("/search", SearchBookHandle );
bookRoutes.get("/sort", SortBookHandler);
bookRoutes.get("/:page",GetBooksOnPageHandler);


bookRoutes.post("/", AddBooksHandler);

export default bookRoutes;



// export const adminRoutes : Router = Router();

// adminRoutes.get("/:id");
// adminRoutes.post("/:id");
// adminRoutes.put("/:id");
// adminRoutes.delete("/id")