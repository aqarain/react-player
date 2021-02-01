interface Props {
  currentSong: Song;
  isPlaying: boolean;
}

export const Song = (props: Props) => {
  const {
    currentSong: { cover, name, artist },
    isPlaying
  } = props;
  return (
    <div className="song-container">
      <img src={cover} alt={name} className={isPlaying ? "rotateSong" : ""} />
      <h2>{name}</h2>
      <h3>{artist}</h3>
    </div>
  );
};
