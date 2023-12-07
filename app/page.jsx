import Link from 'next/link';
import { getServerSession } from 'next-auth';

export default async function LandingPage() {
  const session = await getServerSession();

  let href;

  if (!session) {
    href = '/api/auth/signin';
  } else {
    href = '/home';
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">SpindrPro 2.0</h1>
          <p className="py-6">Swipe right on your perfect playlist.</p>
          <Link href={href}>
            <button className="btn btn-primary">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
