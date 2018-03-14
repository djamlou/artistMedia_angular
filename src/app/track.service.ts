import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { toPromise } from 'rxjs/operator/toPromise';
import { Track} from './entities/track';

@Injectable()
export class TrackService {

  private _http: Http;
  constructor(p_http: Http) {
    this._http = p_http;
  }

  public getAll(): Promise<Track[]> {

    
    const url: string = "http://localhost/symfonyCRUD/public/api/track";
  
    let prom: Promise<Response> = this._http.get(url).toPromise();
    return prom.then(
      (p_rep: Response): Track[] => {
        return p_rep.json() as Track[];
      }
    )

  }

  public getById(p_id:number):Promise<Track>{
    return this.getAll().then(

      ( p_tracks:Track[]):Track => {

        let i:number = p_tracks.length;

        while( --i > -1 ){
          if( p_tracks[i].id === p_id )
            return p_tracks[i];
        }

        return null;
      }
    );
  }

  public getTracksByAlbumId(p_albumId:number):Promise<Track[]> {
    return this.getAll().then(
      (tracks: Track[]):Track[] => {

        const results = new Array<Track>();

        for( let i:number = 0; i< tracks.length; i++){

          if( tracks[i].albumId === p_albumId)
            results.push(tracks[i]);
        }

        return results;

      }
    )
  }
}