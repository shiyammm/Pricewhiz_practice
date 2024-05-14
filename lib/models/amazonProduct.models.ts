import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, unique: true },
    currency: { type: String, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    priceHistory: [
      {
        price: { type: Number, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    lowestPrice: { type: Number },
    highestPrice: { type: Number },
    averagePrice: { type: Number },
    discountRate: { type: Number },
    description: { type: String },
    category: { type: String },
    reviewsCount: { type: Number },
    isOutOfStock: { type: Boolean, default: false },
    users: [{ email: { type: String, required: true } }],
    default: [],
  },
  { timestamps: true },
);

const Product =
  mongoose.models.Product || mongoose.model('Product', ProductSchema);

/*  mongoose.models.Product This checks if the Product model has already been registered with Mongoose. 
    If it has been registered, it returns the existing model. If not, it returns undefined.

    mongoose.model('Product', ProductSchema): This creates or retrieves the Product model. 
    If the model has already been registered, it returns the existing model. 
    If not, it creates a new model using the provided schema (ProductSchema) and registers it with Mongoose under the name 'Product'. */


export default Product;
