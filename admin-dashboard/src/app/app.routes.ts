import { Routes } from '@angular/router';
// import { authGuard } from '../guards/auth.guard';


export const routes: Routes = [
  {
    // path:'login',
    path:'',
    loadComponent: () => import('./pages/Auth/log-in/log-in.component').then(m => m.LogInComponent)
  },
  {
    path:'',
    // canActivate: [authGuard],
    loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path:'dashboard',
        title: 'Dashboard',
        loadComponent: () => import('./pages/dash-board/dash-board.component').then(m => m.DashBoardComponent)
      },
      {
        path:'patients',
        title: 'Patients',
        loadComponent: () => import('./pages/patients/patients.component').then(m => m.PatientsComponent)
      },
      {
        path:'categories',
        title: 'Categories',
        loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent)
      },
      {
        path:'medications',
        title: 'Medications',
        loadComponent: () => import('./pages/medications/medications.component').then(m => m.MedicationsComponent)
      },
      {
        path:'settings',
        title: 'Settings',
        loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent)
      },
      {
        path:'support',
        title: 'Support',
        loadComponent: () => import('./pages/support/support.component').then(m => m.SupportComponent )
      },
      {
        path:'help-page',
        title: 'Help Page',
        loadComponent: () => import('./pages/help-page/help-page.component').then(m => m.HelpPageComponent)
      },
      {
        path:'users',
        title:'Users',
        loadComponent: () => import('./pages/users-list/users-list.component').then(m => m.UserListComponent)

      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      }
     ]
 },
 {
  path: '**',
  loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
 }
]
