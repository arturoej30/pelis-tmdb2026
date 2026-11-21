import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavoriteService } from '../../services/favorite-service';

@Component({
  imports: [ RouterLink],
  selector: 'app-favorites',
  styleUrl: './favorites.css',
  templateUrl: './favorites.html',
})
export class FavoritesComponent implements OnInit {

readonly favoriteService = inject(FavoriteService);

ngOnInit(): void {
  console.log('Favoritos recuperados:', this.favoriteService.favorites());
}


}
