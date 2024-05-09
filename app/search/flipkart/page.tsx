'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { scrapeFlipkartProduct } from '@/lib/actions/flipkart/index';
import { FormEvent, useState } from 'react';

const page = () => {
  const [flipkartSearchPrompt, setFlipkartSearchPrompt] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isValidFlipkartProductUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;
      if (
        hostname.includes('flipkart.com') ||
        hostname.includes('flipkart') ||
        hostname.includes('flipkart.in')
      )
        return true;
    } catch (error) {
      return false;
    }
    return false;
  };

  const handleFlipkartProductSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setIsSubmitted(false);

    // Validate Url
    const isValidLink = isValidFlipkartProductUrl(flipkartSearchPrompt);

    if (!isValidLink) {
      return alert('Please enter a valid Flipkart Product URL');
    }

    try {
      const product = await scrapeFlipkartProduct(flipkartSearchPrompt);
    } catch (error) {
      console.log(error);
    }

    setFlipkartSearchPrompt('');
  };

  return (
    <form onSubmit={handleFlipkartProductSubmit}>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="Paste the link of the product"
          value={flipkartSearchPrompt}
          onChange={(e) => setFlipkartSearchPrompt(e.target.value)}
        />
        <Button type="submit">{isSubmitted ? 'Searching' : 'Search'}</Button>
      </div>
    </form>
  );
};

export default page;
