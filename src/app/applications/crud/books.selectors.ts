import { createSelector } from '@ngrx/store';

import { selectRouterState } from '@app/core';

import {
  selectapplications,
  applicationsState
} from '../../applications/applications.state';

import { bookAdapter } from './books.reducer';

const { selectEntities, selectAll } = bookAdapter.getSelectors();

export const selectBooks = createSelector(
  selectapplications,
  (state: applicationsState) => state.books
);

export const selectAllBooks = createSelector(selectBooks, selectAll);
export const selectBooksEntities = createSelector(selectBooks, selectEntities);

export const selectSelectedBook = createSelector(
  selectBooksEntities,
  selectRouterState,
  (entities, params) => params && entities[params.state.params.id]
);
