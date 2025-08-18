import { Component } from '@angular/core';
import { Button } from 'primeng/button'; // Use component directly
import { ToolbarModule } from 'primeng/toolbar';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
  selector: 'app-top-nav-bar',
  standalone: true,
  imports: [Button,ToolbarModule, IconFieldModule, InputIconModule,
    InputTextModule, SplitButtonModule], // Use Button component directly
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css'],
})
export class TopNavBarComponent {
   items=[
    {
      label: 'File',
      items: [
        { label: 'New', icon: 'pi pi-fw pi-plus' },
        { label: 'Open', icon: 'pi pi-fw pi-download' }
      ]
    },
    {
      label: 'Edit',
      items: [
        { label: 'Undo', icon: 'pi pi-fw pi-refresh' }
      ]
    },
    {
      label: 'Help',
      items: [
        { label: 'Contents', icon: 'pi pi-fw pi-info' },
        { label: 'Search', icon: 'pi pi-fw pi-search' }
      ]
    }
   ]
}
