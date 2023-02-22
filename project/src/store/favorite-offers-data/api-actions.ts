import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {toast} from 'react-toastify';
import {AppDispatch, State} from '../../types/state';
import {Offers, Offer, OfferId} from '../../types/offer';
import {Reducer, APIRoute} from '../../constants';

export const fetchFavoriteOffers = createAsyncThunk<Offers | void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${Reducer.FavoriteOffers}/fetchFavoriteOffers`,
  async (_arg, {extra: api}) => {
    try {
      const {data} = await api.get<Offers>(APIRoute.Favorite);
      return data;
    }
    catch {
      toast.error('Can\'t download favorite offers');
    }
  }
);

export const setFavoriteOffer = createAsyncThunk<
Offer | void,
{
  offerId: OfferId;
  status: number;
},
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${Reducer.FavoriteOffers}/setFavoriteOffer`,
  async ({offerId, status}, {extra: api}) => {
    try {
      const {data} = await api.post<Offer>(
        `${APIRoute.Favorite}/${offerId}/${status}`
      );
      return data;
    }
    catch {
      toast.error('Can\'t update status of offer');
    }
  }
);
