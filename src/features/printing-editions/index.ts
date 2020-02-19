import { Router } from "express";
import user from "../../apiV1/User/UserRoutes";
import { GetBooksOnPageHandler, AddBooksHandler } from "./printing-editiions.user.handler";

export const userRoutes : Router = Router();

userRoutes.get("/:page",GetBooksOnPageHandler);
userRoutes.post("/", AddBooksHandler);



// export const adminRoutes : Router = Router();

// adminRoutes.get("/:id");
// adminRoutes.post("/:id");
// adminRoutes.put("/:id");
// adminRoutes.delete("/id")