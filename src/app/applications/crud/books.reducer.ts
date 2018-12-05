import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Student, StudentState } from './components/crud.component';
import { BookActionTypes, BookActions } from './books.actions';

export function sortByTitle(a: Student, b: Student): number {
  return a.basic_info.first_name.localeCompare(b.basic_info.first_name);
}

export const bookAdapter: EntityAdapter<Student> = createEntityAdapter<Student>(
  {
    sortComparer: sortByTitle
  }
);

export const initialState: StudentState = bookAdapter.getInitialState({
  ids: [],
  entities: {}
});

export function bookReducer(
  state: StudentState = initialState,
  action: BookActions
): StudentState {
  switch (action.type) {
    case BookActionTypes.UPSERT_ONE:
      return bookAdapter.upsertOne(action.payload.book, state);

    case BookActionTypes.DELETE_ONE:
      return bookAdapter.removeOne(action.payload.id, state);

    default:
      return state;
  }
}
