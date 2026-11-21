import { Component, inject, signal, OnInit  } from '@angular/core';
import { MovieService } from '../../services/movie-service';
import type { Movie } from '../../models/movie';
import { RouterLink } from '@angular/router';
import { FavoriteService } from '../../services/favorite-service';

@Component({
  imports: [RouterLink],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class HomeComponent implements OnInit {


  private readonly movieService = inject(MovieService);

  readonly favoriteService = inject(FavoriteService);

  movies = signal<Movie[]>([]);
  searchText = signal<string>('');

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchText.set(input.value);
  }


searchMovies(): void {
  const query = this.searchText().trim();

  if (!query) {
    this.movieService.getPopularMovies().subscribe({
      next: (response) => {
        this.movies.set(response.results);
      }
    });

    return;
  }

  this.movieService.searchMovies(query).subscribe({
    next: (response) => {
      this.movies.set(response.results);
    }
  });
}

senalarFavorito(movie: Movie, event: MouseEvent): void {
  event.preventDefault();
  event.stopPropagation();

  const esFavorita = this.favoriteService.isFavorite(movie.id);

  if (esFavorita) {
    this.favoriteService.removeFavorite(movie.id);
  } else {
    this.favoriteService.addFavorite(movie);
  }
}

  ngOnInit(): void {
    this.movieService.getPopularMovies().subscribe(
      {
        next: (response) => {
          this.movies.set(response.results);
        }
      });
  }
}
