import useGenres from "../hooks/useGenres";

const GenreList = () => {
  const { genres } = useGenres();
  return (
    <div>
      {genres.map((genre) => (
        <li key={genre.id}>{genre.name}</li>
      ))}
    </div>
  );
};

export default GenreList;
