import { Request, Response, NextFunction } from 'express';
import Book from "../model/book.model"; 

export const borrowBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const bookId = req.params.id; 
    const qty = req.body.qty || 1;

    try {
        const book = await Book.findById(bookId);
        if (!book) {
            res.status(404).json({
                status: 'error',
                message: 'Buku tidak ditemukan.',
                data: null
            });
            return;
        }

        if (book.qty < qty) {
            res.status(400).json({
                status: 'error',
                message: `Stok buku tidak cukup. Tersisa ${book.qty} buku.`,
                data: null
            });
            return;
        }

        book.qty -= qty; 
        await book.save();

        res.status(200).json({
            status: 'success',
            message: 'Successfully borrow book',
            data: {
                currentQty: book.qty
            }
        });
    } catch (error: any) {
        next(new Error("Gagal meminjam buku: " + error.message));
    }
};

export const returnBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const bookId = req.params.id;
    const qty = req.body.qty || 1; 

    try {
        const book = await Book.findById(bookId); 
        if (!book) {
            res.status(404).json({
                status: 'error',
                message: 'Buku tidak ditemukan.',
                data: null
            });
            return;
        }
        if (book.qty + qty > book.initialQty) {
            res.status(400).json({
                status: 'error',
                message: `Jumlah buku yang dikembalikan tidak valid. Stok tidak bisa melebihi jumlah awal buku.`,
                data: null
            });
            return;
        }
        book.qty += qty;
        await book.save();

        res.status(200).json({
            status: 'success',
            message: 'Successfully return book',
            data: {
                currentQty: book.qty 
            }
        });
    } catch (error: any) {
        next(new Error("Gagal mengembalikan buku: " + error.message));
    }
};
