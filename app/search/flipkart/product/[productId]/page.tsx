import React from 'react';

const page = ({ params }: { params: { productId: string } }) => {
  return <div>Product No: {params.productId}</div>;
};

export default page;
