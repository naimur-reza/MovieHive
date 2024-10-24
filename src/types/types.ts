export type TMovie = {
  adult: boolean;
  backdrop_path: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  spoken_languages: [
    {
      english_name: string;
      iso_639_1: string;
      name: string;
    }
  ];
  runtime: number;
};

export interface TCast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export type TCredits = {
  id: number;
  cast: TCast[];
};
