import { Category } from './../../store/slices/categories/category.store';
import { Component, effect, inject, OnInit, Signal } from '@angular/core';
import { CategoryService } from '../../../services/category/categoryService';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [CommonModule,TableModule,ButtonModule,BreadcrumbModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  standalone: true,
})
export class CategoriesComponent implements OnInit {
  private categoryServices: CategoryService = inject(CategoryService);

  // signal
  loading: Signal<boolean> = this.categoryServices.loading$;
  categories: Signal<Category[] | null> = this.categoryServices.categories$;
  error: Signal<string | null> = this.categoryServices.error$;
  // breadCrumb
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  items: MenuItem[] = [{ label: 'Dashboard', routerLink: '/dashboard' }, { label: 'Categories' }];
  //
  ngOnInit(): void {
      this.categoryServices.initializeCategories()
      console.log('category from component')
  }
  constructor() {
    effect(() => {
      console.log(this.categories())
    });
  }
  // CRUD actions
  addCategory() {
    this.categoryServices.addCategory('new category');
  }

  editCategory(category: Category) {
    const updated = { ...category, name: category.name + ' (Updated)', id: 5 };
    this.categoryServices.updateCategory(updated.id, updated.name);
  }

  deleteCategory(id: number) {
    this.categoryServices.deleteCategory(id);
  }
  // local data for test
   localCategories:Category[]=[
      {
        "id": 1,
        "name": "Antibiotics",
        "medications": [101, 102]
      },
      {
        "id": 2,
        "name": "Analgesics",
        "medications": [103,104]
      },
      {
        "id": 3,
        "name": "Antipyretics",
        "medications": []
      }
  ]
}
