import { LibrarySong } from "./LibrarySong";

interface Props {
  songs: Array<Song>;
  setCurrentSong(song: Song): void;
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  setSongs(songs: Array<Song>): void;
  libraryStatus: boolean;
}

export const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus
}: Props) => (
  <div className={`library ${libraryStatus ? "active-library" : ""}`}>
    <h2>Library</h2>
    <div className="library-songs">
      {songs.map((song: Song) => (
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
