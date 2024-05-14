'use server';

import {
  getAveragePrice,
  getHighestPrice,
  getLowestPrice,
} from '@/lib/amazonUtils';
import Product from '@/lib/models/amazonProduct.models';
import { connectToDB } from '@/lib/mongoose';
import { scrapeAmazonProduct } from '@/lib/scrapers/amazon';
import { revalidatePath } from 'next/cache';

// Function to scrape and store Amazon product details
export async function scrapeAndStoreAmazonProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    // Connect to MongoDB database
    connectToDB();

    // Scrape product details from Amazon
    const scrapedProduct = await scrapeAmazonProduct(productUrl);

    if (!scrapedProduct) return console.log("Couldn't scrapeAmazonProduct");

    let product = scrapedProduct;

    // Check if product already exists in the database
    const existingProduct = await Product.findOne({
      productUrl: scrapedProduct.url,
    });

    // Update existing product if found
    if (existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { priceHistory: scrapedProduct.currentPrice },
      ];

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }

    // Find and update product in the database, or insert if not found
    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true },
    );

    revalidatePath(`/products/${newProduct._id}`);
  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`);
  }
}

// Function to retrieve product by ID from the database
export const getProductById = async (productId: string) => {
  try {
    connectToDB();

    const product = await Product.findOne({ _id: productId });

    if (!product) return null;

    return product;
  } catch (error) {
    console.log(error);
  }
};

// Function to retrieve all products from the database
export const getProductAll = async () => {
  try {
    connectToDB();

    const product = await Product.find();

    if (!product) return null;

    return product;
  } catch (error) {
    console.log(error);
  }
};
