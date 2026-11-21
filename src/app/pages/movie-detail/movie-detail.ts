import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import type { MovieDetails } from '../../models/movie-details';

@Component({
  imports: [],
  selector: 'app-movie-detail',
  styleUrl: './movie-detail.css',
  templateUrl: './movie-detail.html',
})
export class MovieDetailComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly movieService = inject(MovieService);
  movieId = this.route.snapshot.paramMap.get('id');
  movie = signal<MovieDetails | null>(null);

  ngOnInit(): void {
    if (this.movieId) {
      const id = Number(this.movieId);
  
      this.movieService.getMovieDetails(id).subscribe({
        next: (response) => {
          this.movie.set(response);
        }
      });
    }
  }

}








