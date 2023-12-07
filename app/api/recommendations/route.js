import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '../auth/[...nextauth]/authOptions';

export const POST = async (req) => {
  const session = await getServerSession(authOptions);
  const seed = await req.text();
  const url = `https://api.spotify.com/v1/recommendations?limit=50&seed_genres=${seed}`;
  const recs = await fetch(url, {
    headers: {
      method: 'GET',
      Authorization: `Bearer ${session.user.access_token}`,
    },
  });
  const data = await recs.text();
  return NextResponse.json(data);
};
