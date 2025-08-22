import { Component, inject, OnInit } from '@angular/core';
import { TestService } from '../../../services/test/test.service';
import { Store } from '@ngrx/store';
import * as actions from '../../store/slices/test/test.store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { User } from '../../../services/mock-api/mock-data.service';

@Component({
  selector: 'app-test',
  imports: [CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
  // standalone: true,
})

export class TestComponent implements OnInit  {


  test$: Observable<number>;



  constructor(private store: Store<{test: number}>, private testService: TestService) {
    this.test$ = store.select('test');
  }


  increment() {
    this.store.dispatch(actions.increment({test(): any {}}));
  }

  decrement() {
    this.store.dispatch(actions.decrement());
  }

  reset() {
    this.store.dispatch(actions.reset());
  }
  viewuser() {
    this.testService.getUser().subscribe(() => {
      console.log('user'
    )
    }
    , (error: any) => {
      console.error('Error fetching user:', error);
    } );

  }
  // test api req
user: User | null = null;
  loading = false;
  error: string | null = null;

  ngOnInit() {
    console.log('Test Component Initialized - Ready to make API calls');
  };

  fetchUser() {
    this.loading = true;
    this.error = null;
    this.user = null;

    this.testService.getUser().subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
        console.log('User received:', user);
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
        console.error('Error fetching user:', error);
      },
      complete: () => {
        console.log('API call completed');
      }
    });
  }
}


