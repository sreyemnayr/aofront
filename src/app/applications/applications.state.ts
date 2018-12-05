import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { AppState } from '@app/core';

import { todosReducer } from './todos/todos.reducer';
import { TodosState } from './todos/todos.model';
import { stockMarketReducer } from './stock-market/stock-market.reducer';
import { StockMarketState } from './stock-market/stock-market.model';
import { bookReducer } from './crud/books.reducer';
import { formReducer } from './form/form.reducer';
import { FormState } from './form/form.model';
import { Book, BookState } from './crud/books.model';
import {
  Student,
  StudentState
} from '@app/applications/crud/components/crud.component';

export const FEATURE_NAME = 'applications';
export const selectapplications = createFeatureSelector<
  State,
  ApplicationsState
>(FEATURE_NAME);
export const reducers: ActionReducerMap<ApplicationsState> = {
  todos: todosReducer,
  stocks: stockMarketReducer,
  books: bookReducer,
  form: formReducer
};

export interface ApplicationsState {
  todos: TodosState;
  stocks: StockMarketState;
  form: FormState;
  books: StudentState;
}

export interface State extends AppState {
  applications: ApplicationsState;
}
