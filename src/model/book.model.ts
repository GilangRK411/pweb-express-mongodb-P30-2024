import mongoose, { Document, Schema } from "mongoose";

export interface IBook extends Document {
    rating: {
        average: number;
        count: number;
      };
      title: string;
      author: string;
      publishedDate: Date;
      publisher: string;
      description: string;
      coverImage: string;
      tags: string[];
      initialQty: number;
      qty: number;    
}

const BookSchema: Schema = new Schema({
    title: {type: "string", required: true},
    author: {type: "string", required: true},
    publishedDate: {type: "date", required: true},
    publisher: {type: "string", required: true},
    description: {type: "string", required: true},
    coverImage: {type: "string", required: true},
    tags: [{type: "string"}],
    initialQty: {type: "number", required: true},
    qty: {type: "number", required: true},
    rating: {
        average: {type: "number", default: 0},
        count: {type: "number", default: 0},
    }
})

export default mongoose.model<IBook>("Book", BookSchema);