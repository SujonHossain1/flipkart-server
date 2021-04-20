const { Schema, model } = require('mongoose');

const categorySchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        slug: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        parentId: String,
    },
    { timestamps: true }
);

const Category = model('Category', categorySchema);
module.exports = Category;