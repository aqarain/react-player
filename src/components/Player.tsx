import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  songs: Array<Song>;
  setSongs(songs: Array<Song>): void;
  currentSong: Song;
  setCurrentSong(song: Song): void;
  isPlaying: boolean;
  setIsPlaying(isPlaying: boolean): void;
  audioRef: React.RefObject<HTMLAudioElement>;
  songInfo: SongInfo;
  setSongInfo(info: SongInfo): void;
  timeUpdateHandler(e): void;
}

export const Player = (props: Props) => {
  const {
    currentSong,
    isPlaying,
    setIsPlaying,
    audioRef,
    songInfo,
    setSongInfo,
    timeUpdateHandler,
    songs,
    setSongs,
    setCurrentSong
  } = props;

  const activeLibraryHandle = (nextPrev: Song) => {
    const updatedSongs = songs.map((song: Song) => {
      if (song.id === nextPrev.id) {
        return { ...song, active: true };
      }
      return { ...song, active: false };
    });
    setSongs(updatedSongs);
  };

  const getTime = (time: number) =>
    Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);

  const dragHandler = e => {
    if (audioRef.current) audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const playSongHandler = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(!isPlaying);
      } else {
        audioRef.current.play();
        setIsPlaying(!isPlaying);
      }
    }
  };

  const skipTrackHandler = async (direction: "skip-forward" | "skip-back") => {
    const currentIndex = songs.findIndex(({ id }) => id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandle(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandle(songs[songs.length - 1]);
        if (isPlaying && audioRef.current) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandle(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying && audioRef.current) audioRef.current.play();
  };

  const trackAnim = {
    transform: `translate(${songInfo.animationPercentage}%)`
  };

  return (
    <div className="player">
      <div className="time-control">
        <p> {getTime(songInfo.currentTime)} </p>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]} )`
          }}
        >
          <input
            type="range"
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p> {songInfo.duration ? getTime(songInfo.duration) : "0:00"} </p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
          onClick={() => skipTrackHandler("skip-back")}
        />
        <FontAwesomeIcon
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
          onClick={playSongHandler}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          onClick={() => skipTrackHandler("skip-forward")}
        />
      </div>
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
      />
    </div>
  );
};
