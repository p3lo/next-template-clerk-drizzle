import { UserButton, currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

async function getUser() {
  const user = await currentUser();
  console.log(user);
  return user;
}

export default function Home() {
  const user = getUser();

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <Link href="/sign-up">Signup</Link>
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
