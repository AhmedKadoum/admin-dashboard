// src/app/core/services/mock-data.service.ts
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { AuthState } from '../../app/store/slices/auth/auth.store';

export interface User {
  id: number;
  name: string;
  email?: string;
  username: string;
  password: string;
  role: string;
  profilePictureUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class MockDataService implements InMemoryDbService {
  createDb() {
    const users: User[] | null = [
      {
        id: 1,
        username: 'admin',
        password: '1234',
        role: 'Admin',
        name: 'Admin User',
        profilePictureUrl: 'https://example.com/profile/admin.jpg',
      },
      {
        id: 2,
        username: 'readonly',
        password: '4321',
        role: 'Readonly',
        name: 'Readonly User',
        profilePictureUrl: 'https://example.com/profile/admin.jpg',
      },
    ];
    const authState: AuthState | null = {
      token: '12345',
      user: users[0],
      error: null,
      loading: false,
    };

    return { authState };
  }
}
