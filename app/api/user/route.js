import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '../auth/[...nextauth]/authOptions';
import dbConnect from '@/utils/dbConnect';
import { User } from '@/models/schemas';

export const GET = async () => {
  const session = await getServerSession(authOptions);
  console.log('session', session);
  const userInfo = await fetch(`https://api.spotify.com/v1/me`, {
    headers: {
      Authorization: `Bearer ${session.user.access_token}`,
    },
  });
  const user = await userInfo.text();
  const userJson = JSON.parse(user);
  // console.log(userJson.display_name, userJson.email, userJson.id);
  await dbConnect();
  const userdb = await User.find({
    spotifyId: userJson.id,
  });
  // console.log(userdb);
  if (!userdb.length) {
    const newUser = new User({
      name: userJson.display_name,
      email: userJson.email,
      spotifyId: userJson.id,
    });
    await newUser.save();
  }
  // create dummy pl for testing
  if (!userdb[0].playlists.length) {
    const newPlaylist = {
      name: 'Test Playlist',
      songs: [
        {
          name: 'Test Song',
          artist: 'Test Artist',
          album: 'Test Album',
          uri: 'test uri',
        },
      ],
    };
    userdb[0].playlists.push(newPlaylist);
    await userdb[0].save();
  }
  return NextResponse.json(user);
};

// export const POST = async (req) => {

// };
