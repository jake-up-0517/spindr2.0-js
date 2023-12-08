'use client';

import { useState, useEffect } from 'react';

export default function PlaylistSidebar({ params }) {
  const [count, setCount] = useState({});

  useEffect(() => {
    console.log('playlist sidebar');
    console.log(params.currentPlaylistTracks);
  }, [params.currentPlaylistTracks]);

  const selects = params.playlists.map((playlist) => {
    return (
      <option key={playlist.name} value={playlist.name}>
        {playlist.name}
      </option>
    );
  });

  const handleChange = async () => {
    // console.log(document.getElementById('pl-select').value);
    params.setCurrentPlaylist(document.getElementById('pl-select').value);
    params.updateCurrentPlaylistTracks(
      document.getElementById('pl-select').value
    );
  };

  // const poll = () => {
  //   console.log('polling');
  //   console.log(params.playlists);
  //   console.log(params.currentPlaylist);
  //   if (!params.currentPlaylist) return;
  //   else {
  //     params.playlists.every((playlist) => {
  //       if (playlist.name === params.currentPlaylist) {
  //         const tracks = [...params.currentTracks];
  //         playlist.songs.map((track) => {
  //           console.log(track.name);
  //           console.log(tracks);
  //           tracks.push(track.name);
  //         });
  //         setCurrentTracks(tracks);
  //         return false;
  //       } else {
  //         return true;
  //       }
  //     });
  //   }
  // };

  return (
    <div className="w-full h-full flex flex-col justify-around items-center">
      <select
        id="pl-select"
        className="select select-accent w-full"
        onChange={handleChange}
      >
        <option disabled selected>
          Select A Playlist
        </option>
        {selects}
      </select>
      <div className="w-full h-3/5 px-3 py-1 rounded-lg overflow-scroll border-2 border-solid border-secondary">
        {params.currentPlaylistTracks.map((track) => {
          return <div key={track}>{track}</div>;
        })}
        {params.currentTracks.map((track) => {
          return <div key={track.name}>{track.name}</div>;
        })}
      </div>
      <button
        className="btn btn-md btn-accent"
        onClick={params.updateCurrentPlaylist}
      >
        Update Playlist
      </button>
    </div>
  );
}
