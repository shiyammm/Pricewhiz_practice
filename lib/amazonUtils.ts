type PriceHistoryItem = {
  price: number;
};

// Extract Description
export function extractDescription($: any) {
  const elements = $('#feature-bullets .a-unordered-list .a-spacing-mini span');
  if (elements.length > 0) {
    const textContent = elements
      .map((_: any, element: any) => $(element).text().trim())
      .get()
      .join('/n');
    return textContent;
  }
  return '';
}

// Extract Discount
export function extractDiscount(discount: any) {
  const element = discount.text().trim().replace(/[-%]/g, '');
  return element;
}

// Extract Price
export function extractPrice(...elements: any) {
  for (const element of elements) {
    const priceText = element.text().trim();

    if (priceText) {
      const cleanPrice = priceText.replace(/[^\d.]/g, '');

      let firstPrice;

      if (cleanPrice) {
        firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0];
      }

      return firstPrice || cleanPrice;
    }
  }

  return '';
}

// Extract Highest Price
export function getHighestPrice(priceList: PriceHistoryItem[]) {
  let highestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price > highestPrice.price) {
      highestPrice = priceList[i];
    }
  }

  return highestPrice.price;
}

// Extract Lowest Price
export function getLowestPrice(priceList: PriceHistoryItem[]) {
  let lowestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price < lowestPrice.price) {
      lowestPrice = priceList[i];
    }
  }

  return lowestPrice.price;
}

// Extract Average Price
export function getAveragePrice(priceList: PriceHistoryItem[]) {
  const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
  const averagePrice = sumOfPrices / priceList.length || 0;

  return averagePrice;
}
