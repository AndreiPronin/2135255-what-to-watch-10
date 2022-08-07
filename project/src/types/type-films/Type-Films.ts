export interface IFilm{
  id:number;
  name:string;
  date:Date;
  img:string;
  genre:string;
  description:string;
  video:string;
  previewImage: string
  previewVideoLink: string
  backgroundImage: string
  backgroundColor: string
  posterImage: string
  videoLink: string
  isFavorite: boolean
  scoresCount: number
  rating: number
  runTime: number
  released: number
  director: string
  starring: string[]
}
export interface IPropsFilms{
  films:IFilm[]
}
export interface IPropsFilm{
  film:IFilm
}
export interface IRating{
  Raiting:string
}

export interface IComment{
  comment: string
  date: string
  id: number
  rating: number
  user: {
    id: number
    name: string
  }
}

export type SaveModelComment = {
  idFilms:string
  comment: string
  rating: number
}

export type AddFavoriteFilm = {
  filmId:number,
  status:number,
}
