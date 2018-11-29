import { createSelector } from '@ngrx/store';

import { applicationsState, selectapplications } from '../applications.state';

export const selectStockMarket = createSelector(
  selectapplications,
  (state: applicationsState) => state.stocks
);
