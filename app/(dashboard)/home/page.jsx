'use client';

import { useState, useEffect } from 'react';
import { getUserInfo, getRecommendations } from '@/utils/api';
import { genres } from '@/utils/data';
import Cards from '@/components/Cards';
import GenresSidebar from '@/components/GenresSidebar';
import PlaylistSidebar from '@/components/PlaylistSidebar';

export default function HomePage() {
  const [user, setUser] = useState();
  const [tracks, setTracks] = useState([]);
  const [seeds, setSeeds] = useState([]);

  const getUser = async () => {
    const response = await getUserInfo();
    const data = await JSON.parse(response);
    setUser(data);
    console.log('user data', data);
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

  useEffect(() => {
    getUser();
    // setRecs(recs);
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-1/4 h-full pt-8 flex justify-center items-center">
        <GenresSidebar
          params={{
            handleCheck,
            getRecs,
          }}
        />
      </div>
      <div className="w-1/2 h-full flex flex-col m-0 pt-8 justify-start items-center">
        <Cards params={{ tracks, seeds }} />
      </div>
      <div className="w-1/4 h-full pt-8 flex justify-center items-center">
        <PlaylistSidebar />
      </div>
    </div>
  );
}
