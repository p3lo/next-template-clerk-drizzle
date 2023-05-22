import { Button } from '@/components/ui/button';
import { db } from '@/db/db';
import { UserButton, currentUser } from '@clerk/nextjs';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import Image from 'next/image';
import Link from 'next/link';

async function getUser() {
  const user = await currentUser();
  console.log(user);
  return user;
}

export default function Home() {
  const user = getUser();

  async function handleMigrateDb() {
    'use server';
    const migration = await migrate(db, { migrationsFolder: 'db/migrations' });
    console.log(migration);
  }

  return (
    <main className="flex flex-col items-center min-h-screen p-24">
      <form action={handleMigrateDb}>
        <Button>MigrateDB</Button>
      </form>
      {user.then((user) => {
        if (user) {
          return (
            <div>
              <Image src={user.profileImageUrl} alt="Profile Image" width={200} height={200} />
              <h1>{user.createdAt}</h1>
              <p>{user.emailAddresses[0].emailAddress}</p>
            </div>
          );
        } else {
          return <p>Not logged in</p>;
        }
      })}
      <UserButton />
    </main>
  );
}
