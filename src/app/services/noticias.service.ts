import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.api_key;
const apiUrl = environment.api_url;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headLinesPage = 0;
  currentCategory = '';
  pageCategory = 0;

  constructor(private http: HttpClient) { }

  private executeQuery<type>(query: string) {

    query = apiUrl + query;

    return this.http.get<type>(query, { headers });
  }

  getTopHeadLines() {
    this.headLinesPage++;

    return this.executeQuery<RespuestaTopHeadlines>('/top-headlines?country=us&page=' + this.headLinesPage);
  }

  getTopHeadLinesCategory(category: string) {

    if (this.currentCategory === category) {
      this.pageCategory++
    }

    if (this.currentCategory !== category) {
      this.pageCategory = 1;
      this.currentCategory = category;
    }

    return this.executeQuery<RespuestaTopHeadlines>('/top-headlines?country=us&category=' + category + '&page=' + this.pageCategory)
  }
}
