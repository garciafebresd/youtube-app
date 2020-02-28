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
  private nextPageToken: string;

  constructor(public http: HttpClient) { }

  getVideos() {

    let paramPageToken = '';
    if (this.nextPageToken) {
      paramPageToken = '&pageToken=' + this.nextPageToken;
    }

    // tslint:disable-next-line: max-line-length
    const url = `${this.youtubeUrl}/playlistItems?part=snippet&maxResults=10&playlistId=${this.playlist}&key=${this.apiKey}${paramPageToken}`;

    return this.http.get(url).pipe(
      map((response: any) => {

        this.nextPageToken = response.nextPageToken;
        const videos: any[] = [];
        for (const item of response.items) {
          const snippet = item.snippet;
          videos.push(snippet);
        }
        return videos;

      })
    );

  }
}
