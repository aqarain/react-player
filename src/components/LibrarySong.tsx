interface Props {
  song: Song;
  songs: Array<Song>;
  setCurrentSong(song: Song): void;
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  setSongs(songs: Array<Song>): void;
}

export const LibrarySong = (props: Props) => {
  const { song, songs, setCurrentSong, audioRef, isPlaying, setSongs } = props;

  const songSelectHandler = async () => {
    await setCurrentSong(song);
    const updatedSongs = songs.map((currentSong: Song) => {
      if (currentSong.id === song.id) {
        return { ...currentSong, active: true };
      }
      return { ...currentSong, active: false };
    });
    setSongs(updatedSongs);
    if (isPlaying && audioRef.current) audioRef.current.play();
  };

  return (
    <div
      className={`library-song ${song.active ? "selected" : ""}`}
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
