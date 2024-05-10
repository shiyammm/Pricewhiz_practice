'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { scrapeAndStoreAmazonProduct } from '@/lib/actions/amazon/index';
import { FormEvent, useState } from 'react';

const page = () => {
  const [amazonSearchPrompt, setAmazonSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isValidAmazonProductUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;
      if (
        hostname.includes('amazon.com') ||
        hostname.includes('amazon') ||
        hostname.includes('amazon.in')
      )
        return true;
    } catch (error) {
      return false;
    }
    return false;
  };

  const handleAmazonProductSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    // Validate Url
    const isValidLink = isValidAmazonProductUrl(amazonSearchPrompt);

    if (!isValidLink) {
      return alert('Please enter a valid Amazon Product URL');
    }

    try {
      setIsLoading(true);
      const product = await scrapeAndStoreAmazonProduct(amazonSearchPrompt);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }

    setAmazonSearchPrompt('');
  };

  return (
    <form onSubmit={handleAmazonProductSubmit}>
      <div className="flex w-full max-w-sm items-center space-x-2 active:border-none">
        <Input
          type="text"
          placeholder="Paste the link of the product"
          value={amazonSearchPrompt}
          onChange={(e) => setAmazonSearchPrompt(e.target.value)}
        />
        <Button disabled={amazonSearchPrompt === ''} type="submit">
          {isLoading ? 'Loading' : 'Search'}
        </Button>
      </div>
    </form>
  );
};

export default page;
