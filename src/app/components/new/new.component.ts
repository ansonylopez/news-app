import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {

  @Input() new: Article;
  @Input() i: number;
  @Input() inFavorites: boolean;

  constructor(
      private inAppBrowser: InAppBrowser,
      private actionSheetCtrl: ActionSheetController,
      private socialSharing: SocialSharing,
      private dataLocalService: DataLocalService,
      private platform: Platform
    ) { }

  ngOnInit() {}

  openNew() {
    const browser = this.inAppBrowser.create(this.new.url, '_system');
  }

  async launchMenu() {
    let saveOrDeleteBtn = {
      text: 'Favorite',
      icon: 'star',
      handler: () => {
        this.dataLocalService.saveNew( this.new )
      }
    };

    if (this.inFavorites) {
      saveOrDeleteBtn = {
        text: 'Delete',
        icon: 'trash',
        handler: () => {
          this.dataLocalService.deleteNew( this.new )
        }
      };
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
          this.shareNews()
        }
      }, 
       saveOrDeleteBtn,
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  shareNews() {

    if (this.platform.is('cordova')) {
      
      this.socialSharing.share(
        this.new.title,
        this.new.source.name,
        '',
        this.new.url
      )
        return;
    }

    if (navigator.share) {
      navigator.share({
        title: this.new.title,
        text: this.new.description,
        url: this.new.url
      })
        .then(() => console.log('Successful share'))
        .catch( (error) => console.log('Error sharing', error));

    }
  }
}
