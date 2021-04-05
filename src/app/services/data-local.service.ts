import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  news: Article[] = [];

  constructor(
        private storage: Storage,
        public toastController: ToastController
    ) {
        this.loadFavorites();
   }

  async presentToast( message) {
   const toast = await this.toastController.create({
    message,
    duration: 2000
  });
  toast.present();
}

  saveNew( newsItem: Article) {
    
    const exist = this.news.find( newsIt => newsIt.title === newsItem.title );

    if (!exist) { 
      this.news.unshift(newsItem);
      this.storage.set('favorites', this.news);
    }

    this.presentToast('Agregado a favoritos.')
  }

  deleteNew( newsItem: Article) {

    this.news = this.news.filter( newIt => newIt.title !== newsItem.title );
    this.storage.set('favorites', this.news);

    this.presentToast('Borrado de favoritos.')
  }

  async loadFavorites() {
    
    const favorites  = await this.storage.get('favorites');

    if (favorites) {
      this.news = favorites;
    }
  }

}
