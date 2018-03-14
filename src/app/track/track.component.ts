import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AlbumService} from '../album.service';
import {TrackService} from '../track.service';
import {Track} from '../entities/track';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  private _route: ActivatedRoute;
  private _service:AlbumService;
  private _trackService:TrackService;

  public track:Track;

  constructor(p_route: ActivatedRoute, p_service:AlbumService, p_trackService:TrackService ) {

    this._route = p_route;
    this._service =p_service;
    this._trackService =p_trackService;
    this.track =null;
    
  }
  public ngOnInit(): void {
    let id: number = parseInt(this._route.snapshot.paramMap.get("id"));
    this._trackService.getById(id).then(
      (p_track:Track) => {

        this.track = p_track;
      })
  }

}
