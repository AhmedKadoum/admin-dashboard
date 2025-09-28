import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { DrawerModule } from 'primeng/drawer';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-side-navigation-bar',
  imports: [
    Button, AvatarModule, AvatarGroupModule, DrawerModule,
    RouterModule, CommonModule],
  templateUrl: './side-navigation-bar.component.html',
  styleUrl: './side-navigation-bar.component.css',

})
export class SideNavigationBarComponent {
  visible: boolean = false;

  items = [
    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: '/dashboard' },
    { label: 'Patients', icon: 'pi pi-fw pi-users', routerLink: '/patients' },
    { label: 'Medications', icon: 'pi pi-fw pi-medit', routerLink: '/medications' },
    { label: 'Categories', icon: 'pi pi-fw pi-tags', routerLink: '/categories' },
    { label: 'Settings', icon: 'pi pi-fw pi-cog', routerLink: '/settings' },
    { label: 'Support', icon: 'pi pi-fw pi-info-circle', routerLink: '/support' },
    { label: 'Help Page', icon: 'pi pi-fw pi-question-circle', routerLink: '/help-page' }
  ];
onCloseClicked() {
  console.log('Closing sidebar...');
  this.visible = false;
}

  constructor() { }

  toggleDrawer() {
    this.visible = !this.visible;
  }

}
