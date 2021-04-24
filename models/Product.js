const { Schema, model } = require('mongoose');

const productSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        alt: String,
        stock: {
            type: Number,
            required: true,
        },
        previousPrice: Number,
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            default: 1,
        },
        offer: {
            type: Number,
        },

        tags: [String],
        image: String,
        images: [String],
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        reviews: [
            {
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
                review: String,
            },
        ],
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        updatedAt: Date,
        metaTitle: String,
        metaDescription: String,
    },
    {
        timestamps: true,
    }
);

productSchema.index({ title: 'text', brand: 'text', description: 'text' });

const Product = model('Product', productSchema);
module.exports = Product;
