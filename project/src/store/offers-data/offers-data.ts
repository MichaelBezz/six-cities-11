import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchOffersAction} from './api-actions';
import {OffersDataState} from '../../types/state';
import {Offers, OfferId} from '../../types/offer';
import {Reducer, Location, SortType} from '../../const';

const initialState: OffersDataState = {
  location: Location.Paris,
  sortType: SortType.Popular,
  selectedOfferId: null,
  offers: [] as Offers,
  isOffersLoading: false
};

export const offersData = createSlice({
  name: Reducer.Offers,
  initialState,
  reducers: {
    changeLocation: (state, action: PayloadAction<Location>) => {
      state.location = action.payload;
    },
    changeSort: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
    selectOffer: (state, action: PayloadAction<OfferId | null>) => {
      state.selectedOfferId = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.isOffersLoading = false;
        state.offers = action.payload;
      });
  }
});

export const {changeLocation, changeSort, selectOffer} = offersData.actions;
