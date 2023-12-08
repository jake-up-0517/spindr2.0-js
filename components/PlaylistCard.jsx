export default function PlaylistCard({ playlist }) {
  const songs = playlist.songs.map((song) => {
    return <li key={song.name}>{song.name}</li>;
  });

  return (
    <div className="card w-52 h-80 border-2 border-solid border-neutral bg-base-300 rounded-lg overflow-scroll">
      <div className="card-body">
        <h1 className="card-title">{playlist.name}</h1>
        <div className="divider"></div>
        <ul className="">{songs}</ul>
      </div>
    </div>
  );
}
