import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'; // Map

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyCn3BH-If2lxRQKDB7FGm2u-NL06s4UPF0';
  private playlist = 'UUsT0YIqwnpJCM-mx7-gSA4Q';

  constructor(public http: HttpClient) { }

  getVideos() {
    const url = `${this.youtubeUrl}/playlistItems`;
    let params = new HttpParams();
    params.set('part', 'snippet');
    params.set('maxResults', '10');
    params.set('playlistId', this.playlist);
    params.set('key', this.apiKey);


    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      search: params
    };
    return this.http.get(url, httpOptions).pipe(
      map(response => {
        console.log(response);
      })
    );
  };
}
