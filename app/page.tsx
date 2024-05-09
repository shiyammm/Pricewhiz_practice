import { ModeToggle } from '@/components/ui/ModeToggle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="">
      <h1>Welcome to Smart Shopping!</h1>
      <h2>Discover unbeatable deals with PriceWhiz</h2>
      <p>
        Track your favorite products and get notified when prices drop. Shop
        smarter, save more!
      </p>{' '}
      <div>
        <ModeToggle />
      </div>
      <div>
        <h2>Choose your favorite product:</h2>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Link className="" href="search/amazon">
            <Button>Amazon</Button>
          </Link>
          <Link className="" href="search/flipkart">
            <Button>Flipkart</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
