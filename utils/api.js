const createUrl = (path) => {
  return window.location.origin + path;
};

export const getUserInfo = async () => {
  const res = await fetch(
    new Request(createUrl('/api/user'), {
      method: 'GET',
    })
  );
  if (res.ok) {
    const data = await res.json();
    return data;
  }
};

export const getPlaylists = async () => {
  const res = await fetch(
    new Request(createUrl('/api/playlists'), {
      method: 'GET',
    })
  );
  if (res.ok) {
    const data = await res.json();
    return data;
  }
};

export const updatePlaylist = async (tracks, playlist) => {
  const body = [tracks, playlist];
  console.log('body', body);
  const res = await fetch(
    new Request(createUrl('/api/playlists'), {
      method: 'PATCH',
      body: JSON.stringify(body),
    })
  );
  if (res.ok) {
    const data = await res.json();
    return data;
  }
};

export const createPlaylist = async (name) => {
  const body = name;
  const res = await fetch(
    new Request(createUrl('/api/playlists'), {
      method: 'POST',
      body: JSON.stringify(body),
    })
  );
  if (res.ok) {
    const data = await res.json();
    return data;
  }
};

export const getTopArtists = async () => {
  const res = await fetch(
    new Request(createUrl('/api/artists'), {
      method: 'GET',
    })
  );
  if (res.ok) {
    const data = await res.json();
    return data;
  }
};

export const getRecommendations = async (seed) => {
  const seedString = seed.join('%2C+');
  console.log('seedString', seedString);
  const res = await fetch(
    new Request(createUrl('/api/recommendations'), {
      method: 'POST',
      body: seedString,
    })
  );
  if (res.ok) {
    const data = await res.json();
    return data;
  }
};
