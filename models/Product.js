const { Schema, model } = require('mongoose');

const ProductSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			required: true,
		},

		brand: {
			type: String,
			trim: true,
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
		quantity: {
			type: Number,
			default: 1,
		},
		tags: [String],
		image: String,
		images: String,
		description: String,
	},
	{
		timestamps: true,
	}
);

ProductSchema.index({ title: 'text', description: 'text' });

const Product = model('Product', ProductSchema);
module.exports = Product;
