import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import type { MovieResponse } from '../models/movie-response';
import type { MovieDetails } from '../models/movie-details';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.tmdbBaseUrl;
  private readonly apiKey = environment.tmdbApiKey;

  getPopularMovies(){
    return this.http.get<MovieResponse>( `${this.apiUrl}/movie/popular`,
      {
        params:{
                api_key:this.apiKey,
                language:'es-ES'
        }
      }
    );
  }

  

searchMovies (query:string){

return this.http.get<MovieResponse>(`${this.apiUrl}/search/movie`,{ params: {api_key: this.apiKey,language: 'es-ES',query: query}});
}

getMovieDetails(id: number) {

  return this.http.get<MovieDetails>(
    `${this.apiUrl}/movie/${id}`,
    {
      params: {
        api_key: this.apiKey,
        language: 'es-ES'
      }
    }
  );
}







}
