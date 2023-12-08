import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '../auth/[...nextauth]/authOptions';
import dbConnect from '@/utils/dbConnect';
import { User } from '@/models/schemas';

export const GET = async () => {
  const session = await getServerSession(authOptions);
  const userInfo = await fetch(`https://api.spotify.com/v1/me`, {
    headers: {
      Authorization: `Bearer ${session.user.access_token}`,
    },
  });
  const user = await userInfo.text();
  const userJson = JSON.parse(user);
  await dbConnect();
  const userdb = await User.find({
    spotifyId: userJson.id,
  });
  let playlists;
  if (userdb.length) {
    playlists = JSON.stringify(userdb[0].playlists);
  }
  return NextResponse.json(playlists);
};

export const PATCH = async (req) => {
  const session = await getServerSession(authOptions);
  let body = await req.text();
  body = JSON.parse(body);
  const [tracks, playlist] = body;
  const userInfo = await fetch(`https://api.spotify.com/v1/me`, {
    headers: {
      Authorization: `Bearer ${session.user.access_token}`,
    },
  });
  const user = await userInfo.text();
  const userJson = JSON.parse(user);
  await dbConnect();
  const userdb = await User.find({
    spotifyId: userJson.id,
  });
  const songs = [];
  if (userdb.length) {
    const index = userdb[0].playlists.findIndex((p) => p.name === playlist);
    userdb[0].playlists[index].songs.forEach((song) => {
      songs.push(song);
    });
  }
  const updatedSongs = [...songs, ...tracks];
  const update = await User.findOneAndUpdate(
    { spotifyId: userJson.id, 'playlists.name': playlist },
    { $set: { 'playlists.$.songs': updatedSongs } }
  );

  return NextResponse.json(JSON.stringify(update));
};

export const POST = async (req) => {
  const session = await getServerSession(authOptions);
  let body = await req.text();
  body = JSON.parse(body);
  const userInfo = await fetch(`https://api.spotify.com/v1/me`, {
    headers: {
      Authorization: `Bearer ${session.user.access_token}`,
    },
  });
  const user = await userInfo.text();
  const userJson = JSON.parse(user);
  await dbConnect();
  const newPlaylist = {
    name: body,
    songs: [],
  };
  const update = await User.findOneAndUpdate(
    { spotifyId: userJson.id },
    { $push: { playlists: newPlaylist } }
  );

  return NextResponse.json(JSON.stringify(update));
};
