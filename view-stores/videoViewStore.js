import {IVideosViewStore} from 'typescript/view-store.types';
import {action, makeObservable, observable} from 'mobx';

const initialData = {
  fullScreenMode: false,
  movieOnPlay: true,
  timeOfTheMovie: 0,
  durationOfMovie: 0,
  openVideoPlayer: false,
  doesNotSeenTutorials: false,
  videoObject: null,
};

class VideosViewStore implements IVideosViewStore {
  fullScreenMode: boolean = initialData.fullScreenMode;
  movieOnPlay: boolean = initialData.movieOnPlay;
  timeOfTheMovie: number = initialData.timeOfTheMovie;
  durationOfMovie: number = initialData.durationOfMovie;
  openVideoPlayer: boolean = initialData.openVideoPlayer;
  videoObject: any = initialData.videoObject;

  constructor() {
    makeObservable(this, {
      fullScreenMode: observable,
      movieOnPlay: observable,
      timeOfTheMovie: observable,
      durationOfMovie: observable,
      openVideoPlayer: observable,
      videoObject: observable,
      setOpenVideoPlayer: action.bound,
      setDurationOfMovie: action.bound,
      setFullScreenMode: action.bound,
      setMovieOnPlay: action.bound,
      setTimeOfTheMovie: action.bound,
      setVideoObject: action.bound,
    });
  }

  setOpenVideoPlayer = () => {
    this.openVideoPlayer = !this.openVideoPlayer;
  };

  setDurationOfMovie = (duration: number) => {
    this.durationOfMovie = duration;
  };

  setFullScreenMode = () => {
    this.fullScreenMode = !this.fullScreenMode;
  };
  setMovieOnPlay = (play: boolean) => {
    this.movieOnPlay = play;
  };
  setTimeOfTheMovie = (timeOffset: number) => {
    this.timeOfTheMovie = timeOffset;
  };

  setVideoObject = (videoObj: any) => {
    this.videoObject = videoObj;
  };
}

export default VideosViewStore;
