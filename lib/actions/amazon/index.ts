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

export async function scrapeAndStoreAmazonProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    connectToDB();

    const scrapedProduct = await scrapeAmazonProduct(productUrl);

    if (!scrapedProduct) return console.log("Couldn't scrapeAmazonProduct");

    let product = scrapedProduct;

    const existingProduct = await Product.findOne({
      productUrl: scrapedProduct.url,
    });

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
