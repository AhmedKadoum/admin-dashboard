import {
  categoriesFeature,
  CategoriesState,
  Category,
} from './../../app/store/slices/categories/category.store';
import { inject, Injectable, Signal } from '@angular/core';

import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { actions } from '../../app/store/slices/categories/category.store';
import { SortEvent } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private store: Store = inject(Store);
  readonly router: Router = inject(Router);

  loading$: Signal<boolean> = this.store.selectSignal(
    categoriesFeature.selectLoading
  );
  categories$: Signal<Category[] | null> = this.store.selectSignal(
    // categoriesFeature.selectCategories
    categoriesFeature.selectFilteredCategories
  );
  categoriesState$: Signal<CategoriesState | null> = this.store.selectSignal(
    categoriesFeature.selectCategoryState
  );

  error$: Signal<string | null> = this.store.selectSignal(
    categoriesFeature.selectError
  );
  SelectedCategoryId$: Signal<number> = this.store.selectSignal(
    categoriesFeature.selectSelectedCategoryId);

  initializeCategories(): void {
    this.store.dispatch(actions.loadCategories());
  }
  // crud

  addCategory(Categoryname: string): void {
    this.store.dispatch(actions.createCategory({ name:Categoryname }));
  }

  updateCategory(categoryId: number, categoryName: string) {
    this.store.dispatch(actions.updateCategory({ categoryId, name:categoryName }));
  }

  deleteCategory(categoriesId: number) {
    this.store.dispatch(actions.removeCategories({ categoriesId:categoriesId }));
  }
  searchCategory(query: string) {
    this.store.dispatch(actions.SearchCategory({query}));
  }
  onSort(event: SortEvent) {
    event.data=[];
  this.store.dispatch(actions.sortCategories({
    field: event.field,
    order: event.order
  }));
}
}

