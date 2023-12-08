import mongoose from 'mongoose';

const TrackSchema = new mongoose.Schema({
  name: String,
  artist: String,
  album: String,
  uri: String,
});
const PlaylistSchema = new mongoose.Schema({
  name: String,
  songs: [TrackSchema],
});
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  spotifyId: { type: String, unique: true },
  playlists: [PlaylistSchema],
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const Playlist =
  mongoose.models.Playlist || mongoose.model('Playlist', PlaylistSchema);
export const Track =
  mongoose.models.Track || mongoose.model('Track', TrackSchema);
