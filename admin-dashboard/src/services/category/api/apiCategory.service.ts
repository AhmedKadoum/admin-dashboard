import {
  CategoriesState,
  Category,
} from './../../../app/store/slices/categories/category.store';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class apiCategoryService {
  private http: HttpClient = inject(HttpClient);

  loadCategoriesData(): Observable<Category[]> {
    // Replace '/api/user' with the actual endpoint for fetching user data
    return this.http.get<Category[]>('http://localhost:3000/categories').pipe(
      map((response: Category[]) => {
        console.log('response is ',response)
        return response;
      })
    );
  }
}
