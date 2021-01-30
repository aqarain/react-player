const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs
}) => {
  const songSelectHandler = () => {
    setCurrentSong(song);
    const updatedSongs = songs.map(currentSong => {
      if (currentSong.id === song.id) {
        return { ...currentSong, active: true };
      }
      return { ...currentSong, active: false };
    });
    setSongs(updatedSongs);
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(audio => {
          audioRef.current.play();
        });
      }
    }
  };
  return (
    <div
      className={`library-song ${song.active && "selected"}`}
      onClick={songSelectHandler}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
