import { getProductById } from '@/lib/actions/amazon';
import { redirect } from 'next/navigation';

type Props = {
  params: { productId: string };
};

const page = async ({ params: { productId } }: Props) => {
  const product = await getProductById(productId);

  if (!product) redirect('/');

  return (
    <div>
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
          <span>
            <strong>Discount Rate:</strong> {product.discountRate}%
          </span>
        </p>
        <p>
          <span>
            <strong>Lowest Price:</strong> {product.currency}
            {product.lowestPrice}
          </span>
          <br />
          <span>
            <strong>Highest Price:</strong> {product.currency}
            {product.highestPrice}
          </span>
          <br />
          <span>
            <strong>Average Price:</strong> {product.currency}
            {product.averagePrice}
          </span>
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
            <strong>Out of Stock:</strong> {product.isOutOfStock ? 'Yes' : 'No'}
          </span>
        </p>
        <p>
          <span>{product.description}</span>
        </p>
      </div>{' '}
      <br />
      <br />
      <br />
    </div>
  );
};

export default page;
