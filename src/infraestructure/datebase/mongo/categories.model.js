import { Schema, model } from "mongoose";

const categoriesSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
}, { timestamps: true });

export default model('Categories', categoriesSchema);
