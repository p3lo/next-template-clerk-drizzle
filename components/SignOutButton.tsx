'use client';
import { useClerk } from '@clerk/clerk-react';
import { Button } from './ui/button';

export default function SignOutButton() {
  const { signOut } = useClerk();
  return (
    <Button variant="ghost" onClick={() => signOut()}>
      Sign out
    </Button>
  );
}
