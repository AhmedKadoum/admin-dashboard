import { Category } from './../slices/categories/category.store';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CategoryActions from '../../store/slices/categories/category.store';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { apiCategoryService } from '../../../services/category/api/apiCategory.service';

@Injectable()
export class CategoryEffects {
  private apiCategoryService: apiCategoryService = inject(apiCategoryService);
  private actions$: Actions = inject(Actions);

  // 🔹 Effect listens for Login action
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.actions.loadCategories),
      tap(() => console.log('🔄 Categories effect triggered')),
      exhaustMap(() =>
        this.apiCategoryService.loadCategoriesData().pipe(
          map((response: Category[]) =>
            CategoryActions.actions.loadCategoriesSuccess({ data: response })
          ),
          catchError((error) =>
            of(
              CategoryActions.actions.loadCategoriesFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );
}
