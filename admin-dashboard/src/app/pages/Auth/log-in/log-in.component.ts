import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { DividerModule } from 'primeng/divider';


@Component({
  selector: 'app-log-in',
  imports: [Button, DividerModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

}
