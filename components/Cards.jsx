import React, { useState, useMemo, useRef, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
// import { tracks } from '@/utils/data';
import Image from 'next/image';

export default function Cards({ params }) {
  const [tracks, setTracks] = useState([]);
  // const [currentIndex, setCurrentIndex] = useState(tracks.length - 1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    setTracks(params.tracks);
    console.log('tracks', tracks);
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

  // const canGoBack = currentIndex < tracks.length - 1;
  const canGoBack = currentIndex > 0;

  // const canSwipe = currentIndex >= 0;
  const canSwipe = currentIndex < tracks.length;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    // updateCurrentIndex(index - 1);
    updateCurrentIndex(index + 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    // currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    document.querySelectorAll('audio').forEach((elem) => elem.pause());
    if (canSwipe && currentIndex < tracks.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
      // audio.pause();
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    // const newIndex = currentIndex + 1;
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
        // id={rec.id}
        ref={childRefs[index]}
        className="card w-96 h-96 bg-base-100 shadow-md border-2 border-primary border-solid"
        key={rec.id}
        onSwipe={(dir) => swiped(dir, rec.name, index)}
        onCardLeftScreen={() => outOfFrame(rec.name, index)}
      >
        <figure className="h-4/5">
          <Image
            src={rec.album.images[0].url || spotifyImage}
            width={200}
            height={200}
            // fill="true"
            alt="album art"
            className="w-auto h-full rounded-md pointer-events-none border-2 border-neutral border-solid"
          ></Image>
        </figure>
        <div className="card-body p-0 flex justify-center items-center text-center">
          <h2 className="card-title">{rec.name}</h2>
          <h3 className="card-subtitle">{rec.artists[0].name}</h3>
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
    <div>
      <div className="stack w-full h-full">{cards}</div>
      <div className="flex justify-around">
        <button className="btn btn-primary" onClick={() => swipe('left')}>
          Swipe left!
        </button>
        <button className="btn btn-primary" onClick={() => goBack()}>
          Undo swipe!
        </button>
        <button className="btn btn-primary" onClick={() => swipe('right')}>
          Swipe right!
        </button>
      </div>
    </div>
  );
}
