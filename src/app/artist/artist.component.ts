import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistService } from '../artist.service';
import {Artist} from '../entities/artist';
import { AlbumService } from '../album.service';
import { Album } from '../entities/album';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {



  private _route: ActivatedRoute;
  private _service:ArtistService;
  private _albumService:AlbumService;

  public artist:Artist;
  public albums:Album[];

  constructor(p_route: ActivatedRoute, p_service:ArtistService, p_al:AlbumService ) {

    this.albums =[];
    this._albumService =p_al;
    this._route = p_route;
    this._service =p_service;
    this.artist =null;

  }
  public ngOnInit(): void {
    let id: number = parseInt(this._route.snapshot.paramMap.get("id"));
    this._service.getById(id).then(
      (p_artist:Artist) => {

        this.artist = p_artist;

        this._service.deleteArtist(p_artist).then(         
            (p_artist: Artist)=>{
              this.artist = p_artist;

            }
        )

        this._albumService.getAlbumsByArtistId(p_artist.id).then(
          (albums:Album[]) => {
            console.log(albums, p_artist.id);
            this.albums = albums;
          }
        )
        
      }
    )
  }

}
