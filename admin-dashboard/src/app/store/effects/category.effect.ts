import { Category } from './../slices/categories/category.store';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CategoryActions from '../../store/slices/categories/category.store';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { apiCategoryService } from '../../../services/category/api/apiCategory.service';
import { CategoryService } from '../../../services/category/categoryService';

@Injectable()
export class CategoryEffects {
  private apiCategoryService: apiCategoryService = inject(apiCategoryService);
  private CategoryService: CategoryService = inject(CategoryService);
  private actions$: Actions = inject(Actions);
   selectedCategoryId=this.CategoryService.SelectedCategoryId$

  // 🔹 Effect listens for load categories action
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.actions.loadCategories),
      tap(() => console.log('🔄 Categories effect triggered')),
      exhaustMap(() =>
        this.apiCategoryService.loadCategoriesData().pipe(
          map((response: any) =>
            CategoryActions.actions.loadCategoriesSuccess({ data: response }),

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

  DeleteCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.actions.removeCategories),
      tap(() => console.log('🔄remove Categories effect triggered')),
      exhaustMap(({categoriesId}) =>
        this.apiCategoryService.loadCategoriesData().pipe(
          map(() =>
            CategoryActions.actions.removeCategoriesSuccess({categoriesId}),
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
  CreateCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.actions.createCategory),
      tap(() => console.log('🔄create Categories effect triggered')),
      exhaustMap((Categoryname) =>
        this.apiCategoryService.loadCategoriesData().pipe(
          map(() =>
            CategoryActions.actions.createCategorySuccess( Categoryname ),
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
  UpdateCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.actions.updateCategory),
      tap(() => console.log('🔄update Categories effect triggered')),
      exhaustMap((category) =>
        this.apiCategoryService.loadCategoriesData().pipe(
          map(() =>
            CategoryActions.actions.updateCategorySuccess({name:category.name,categoryId:category.categoryId}),
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
