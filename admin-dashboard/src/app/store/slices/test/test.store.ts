import { state } from '@angular/animations';
import { createAction, props } from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';

export const increment = createAction('[Counter Component] Increment',
  props<{ test(): any }>()
);
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');

export const initialState = 10;

export const testReducer = createReducer(
  initialState,
  on(increment, (state) => {
    const newState = state + 1;
    console.log('Incremented state:', newState);
    return newState;
  }),
  on(decrement, (state) => state - 1),
  on(reset, (state) => 0)
);
// export const featureKey = 'test';//optional, if you want to use feature state
