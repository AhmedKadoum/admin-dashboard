import { Component } from '@angular/core';
import { SideNavigationBarComponent } from "./side-navigation-bar/side-navigation-bar.component";
import { TopNavBarComponent } from "./top-nav-bar/top-nav-bar.component";
import { DashBoardComponent } from "../pages/dash-board/dash-board.component";

@Component({
  selector: 'app-layout',
  imports: [SideNavigationBarComponent, TopNavBarComponent, DashBoardComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
