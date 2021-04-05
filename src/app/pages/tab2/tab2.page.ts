import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, { static: true }) segment: IonSegment

  categories = [
    'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'
  ];
  news: Article[] = [];

  constructor(private noticiasService: NoticiasService) { }

  ngOnInit() {
    this.segment.value = this.categories[0];
    this.loadNews(this.segment.value)
  }

  changeCategory(event) {

    this.news = [];
    this.loadNews(event.detail.value);
  }

  loadNews(category: string, event?) {
    this.noticiasService.getTopHeadLinesCategory(category)
      .subscribe(resp => {
        this.news.push(...resp.articles);

        if (event) {
          event.target.complete();
        }
      })
  }

  loadData(event) {
    this.loadNews(this.segment.value, event);
  }
}
