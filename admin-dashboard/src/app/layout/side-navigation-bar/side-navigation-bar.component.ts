import { Component } from '@angular/core';
import { CategoriesComponent } from "../../pages/categories/categories.component";
import { DashBoardComponent } from "../../pages/dash-board/dash-board.component";
import { HelpPageComponent } from "../../pages/help-page/help-page.component";
import { MedicationsComponent } from "../../pages/medications/medications.component";
import { PatientsComponent } from "../../pages/patients/patients.component";
import { SettingsComponent } from "../../pages/settings/settings.component";
import { SupportComponent } from "../../pages/support/support.component";


//
import { Button } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { DrawerModule } from 'primeng/drawer';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-side-navigation-bar',
  imports: [CategoriesComponent, DashBoardComponent, HelpPageComponent,
     MedicationsComponent, PatientsComponent, SettingsComponent,
      SupportComponent, Button, AvatarModule, AvatarGroupModule , DrawerModule,
      RouterModule,CommonModule],
  templateUrl: './side-navigation-bar.component.html',
  styleUrl: './side-navigation-bar.component.css'
})
export class SideNavigationBarComponent {
  visible: boolean = false;

  // items = [
  //   { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: '/dashboard' },
  //   { label: 'Patients', icon: 'pi pi-fw pi-users', routerLink: '/patients' },
  //   { label: 'Medications', icon: 'pi pi-fw pi-medkit', routerLink: '/medications' },
  //   { label: 'Categories', icon: 'pi pi-fw pi-tags', routerLink: '/categories' },
  //   { label: 'Settings', icon: 'pi pi-fw pi-cog', routerLink: '/settings' },
  //   { label: 'Support', icon: 'pi pi-fw pi-info-circle', routerLink: '/support' },
  //   { label: 'Help Page', icon: 'pi pi-fw pi-question-circle', routerLink: '/help-page' }
  // ];
  // test start
  menuItems = [
    { label: 'Dashboard', link: '/dashboard', icon: 'pi-home' },
    { label: 'Patients', link: '/patients', icon: 'pi-bookmark' },
    { label: 'Categories', link: '/categories', icon: 'pi-users' },
    { label: 'Medications', link: '/medications', icon: 'pi-comments' },
    { label: 'Settings', link: '/settings', icon: 'pi-calendar' },
    { label: 'Support', link: '/support', icon: 'pi-cog' },
    { label: 'Help', link: '/help-page', icon: 'pi-question' }
];
  // test end
  // closeCallback: () => void = () => {
  //   this.visible = false;
  // }
  closeCallback(event: MouseEvent) {
  console.log("Button clicked!", event);
  console.log("Clicked element:", event.target);
  this.visible = false;
}

  constructor() { }

  toggleDrawer() {
    this.visible = !this.visible;
  }

}
