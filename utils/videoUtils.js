export const Videos: IVideosObject[] = [
  {
    videoLink:
      'http://mp44.dlmania.com/Hollywood/Space%20Jam%20-%20A%20New%20Legacy%20-%20BRRip/Space%20Jam%20-%20A%20New%20Legacy%20-%20BRRip%20(Mp4Mania).mp4',
    title: 'Introduction',
  },
  {
    videoLink:
      'http://mp44.dlmania.com/Hollywood/Space%20Jam%20-%20A%20New%20Legacy%20-%20BRRip/Space%20Jam%20-%20A%20New%20Legacy%20-%20BRRip%20(Mp4Mania).mp4',
    title: 'Choose your barber',
  },
  {
    videoLink:
      'http://mp44.dlmania.com/Hollywood/Space%20Jam%20-%20A%20New%20Legacy%20-%20BRRip/Space%20Jam%20-%20A%20New%20Legacy%20-%20BRRip%20(Mp4Mania).mp4',
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
