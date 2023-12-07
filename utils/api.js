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
