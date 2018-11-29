import { createSelector } from '@ngrx/store';

import { ApplicationsState, selectapplications } from '../applications.state';

export const selectFormState = createSelector(
  selectapplications,
  (state: ApplicationsState) => state.form
);
