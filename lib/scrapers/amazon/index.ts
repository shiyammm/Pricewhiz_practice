'use server';

import axios from 'axios';
import * as cheerio from 'cheerio';
import {
  extractDescription,
  extractDiscount,
  extractPrice,
} from '@/lib/amazonUtils';

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;

  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: 'brd.superproxy.io',
    port,
    rejectUnauthorized: false,
  };

  try {
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);

    const title = $('#productTitle').text().trim();

    const ratings = $('#acrCustomerReviewText').first().text().trim();

    const stars = $('i.cm-cr-review-stars-spacing-big span')
      .first()
      .text()
      .trim();

    const description = extractDescription($);

    const currentPrice = extractPrice(
      $('.priceToPay span.a-price-whole'),
      $('.a.size.base.a-color-price'),
      $('.a-button-selected .a-color-base'),
    );

    const originalPrice = extractPrice(
      $('#priceblock_ourprice'),
      $('.a-price.a-text-price span.a-offscreen'),
      $('#listPrice'),
      $('#priceblock_dealprice'),
      $('.a-size-base.a-color-price'),
    );

    const outOfStock =
      $('#availability span').text().toLowerCase() == 'Currently unavailable';

    const images =
      $('#imgBlkFront').attr('data-a-dynamic-image') ||
      $('#landingImage').attr('data-a-dynamic-image') ||
      '{}';

    const imageUrls = Object.keys(JSON.parse(images));

    const currencySymbol = $('.a-price-symbol').first().text().trim();

    const discount = extractDiscount($('.savingsPercentage'));

    const category = $('span.nav-a-content img.nav-categ-image').attr('alt');

    const data = {
      url,
      currency: currencySymbol || '',
      image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: discount,
      category: category,
      ratings: ratings,
      stars: stars,
      isOutOfStock: outOfStock,
      description,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    };
    return data;
  } catch (error) {
    throw new Error(`Failed to scrape the product ${error}`);
  }
}
