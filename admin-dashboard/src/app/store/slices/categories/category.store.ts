import {
  createReducer,
  on,
  createAction,
  props,
  createFeature,
} from '@ngrx/store';

// model
export interface Category {
  id: number;
  name: string;
  medications?: number[]; // References to Medication IDs
}

// Define actions for category
export const actions = {
  loadCategories: createAction('[Categories] Load Categories'),
  loadCategoriesSuccess: createAction(
    '[Categories] Load Categories Success',
    props<{ data: Category[] }>()
  ),
  loadCategoriesFailure: createAction(
    '[Categories] Load Categories Failure',
    props<{ error: string }>()
  ),
  removeCategories: createAction(
    '[Categories] Remove Categories',
    props<{ categoriesId: number }>()
  ),
  removeCategoriesSuccess: createAction(
    '[Categories] Remove Categories Success',
    props<{ categoriesId: number }>()
  ),
  removeCategoriesFailure: createAction(
    '[Categories] Remove Categories Failure',
    props<{ error: string }>()
  ),

  createCategory: createAction(
    '[Categories] Create Categories',
    props<{ name: string }>()
  ),
  createCategorySuccess: createAction('[Categories] Create Categories Success'),
  createCategoryFailure: createAction(
    '[Categories] Create Categories Failure',
    props<{ error: string }>()
  ),

  updateCategory: createAction(
    '[Categories] Update Categories',
    props<{ categoryId: number; name: string }>()
  ),
  updateCategorySuccess: createAction('[Categories] Update Categories Success'),
  updateCategoryFailure: createAction(
    '[Categories] Update Categories Failure',
    props<{ error: string }>()
  ),
};
export const featureKey = 'category';

// Define the initial state for authentication
export interface CategoriesState {
  categories: Category[];
  search: string;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  selectedCategoryId: number;
  selectedCategory: Category;
}

export const initialState: CategoriesState = {
  categories: [],
  search: '',
  currentPage: 1,
  totalPages: 0,
  loading: false,
  error: null,
  selectedCategoryId: 0,
  selectedCategory: {} as Category,
};
// Create a reducer to handle authentication actions
export const reducer = createReducer(
  initialState,
  on(
    actions.loadCategories,
    actions.createCategory,
    actions.updateCategory,
    actions.removeCategories,
    (state) => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(
    actions.loadCategoriesFailure,
    actions.createCategoryFailure,
    actions.updateCategoryFailure,
    actions.removeCategoriesFailure,
    (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })
  ),
  on(actions.loadCategoriesSuccess, (state, { data }) => ({
    ...state,
    categories: data,
    loading: false,
  })),
  on(
    actions.createCategorySuccess,
    actions.updateCategorySuccess,
    actions.removeCategoriesSuccess,
    (state) => ({
      ...state,
      loading: false,
      error: null,
    })
  )
);

export const categoriesFeature = createFeature({
  name: featureKey,
  reducer,
});
