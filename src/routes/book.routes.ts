import { Router } from "express";
import { getAllBooks, getBookById, addBook, updateBook, deleteBook } from "../controllers/book.controller";
import { borrowBook, returnBook } from "../controllers/mechanism.controller";

const router = Router();

router.get("/", getAllBooks);        
router.get("/:id", getBookById);     
router.post("/", addBook);           
router.patch("/:id", updateBook);    
router.delete("/:id", deleteBook);  

router.post("/:id/borrow", borrowBook);   
router.post("/:id/return", returnBook);  

export default router;
