import { system,name} from 'faker';
import { IFilm } from '../types/type-films/Type-Films';

export const makeFakeFilm = ():IFilm =>({
  id: 1,
  name:name.title(),
  video: system.filePath()
} as IFilm);

export const makeMouseOver = ():React.MouseEventHandler<HTMLElement> =>({

} as React.MouseEventHandler<HTMLElement> );
