import { genres } from '@/utils/data';

export default function GenresSidebar({ params }) {
  const capitalizeGenres = (genres) => {
    const capitalizedGenres = [];
    genres.forEach((genre) => {
      const capitalized = genre.charAt(0).toUpperCase() + genre.slice(1);
      capitalizedGenres.push(capitalized);
    });
    return capitalizedGenres;
  };

  const capitalizedGenres = capitalizeGenres(genres);

  const checkboxes = capitalizedGenres.map((genre, index) => {
    return (
      <label key={genre} className="label cursor-pointer">
        <span className="label-text">{genre}</span>
        <input
          type="checkbox"
          className="checkbox-secondary"
          onChange={() => params.handleCheck(index)}
        />
      </label>
    );
  });

  return (
    <div className="w-full h-screen m-4 flex flex-col justify-between items-center">
      <div className="form-control w-4/5 h-[65%] mt-1 px-3 py-1 rounded-xl overflow-scroll border-2 border-solid border-secondary">
        {checkboxes}
      </div>
      <button className="btn btn-lg btn-accent mb-32" onClick={params.getRecs}>
        Get Recs
      </button>
    </div>
  );
}
