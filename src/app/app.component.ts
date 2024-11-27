import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MessagesComponent } from './components/messages/messages.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MessagesComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Tour of heroes';
}
