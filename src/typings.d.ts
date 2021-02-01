interface Song {
  name: string;
  cover: string;
  artist: string;
  audio: string;
  color: Array<string>;
  id: string;
  active: boolean;
}

interface SongInfo {
  currentTime: number;
  duration: number;
  animationPercentage: number;
}
