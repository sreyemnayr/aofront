import { createSelector } from '@ngrx/store';

import { ApplicationsState, selectapplications } from '../applications.state';

export const selectStockMarket = createSelector(
  selectapplications,
  (state: ApplicationsState) => state.stocks
);
