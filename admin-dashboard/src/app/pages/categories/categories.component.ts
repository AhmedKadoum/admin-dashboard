import { Category } from './../../store/slices/categories/category.store';
import { Component, effect, inject, OnInit, Signal } from '@angular/core';
import { CategoryService } from '../../../services/category/categoryService';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { DialogModule } from "primeng/dialog";
import { FormBuilder, FormGroup,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, TableModule, ButtonModule,
     BreadcrumbModule, DialogModule,ConfirmDialogModule,
     ReactiveFormsModule,FormsModule,ConfirmPopupModule,DataViewModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  standalone: true,
})
export class CategoriesComponent implements OnInit {
  private categoryServices: CategoryService = inject(CategoryService);
CategoryForm!: FormGroup;
searchForm!: FormGroup;
fb=inject(FormBuilder);
 private confirmationService: ConfirmationService = inject(ConfirmationService);
dialogueVisible:boolean=false;
  // signal
  loading: Signal<boolean> = this.categoryServices.loading$;
  readonly categories: Signal<Category[] | null> = this.categoryServices.categories$;
  error: Signal<string | null> = this.categoryServices.error$;
  selectedCategoryId: Signal<number> = this.categoryServices.SelectedCategoryId$;
  // breadCrumb
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  items: MenuItem[] = [{ label: 'Dashboard', routerLink: '/dashboard' },
     { label: 'Categories' }];


  //
  ngOnInit(): void {

      this.categoryServices.initializeCategories();
      this.CategoryForm=this.fb.group({
        id:[0],
        name:[''],
      })
      this.searchForm=this.fb.group({
        search:['']
      })
      this.searchForm.get('search')?.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe((value:String)=>{
        console.log('search value is ',value) ;
        this.categoryServices.searchCategory(value.toString())
      }
      )
  }


  // add & edit dialogue
  addCategory() {
    this.dialogueVisible=true;
    this.CategoryForm.reset({id:0,name:''});
  }

   editCategory(Category: Category) {
    console.log('Category is ',Category);
    // const updated = { ...Category, name: Category.Name + ' (Updated)', id: 5 };
  this.CategoryForm.patchValue(Category);  // fill form
  this.dialogueVisible= true;
  }
saveCategory() {
  const Category: Category = this.CategoryForm.value;
  console.log('save category',Category)
  if (Category.id && Category.id > 0) {
    this.categoryServices.updateCategory( Category.id, Category.name);//check xxxx
  } else {
    this.categoryServices.addCategory( Category.name);
    console.log('add new category',Category.name)
  }
  this.dialogueVisible = false;
}
  // confirm delete
  confirm(id:number){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this category?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept:()=>{
        this.categoryServices.deleteCategory(id);
        console.log('deleted id from confirm',id);
        this.confirmationService.close();
      },
      reject:()=>{
        console.log('rejected')
        this.confirmationService.close();
      }
    })
  }
  onSort(event: any) {
    this.categoryServices.onSort(event);
  }

}
