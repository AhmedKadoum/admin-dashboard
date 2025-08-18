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
import { DrawerModule } from 'primeng/drawer'; // Uncomment if using p-drawer
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-side-navigation-bar',
  imports: [CategoriesComponent, DashBoardComponent, HelpPageComponent,
     MedicationsComponent, PatientsComponent, SettingsComponent,
      SupportComponent, Button, AvatarModule, AvatarGroupModule , DrawerModule, RouterModule],
  templateUrl: './side-navigation-bar.component.html',
  styleUrl: './side-navigation-bar.component.css'
})
export class SideNavigationBarComponent {
  visible: boolean = false;

  items = [
    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: '/dashboard' },
    { label: 'Patients', icon: 'pi pi-fw pi-users', routerLink: '/patients' },
    { label: 'Medications', icon: 'pi pi-fw pi-medkit', routerLink: '/medications' },
    { label: 'Categories', icon: 'pi pi-fw pi-tags', routerLink: '/categories' },
    { label: 'Settings', icon: 'pi pi-fw pi-cog', routerLink: '/settings' },
    { label: 'Support', icon: 'pi pi-fw pi-info-circle', routerLink: '/support' },
    { label: 'Help Page', icon: 'pi pi-fw pi-question-circle', routerLink: '/help-page' }
  ];
  // closeCallback: () => void = () => {
  //   this.visible = false;
  // }
  closeCallback(event: MouseEvent) {
  console.log("Button clicked!", event);
  console.log("Clicked element:", event.target);
}

  constructor() { }

  toggleDrawer() {
    this.visible = !this.visible;
  }

}
