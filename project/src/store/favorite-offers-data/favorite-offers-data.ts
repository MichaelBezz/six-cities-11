import {createSlice} from '@reduxjs/toolkit';
import {fetchFavoriteOffers, setFavoriteOffer} from './api-actions';
import {FavoriteOffersDataState} from '../../types/state';
import {Reducer} from '../../constants';

const initialState: FavoriteOffersDataState = {
  offers: [],
  isLoading: false
};

export const favoriteOffersData = createSlice({
  name: Reducer.FavoriteOffers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offers = action.payload ?? [];
      })
      .addCase(fetchFavoriteOffers.rejected, (state) => {
        state.isLoading = false;
        state.offers = [];
      })
      .addCase(setFavoriteOffer.fulfilled, (state, {payload: offer}) => {
        if (offer && offer.isFavorite) {
          state.offers.push(offer);
        }

        if (offer && !offer.isFavorite) {
          const index = state.offers.findIndex((item) => item.id === offer.id);
          state.offers.splice(index, 1);
        }
      });
  }
});
