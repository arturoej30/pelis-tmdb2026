import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { HeaderComponent } from './components/header/header';

@Component({
  imports: [RouterOutlet, HomeComponent, HeaderComponent ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

  protected readonly title = signal('pelis-tmdb2026');

}
