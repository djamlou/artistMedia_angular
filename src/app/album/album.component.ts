import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistService } from '../artist.service';
import {Album} from '../entities/album';
import {AlbumService} from '../album.service';
import {TrackService} from '../track.service';
import {Track} from '../entities/track';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  private _route: ActivatedRoute;
  private _service:ArtistService;
  private _albumService:AlbumService;
  private _trackService:TrackService;
  
  public pipe :DatePipe;
  public album:Album;
  public tracks:Track[];

  constructor(p_route: ActivatedRoute, p_service:ArtistService,p_albumService:AlbumService, p_trackService:TrackService ) {

    this._route = p_route;
    this._service =p_service;
    this._albumService = p_albumService;
    this._trackService =p_trackService;
    this.album =null;
    this.tracks= [];


  }
  public ngOnInit(): void {
    let id: number = parseInt(this._route.snapshot.paramMap.get("id"));
    this._albumService.getById(id).then(
      (p_album:Album) => {

        this.album = p_album;

        this._trackService.getTracksByAlbumId(p_album.id).then(
          (tracks:Track[]) => {
            console.log(tracks, p_album.id);
            this.tracks = tracks;
          }
        )
        
      }
    )
   
  }

}
