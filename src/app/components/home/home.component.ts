import { Component } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

//Para poder ejecutar codigo de jquery en angular
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  videos: any[] = [];
  videoSelected: any;

  constructor(private youtubeService: YoutubeService) {

    this.youtubeService.getVideos().subscribe(videos => this.videos = videos);
  }

  loadMoreVideos() {
    this.youtubeService.getVideos().subscribe(videos => this.videos.push.apply(this.videos, videos));
  }

  showVideo(video) {

    this.videoSelected = video;
    //Para poder ejecutar codigo de jquery en angular
    $('#exampleModal').modal();
  }

  hideModal() {

    this.videoSelected = null;
    $('#exampleModal').modal('hide');
  }
}
