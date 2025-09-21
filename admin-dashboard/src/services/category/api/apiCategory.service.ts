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
  loadCategoriesData(): Observable<any> {
    return this.http.get<any>('/api/categories').pipe(
      map((response: any) => {
        console.log('response is from load categories ',response)
        return response.data;
      })
    );
  }
}
