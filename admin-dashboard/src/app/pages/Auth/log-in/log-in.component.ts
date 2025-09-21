import { Component, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';

import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../../services/Auth/auth.service';
import { User } from '../../../store/slices/auth/auth.store';
@Component({
  selector: 'app-log-in',
  imports: [
    DividerModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
  standalone: true,
})
export class LogInComponent implements OnInit {
  private authServices: AuthService = inject(AuthService);
  private fb: FormBuilder = inject(FormBuilder);

  // signal
  loading: Signal<boolean> = this.authServices.loading$;
  token: Signal<string | null> = this.authServices.token$;
  users: Signal<User | null> = this.authServices.users$;
  error: Signal<string | null> = this.authServices.error$;
loginForm!:any;
  ngOnInit(): void {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['',[Validators.required, Validators.minLength(4)]],
    });
  }

  login(){
    const { username, password } = this.loginForm.value;
    console.log('login form value', this.loginForm.value,
       this.loginForm.valid,username);
    if (this.loginForm.valid) {
     this.authServices.login({ username, password });
      console.log('Login action dispatched with:', this.loginForm.value);
    }else {
    console.log(' Form invalid:', this.loginForm.errors, this.loginForm.value)
  }
  }

}
