import { AuthorizationStatus, NameSpace } from '../../enums/enum';
import {State} from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
