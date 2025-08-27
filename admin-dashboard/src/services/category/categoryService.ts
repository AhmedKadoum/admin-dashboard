import {
  categoriesFeature,
  CategoriesState,
  Category,
} from './../../app/store/slices/categories/category.store';
import { inject, Injectable, Signal } from '@angular/core';

import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { actions } from '../../app/store/slices/categories/category.store';

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
    categoriesFeature.selectCategories
  );
  categoriesState$: Signal<CategoriesState | null> = this.store.selectSignal(
    categoriesFeature.selectCategoryState
  );

  error$: Signal<string | null> = this.store.selectSignal(
    categoriesFeature.selectError
  );

  initializeCategories(): void {
    this.store.dispatch(actions.loadCategories());
  }
  // crud

  addCategory(name: string): void {
    this.store.dispatch(actions.createCategory({ name }));
  }

  updateCategory(categoryId: number, name: string) {
    this.store.dispatch(actions.updateCategory({ categoryId, name }));
  }

  deleteCategory(categoriesId: number) {
    this.store.dispatch(actions.removeCategories({ categoriesId }));
  }
}
