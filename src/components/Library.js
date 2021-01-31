import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus
}) => {
  return (
    <div className={`library ${libraryStatus && "active-library"}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map(song => (
          <LibrarySong
            key={song.id}
            song={song}
            songs={songs}
            setCurrentSong={setCurrentSong}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
