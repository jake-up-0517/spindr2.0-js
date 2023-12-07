import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '../auth/[...nextauth]/authOptions';

export const GET = async () => {
  const session = await getServerSession(authOptions);
  const userInfo = await fetch(`https://api.spotify.com/v1/me`, {
    headers: {
      Authorization: `Bearer ${session.user.access_token}`,
    },
  });
  const user = await userInfo.text();
  return NextResponse.json(user);
};
