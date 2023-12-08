'use client';

import { useState, useEffect } from 'react';
import { getPlaylists, createPlaylist } from '@/utils/api';
import PlaylistCard from '@/components/PlaylistCard';

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    getUserPlaylists();
  }, []);

  const getUserPlaylists = async () => {
    const response = await getPlaylists();
    const data = await JSON.parse(response);
    setPlaylists(data);
  };

  const clickHandler = () => {
    const name = document.getElementById('name').value;
    console.log(name);
    createPlaylist(name);
  };

  const cards = playlists.map((playlist) => {
    return <PlaylistCard key={playlist.name} playlist={playlist} />;
  });

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <form>
        <input id="name" type="text"></input>
        <button type="submit" onClick={clickHandler}>
          Submit
        </button>
      </form>
      <div className="flex">{cards}</div>
    </div>
  );
}
