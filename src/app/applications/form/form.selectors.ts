import { createSelector } from '@ngrx/store';

import { applicationsState, selectapplications } from '../applications.state';

export const selectFormState = createSelector(
  selectapplications,
  (state: applicationsState) => state.form
);
