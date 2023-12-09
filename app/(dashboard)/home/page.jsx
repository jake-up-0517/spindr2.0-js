'use client';

import { useState, useEffect } from 'react';
import {
  getUserInfo,
  getRecommendations,
  getPlaylists,
  updatePlaylist,
} from '@/utils/api';
import { genres } from '@/utils/data';
import Cards from '@/components/Cards';
import GenresSidebar from '@/components/GenresSidebar';
import PlaylistSidebar from '@/components/PlaylistSidebar';

export default function HomePage() {
  const [user, setUser] = useState(); // user info
  const [tracks, setTracks] = useState([]); //recommended tracks
  const [seeds, setSeeds] = useState([]); // selected genres
  const [playlists, setPlaylists] = useState([]); // user playlists from db
  const [currentPlaylist, setCurrentPlaylist] = useState(); // current selected playlist
  const [currentPlaylistTracks, setCurrentPlaylistTracks] = useState([]); // current saved tracks from db
  const [currentTracks, setCurrentTracks] = useState([]); // current unsaved tracks

  useEffect(() => {
    getUser();
    getUserPlaylists();
  }, []);

  useEffect(() => {
    console.log('currentTracks', currentTracks);
    console.log('currentPlaylistTracks', currentPlaylistTracks);
    // updateCurrentPlaylist();
  }, [currentPlaylist, currentTracks, currentPlaylistTracks]);

  // useEffect(() => {
  //   updateCurrentPlaylist();
  //   console.log('currentPlaylist in UE', currentPlaylist);
  //   updateCurrentPlaylistTracks(currentPlaylist);
  // }, [currentPlaylist]);

  const getUser = async () => {
    const response = await getUserInfo();
    const data = await JSON.parse(response);
    setUser(data);
  };

  const getUserPlaylists = async () => {
    const response = await getPlaylists();
    const data = await JSON.parse(response);
    console.log('gup pl', data);
    setPlaylists(data);
  };

  const updateCurrentPlaylist = async () => {
    console.log('update current playlist');
    const response = await updatePlaylist(currentTracks, currentPlaylist);
    const data = await JSON.parse(response);
    console.log(data);
    updateCurrentPlaylistTracks(currentPlaylist);
  };

  const updateCurrentPlaylistTracks = async (name) => {
    console.log('updating current playlist tracks');
    await getUserPlaylists();
    console.log('playlists', playlists);
    // setCurrentTracks([]);
    playlists.every((playlist) => {
      if (playlist.name === name) {
        // console.log('found');
        const tracks = [];
        playlist.songs.map((track) => {
          tracks.push(track.name);
        });
        setCurrentPlaylistTracks(tracks);
        return false;
      } else {
        return true;
      }
    });
  };

  const handleCheck = (index) => {
    const current = genres[index];
    if (seeds.indexOf(current) === -1) {
      setSeeds([...seeds, current]);
    } else {
      setSeeds(seeds.filter((seed) => seed !== current));
    }
  };

  const getRecs = async () => {
    const response = await getRecommendations(seeds);
    const data = await JSON.parse(response);
    setTracks(data.tracks);
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-1/5 h-full mb-8 ml-1 flex justify-center items-center">
        <GenresSidebar
          params={{
            handleCheck,
            getRecs,
          }}
        />
      </div>
      <div className="w-3/5 h-full flex flex-col justify-between items-center">
        <Cards
          params={{
            tracks,
            seeds,
            currentTracks,
            setCurrentTracks,
          }}
        />
      </div>
      <div className="w-1/5 h-full mr-1 flex justify-center items-center">
        <PlaylistSidebar
          params={{
            playlists,
            currentTracks,
            currentPlaylist,
            currentPlaylistTracks,
            setCurrentTracks,
            setCurrentPlaylist,
            updateCurrentPlaylistTracks,
            updateCurrentPlaylist,
          }}
        />
      </div>
    </div>
  );
}
