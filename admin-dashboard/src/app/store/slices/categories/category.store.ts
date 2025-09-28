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
  medications?: number[];
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
  createCategorySuccess: createAction(
    '[Categories] Create Categories Success',
    props<{ name: string }>()
  ),

  createCategoryFailure: createAction(
    '[Categories] Create Categories Failure',
    props<{ error: string }>()
  ),

  updateCategory: createAction(
    '[Categories] Update Categories',
    props<{ categoryId: number; name: string }>()
  ),
  updateCategorySuccess: createAction(
    '[Categories] Update Categories Success',
    props<{ categoryId: number; name: string }>()
  ),
  updateCategoryFailure: createAction(
    '[Categories] Update Categories Failure',
    props<{ error: string }>()
  ),
  SearchCategory: createAction(
    '[Categories] Search Categories',
    props<{ query: string }>()
  ),
  sortCategories: createAction(
    '[Categories] Sort Categories',
    props<{ field: any; order: any }>()
  ),
};
export const featureKey = 'category';

export interface CategoriesState {
  categories: Category[];
  filteredCategories: Category[];
  search: string|null;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  selectedCategoryId: number;
  selectedCategory: Category;
}

export const initialState: CategoriesState = {
  categories: [],
  filteredCategories:[],
  search: '',
  currentPage: 1,
  totalPages: 0,
  loading: false,
  error: null,
  selectedCategoryId: 0,
  selectedCategory: {} as Category,
};
// Create a reducer  to handle state changes based on actions
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
      error:error,
      loading: false,
    })
  ),
  on(actions.loadCategoriesSuccess, (state, { data }) => ({
    ...state,
    categories: data,
    filteredCategories: data,
    loading: false,
  })),
  on(actions.createCategorySuccess, (state, { name }) => {
    const maxId = state.categories.length? Math.max(...state.categories.map(c => c.id)): 0;
    const newCategory = { id: maxId + 1, name: name.concat(`${maxId+1}`)};
    return({
      ...state,
      filteredCategories:[...state.categories,(newCategory)],
      loading: false,
    })
  }),
  on( actions.removeCategoriesSuccess,(state, {categoriesId}) => ({
      ...state,
      filteredCategories:[...state.categories.filter(c=>c.id !== categoriesId)],
      selectedCategoryId:state.selectedCategoryId===categoriesId?0:state.selectedCategoryId,
      loading: false,
  })),
 on(actions.sortCategories, (state, { field, order }) => {
    const sorted = [...state.filteredCategories].sort((a, b) => {
    const valA = (a as any)[field];
    const valB = (b as any)[field];

    if (valA < valB) return -1 * order;
    if (valA > valB) return 1 * order;
    return 0;
  });
  const isSame=JSON.stringify(sorted)===JSON.stringify(state.filteredCategories);
  if(isSame)return state;

  return {
    ...state,
    filteredCategories: sorted
  };
})
,
  on( actions.SearchCategory,(state, {query}) => {
     const filtered = !query || query.trim() === ''
    ? [...state.categories] // if query is empty, return full list
    : [...state.categories.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase())
      )];
    return{
      ...state,
       filteredCategories:filtered,
      loading: false,
  }}),
  on(
    actions.updateCategorySuccess,
    (state,{categoryId,name}) => {
      const updatedCategory=state.categories.find(c=>c.id===categoryId);
     const updatedCategories = state.categories.map(c =>
      c.id === categoryId ? { ...c, name } : c
    );
      if(!updatedCategory){
        return state;
      }else{

        return({
          ...state,
          filteredCategories:updatedCategories,
           selectedCategory: { id: categoryId, name },
          selectedCategoryId:categoryId,
          loading: false,
          error: null,
        })
      }
    }
  )
);

export const categoriesFeature = createFeature({
  name: featureKey,
  reducer,
});
