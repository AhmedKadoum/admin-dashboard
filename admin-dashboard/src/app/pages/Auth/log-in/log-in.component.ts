import { Component, inject, Signal } from '@angular/core';
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
export class LogInComponent {
  private authServices: AuthService = inject(AuthService);
  private fb: FormBuilder = inject(FormBuilder);

  // signal
  loading: Signal<boolean> = this.authServices.loading$;
  token: Signal<string | null> = this.authServices.token$;
  user: Signal<User | null> = this.authServices.user$;
  error: Signal<string | null> = this.authServices.error$;

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  login(): void {
    // if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      // this.authServices.login({username:String,password:String})
      this.authServices.login({ username: username!, password: password! });

      console.log('Login action dispatched with:', this.loginForm.value);
    // }
  }
  // other
  // success(){
  //   this.authServices.sendResponse()
  //   console.log('succes from ts')
  // }

  // login() {
  //   if (this.loginForm.valid) {
  //     const { username, password } = this.loginForm.value;
  //     // this.authServices.login({username:String,password:String})
  //     this.authServices.login({username:username!,password:password!});
  //     console.log('Login action dispatched with:', this.loginForm.value);
  //   }
  // }
}
