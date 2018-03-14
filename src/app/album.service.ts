import { Injectable } from '@angular/core';
import { Album } from './entities/album';
import { Http, Response } from '@angular/http';
import { toPromise } from 'rxjs/operator/toPromise';
import { NumberSymbol } from '@angular/common/src/i18n/locale_data_api';

@Injectable()
export class AlbumService {

  private _http: Http;
  constructor(p_http: Http) {
    this._http = p_http;
  }

  public getAll(): Promise<Album[]> {

    
    const url: string = "http://localhost/symfonyCRUD/public/api/album";
  
    let prom: Promise<Response> = this._http.get(url).toPromise();
    return prom.then(
      (p_rep: Response): Album[] => {
        return p_rep.json() as Album[];
      }
    )

  }

  public getAlbumsByArtistId(p_artistId:number):Promise<Album[]> {
    return this.getAll().then(
      (albums: Album[]):Album[] => {

        const results = new Array<Album>();

        for( let i:number = 0; i< albums.length; i++){

          if( albums[i].artistId === p_artistId)
            results.push(albums[i]);
        }

        return results;

      }
    )
  }

  public getById(p_id:number):Promise<Album>{
    return this.getAll().then(

      ( p_albums:Album[]):Album => {

        let i:number = p_albums.length;

        while( --i > -1 ){
          if( p_albums[i].id === p_id )
            return p_albums[i];
        }

        return null;
      }
    );
  }

}
