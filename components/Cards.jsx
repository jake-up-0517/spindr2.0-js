import React, { useState, useMemo, useRef, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
// import { tracks } from '@/utils/data';
import Image from 'next/image';

export default function Cards({ params }) {
  const [tracks, setTracks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState();

  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    setTracks(params.tracks);
    // console.log('tracks', tracks);
  }, [tracks, params.tracks]);

  const childRefs = useMemo(
    () =>
      Array(100)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex > 0;

  const canSwipe = currentIndex < tracks.length;

  // set last direction and decrease current index
  const swiped = (direction, track, index) => {
    console.log('swiped with a d');
    setLastDirection(direction);
    updateCurrentIndex(index + 1);
    if (direction === 'right') {
      const trackObj = {
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      };
      params.currentTracks.forEach((t) => {
        if (t.name === trackObj.name) {
          console.log('already in playlist');
          return;
        }
      });
      params.setCurrentTracks([...params.currentTracks, trackObj]);
    }
  };

  const outOfFrame = (track, idx) => {
    // console.log(track);
    console.log(
      `${track.name} (${idx}) left the screen!`,
      currentIndexRef.current
    );
    // handle the case in which go back is pressed before card goes outOfFrame
    // currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    console.log('just swipe');
    document.querySelectorAll('audio').forEach((elem) => elem.pause());
    if (canSwipe && currentIndex < tracks.length) {
      // console.log(childRefs[currentIndex].current);
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // decrease current index and show card
  const goBack = async () => {
    document.querySelectorAll('audio').forEach((elem) => elem.pause());
    if (!canGoBack) return;
    const newIndex = currentIndex - 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  const playAudio = (id) => {
    const audio = document.getElementById(id);
    audio.play();
    audio.addEventListener('timeupdate', () => {
      const currentTime = document.getElementById('current-time' + id);
      currentTime.innerHTML =
        Math.floor(audio.currentTime) < 10
          ? `0:0${Math.floor(audio.currentTime)}`
          : `0:${Math.floor(audio.currentTime)}`;
    });
  };

  const pauseAudio = (id) => {
    const audio = document.getElementById(id);
    audio.pause();
  };

  const cards = tracks.map((rec, index) => {
    return (
      <TinderCard
        ref={childRefs[index]}
        className="card w-[20em] h-[20em] bg-base-300 rounded-lg border-2 border-solid border-neutral"
        key={rec.id}
        onSwipe={(dir) => swiped(dir, rec, index)}
        onCardLeftScreen={() => outOfFrame(rec, index)}
      >
        <figure className="h-4/5 mt-2">
          <Image
            src={rec.album.images[0].url || spotifyImage}
            width={200}
            height={200}
            alt="album art"
            className="w-auto h-full overflow-visible rounded-md pointer-events-none border-2 border-neutral border-solid"
          ></Image>
        </figure>
        <div className="card-body p-0 m-0 bg-base-300 rounded-lg flex justify-around items-center text-center">
          <div className="card-title">{rec.name}</div>
          <div className="card-subtitle">{rec.artists[0].name}</div>
          <div className="w-full flex justify-center items-center">
            <button
              className="btn btn-circle mr-6 mb-2"
              onClick={() => playAudio(rec.id)}
            >
              Play
            </button>
            <audio id={rec.id} loop>
              <source src={rec.preview_url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <div className="flex justify-around mb-2">
              <div id={'current-time' + rec.id}>0:00</div>
              <div>/</div>
              <div id="total-time">
                {document.getElementById(rec.id) !== null &&
                document.getElementById(rec.id).duration
                  ? `0:${Math.floor(document.getElementById(rec.id).duration)}`
                  : '0:00'}
              </div>
            </div>
            <button
              className="btn btn-circle ml-6 mb-2"
              onClick={() => pauseAudio(rec.id)}
            >
              Pause
            </button>
          </div>
        </div>
      </TinderCard>
    );
  });

  return (
    <div className="w-full h-full flex flex-col justify-around items-center">
      <div className="stack">{cards}</div>
      {tracks.length ? (
        <div className="flex justify-between">
          <button
            className="btn btn-primary mr-4"
            onClick={() => swipe('left')}
          >
            Swipe left
          </button>
          <button className="btn btn-primary" onClick={() => goBack()}>
            Go Back
          </button>
          <button
            className="btn btn-primary ml-4"
            onClick={() => swipe('right')}
          >
            Swipe right
          </button>
        </div>
      ) : (
        <div>Select a genre to get recs</div>
      )}
    </div>
  );
}
