import { Component, OnInit } from '@angular/core';
import { User } from './entities/user';
import { UserService } from './user.service';
import { ArtistService } from './artist.service';
import { Router } from '@angular/router';
import { Artist } from './entities/artist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: 'Artist Media';
  private statemarque: number = 0;
  private _uservice: UserService;
  private _artservice: ArtistService;
  private username: string;
  private password: string;
  private email: string;
  private user: User;
  private router: Router;
  private genres: Array<any>;
  private artist: Artist;
  private name: string;
  private img: string;

  constructor(p_uservice: UserService, p_artservice: ArtistService, p_router: Router) {

    this.artist = new Artist();
    this._uservice = p_uservice;
    this._artservice = p_artservice;
    this.router = p_router;
    this.genres = [];

  }

  public loginForm() {

    let myDiv = document.getElementById('loginForm');

    if (this.statemarque == 0) {

      myDiv.style.display = "block";
      this.statemarque = 1;
    } else {

      myDiv.style.display = "none";
      this.statemarque = 0;
    }
  }

  public registerForm() {

    let myDiv = document.getElementById('registerForm');

    if (this.statemarque == 0) {

      myDiv.style.display = "block";
      this.statemarque = 1;
    } else {

      myDiv.style.display = "none";
      this.statemarque = 0;
    }
  }

  public addForm() {

    let myDiv = document.getElementById('ajoutModifArtist');
    let myoutelt = document.getElementById('outlet');

    if (this.statemarque == 0) {

      myDiv.style.display = "block";
      myoutelt.style.display = "none";
      this.statemarque = 1;
    } else {

      myDiv.style.display = "none";
      myoutelt.style.display = "block";
      this.statemarque = 0;
    }
  }

  public onLogin() {

    this._uservice.login(this.username, this.password).then(
      (p_user: User) => {
        this.user = p_user;
      }
    );

    this.router.navigate(['/artist/15']);
    let myDiv = document.getElementById('loginForm');
    myDiv.style.display = "none";
  }

  public onRegister() {
    this._uservice.register(this.username, this.password, this.email).then(
      (p_user: User) => {
        this.user = p_user;
      }
    );

    let myDiv = document.getElementById('registerForm');
    myDiv.style.display = "none";
  }



  public addArtist() {

    const elem: any = document.getElementById('img');
    const files: Array<any> = elem.files;

    if (files.length > 0) {
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {

          this.artist.img = "image_" + Math.random();
          this.artist.imgData = reader.result;
          this.artist.name = this.name;
          this.artist.genres = this.genres;

          this._artservice.create(this.artist).then(
            (p_artist: Artist) => {
              this.artist = p_artist;
            }
          );

          let myDiv = document.getElementById('ajoutModifArtist');
          let myoutelt = document.getElementById('outlet');

          myDiv.style.display = "none";
          myoutelt.style.display = "block";
        }
      );

      reader.readAsDataURL(files[0]);
    }



  }

  public ngOnInit(): void {
    this._artservice.getgenres().then(
      (genres: any[]) => {
        this.genres = genres;
      }
    );

  }
}