import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button, ButtonLabel } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators,ReactiveFormsModule,FormsModule } from '@angular/forms';
import {selectError, selectLoading } from '../../../store/slices/auth/auth.store';
import { Observable } from 'rxjs';
import { auth } from '../../../store/actions';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-log-in',
  imports: [Button, DividerModule, ReactiveFormsModule,
     ButtonLabel, CommonModule,FormsModule,InputTextModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
  standalone: true,
})
export class LogInComponent {
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  loginForm;
  
  constructor(private store: Store,private fb:FormBuilder) {
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.loginForm= this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.store.dispatch(auth.login({username: username!, password: password!}))
      console.log('Login action dispatched with:', this.loginForm.value);
    }
  }
}
