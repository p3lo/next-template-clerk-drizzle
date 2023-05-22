import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import SignOutButton from './SignOutButton';

export default function Header() {
  return (
    <header className="shadow">
      <div className="h-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center ">
            <Link href="/">HOME</Link>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <SignedOut>
              <Link className={buttonVariants({ variant: 'default' })} href="/sign-in">
                Log in
              </Link>

              <Link className={buttonVariants({ variant: 'outline' })} href="/sign-up">
                Register
              </Link>
            </SignedOut>
            <SignedIn>
              <SignOutButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
