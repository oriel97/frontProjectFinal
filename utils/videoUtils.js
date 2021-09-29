const vision = require('../videos/vision.mp4');
const features = require('../videos/features.mp4');
const makeAnAppointment = require('../videos/makeAppointment.mp4');

export const Videos: IVideosObject[] = [
  {
    videoLink: vision,
    title: 'Introduction',
  },
  {
    videoLink: features,
    title: 'Choose your barber',
  },
  {
    videoLink: makeAnAppointment,
    title: 'Make appointment',
  },
];

export interface IVideosObject {
  videoLink: string;
  title: string;
}
export interface IVideosViewStore {
  fullScreenMode: boolean;
  movieOnPlay: boolean;
  timeOfTheMovie: number;
  durationOfMovie: number;
  openVideoPlayer: boolean;
  videoObject: IVideosObject | null;
  setOpenVideoPlayer: any;
  setDurationOfMovie: any;
  setFullScreenMode: any;
  setMovieOnPlay: any;
  setTimeOfTheMovie: any;
  setVideoObject: any;
}
