import { Injectable, signal } from '@angular/core';
import type { Movie } from '../models/movie';

@Injectable({
    providedIn: 'root',
  })

  export class FavoriteService {

    favorites = signal<Movie[]>(this.loadFavorites());


    private loadFavorites():Movie[]{

        const storedFavorites = localStorage.getItem('pelis-tmdb-favorites');
        if (!storedFavorites) {
            return [];
          }
        try {
          return JSON.parse(storedFavorites) as Movie[];
        } catch {
            return [];

        }
    }

        addFavorite(movie: Movie): void{

            const alreadyExist = this.favorites().some(
                favorite => favorite.id === movie.id);

                if (alreadyExist){
                    return;
                }
                this.favorites.update(currentFavorites => [ ...currentFavorites,
                    movie 
                  ]);

                  localStorage.setItem ('pelis-tmdb-favorites', JSON.stringify (this.favorites()));

        }

    removeFavorite(movieId: number): void{
       

        
        this.favorites.update(currentFavorites => currentFavorites.filter(favorite => favorite.id !== movieId));
        localStorage.setItem(
            'pelis-tmdb-favorites',
            JSON.stringify(this.favorites())
          );


    }

    isFavorite(movieId: number): boolean {
        return this.favorites().some(
            favorite => favorite.id === movieId
          );


  }
}