import { Component, OnInit } from '@angular/core';
import {Artist} from '../entities/artist';
import {ArtistService} from '../artist.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  artists: Array<Artist>

private _service:ArtistService;



constructor(p_service:ArtistService){

  this._service = p_service;
  this.artists = new Array<Artist>();

}

public ngOnInit():void{
    let artPromise : Promise<Artist[]> =  this._service.getAll();
    
    artPromise.then(
      (p_artists:Artist[])=>{
        this.artists = p_artists ;
      });
    }
}
