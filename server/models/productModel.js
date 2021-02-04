import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
	{
		// of type ObjectId realtionship with User Model
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
			default: 0,
		},
		countInStock: {
			type: Number,
			default: 10,
		},
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model('Product', productSchema);

export default Product;
