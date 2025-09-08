// src/app/user-list/user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { actions } from '../../store/slices/users/users.store';
import { selectAllUsers, selectUserLoading, selectUserError } from '../../store/slices/users/users.store';

@Component({
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule],
  template: `
    <!-- <div class="p-4">
      <p-button (click)="loadUsers()" label="Load Users"></p-button>

      <p-table [value]="(users$ | async) || []" [loading]="loading$ | async">
        <ng-template pTemplate="header">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-user>
          <tr>
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
          </tr>
        </ng-template>
      </p-table>

      <div *ngIf="error$ | async as error" class="text-red-500">
        Error: {{ error }}
      </div>
    </div> -->
    <!-- test -->
     <div>
      <p-button (click)="loadUsers()" label="Load Users"></p-button>
     </div>
     <div *ngFor="let user of users$|async">
      {{user.name}}
     </div>
     <div *ngIf="error$ | async as error" class="text-red-500">
        Error: {{ error }}
      </div>

  `
})
export class UserListComponent implements OnInit {
  users$: Observable<any[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.users$ = this.store.select(selectAllUsers);
    this.loading$ = this.store.select(selectUserLoading);
    this.error$ = this.store.select(selectUserError);
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.store.dispatch(actions.loadUsers()),console.log(this.users$.subscribe(a=>a.forEach(
      e=>console.log(e.name)
    ))
    );
  }
}
