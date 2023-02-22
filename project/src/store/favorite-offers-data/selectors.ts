import {State} from '../../types/state';
import {Offers} from '../../types/offer';
import {Reducer} from '../../constants';

export const getFavoriteOffers = (state: State): Offers => state[Reducer.FavoriteOffers].offers;
export const getIsFavoriteOffersLoading = (state: State): boolean => state[Reducer.FavoriteOffers].isLoading;
