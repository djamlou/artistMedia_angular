import { Injectable } from '@angular/core';
import { Artist } from './entities/artist';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { toPromise } from 'rxjs/operator/toPromise';
import { NumberSymbol } from '@angular/common/src/i18n/locale_data_api';
import {UserService} from './user.service';
import {environment} from '../environments/environment';

@Injectable()
export class ArtistService {

  private _http: Http;
  private _uService: UserService;

  constructor(p_http: Http, p_uService:UserService) {
    this._http = p_http;
    this._uService = p_uService;

  }

  public getAll(): Promise<Artist[]> {

    
    const url: string = "http://localhost/symfonyCRUD/public/api/list";
  
    let prom: Promise<Response> = this._http.get(url).toPromise();
    return prom.then(
      (p_rep: Response): Artist[] => {
        return p_rep.json() as Artist[];
      }
    )
  }

  public getById(p_id:number):Promise<Artist>{

    return this.getAll().then(

      ( p_artists:Artist[]):Artist => {

        let i:number = p_artists.length;

        while( --i > -1 ){
          if( p_artists[i].id === p_id )
            return p_artists[i];
        }

        return null;
      }
    );
  }

  public deleteArtist( p_artist:Artist ):Promise<any> {

    const uri:string = environment.remote_uri + 'api/artist/delete/'+p_artist.id;
    const myHeaders: Headers = new Headers(
      {
        "Content-Type": 'application/json'
        //"X-AUTH-TOKEN": this._uService.getApiKey()
      }
    );

    const options: RequestOptionsArgs = {
      method: "DELETE",
      headers: myHeaders
    };

    return this._http.delete(uri, options).toPromise().then(
      (rep:Response) => {
        return rep.json();
      }
    )
}
}
