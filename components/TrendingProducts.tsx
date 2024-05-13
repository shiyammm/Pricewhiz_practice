import { getProductAll } from '@/lib/actions/amazon';
import Link from 'next/link';
import React from 'react';

const TrendingProducts = async () => {
  const allProducts = await getProductAll();

  console.log(allProducts);

  return (
    <section className="grid grid-cols-4">
      {allProducts?.map((product) => (
        <Link
          href={`search/amazon/product/${product._id}`}
          key={product._id}
          className="w-96"
        >
          <div>
            <h1>
              <span>{product.title}</span>
            </h1>
            <img src={product.image} alt={product.title} />
            <p>
              <span>
                <strong>Price:</strong> {product.currency}
                {product.currentPrice}
              </span>
              <br />
              <span>
                <strong>Original Price:</strong> {product.currency}
                {product.originalPrice}
              </span>
              <br />
            </p>
            <p>
              <span>
                <strong>Category:</strong> {product.category}
              </span>
              <br />
              <span>
                <strong>Reviews Count:</strong> {product.reviewsCount}
              </span>
              <br />
              <span>
                <strong>Out of Stock:</strong>{' '}
                {product.isOutOfStock ? 'Yes' : 'No'}
              </span>
            </p>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default TrendingProducts;
