import {store} from '../store/store';
import {UserData} from './user';
import {Offers, Offer} from './offer';
import {Reviews} from './review';
import {AuthorizationStatus, Location, SortType} from '../constants';

export type AppDispatch = typeof store.dispatch;
export type State = ReturnType<typeof store.getState>;

export type UserDataState = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
};

export type OffersDataState = {
  location: Location;
  sortType: SortType;
  offers: Offers;
  selectedOffer: Offer | null;
  isOffersLoading: boolean;
};

export type OfferPropertyDataState = {
  offerProperty: Offer | null;
  isOfferPropertyLoading: boolean;
  hasOfferPropertyError: boolean;
  nearOffers: Offers | null;
  reviews: Reviews;
  isReviewFormBlocked: boolean;
};
