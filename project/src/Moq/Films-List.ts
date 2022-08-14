import { IFilm } from '../types/type-films/Type-Films';

/* function randomDate(start:Date, end:Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
} */

export const AllFilms:IFilm[] = [{id : 1, genre:'Crime',description:'gdfgd',video:'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
  name:'Fantastic Beasts: The Crimes of Grindelwald',
  date: new Date(2012, 0, 1),
  img:'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
  previewImage: '',
  previewVideoLink: '',
  backgroundImage: '',
  backgroundColor: '',
  posterImage: '',
  videoLink: '',
  isFavorite: true,
  scoresCount: 10,
  rating: 10,
  runTime: 5,
  released: 2,
  director: '',
  starring: [], },{id : 1, genre:'Crime',description:'gdfgd',video:'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
  name:'Fantastic Beasts: The Crimes of Grindelwald',
  date: new Date(2012, 0, 1),
  img:'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
  previewImage: '',
  previewVideoLink: '',
  backgroundImage: '',
  backgroundColor: '',
  posterImage: '',
  videoLink: '',
  isFavorite: true,
  scoresCount: 10,
  rating: 10,
  runTime: 5,
  released: 2,
  director: '',
  starring: [], }];
