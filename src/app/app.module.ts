import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ArtistComponent } from './artist/artist.component';
import { AlbumComponent } from './album/album.component';
import { TrackComponent } from './track/track.component';
import { ArtistService } from './artist.service';
import { AlbumService } from './album.service';
import {UserService}  from './user.service';
import { Track } from './entities/track';
import { TrackService } from './track.service';
import { DurationPipe } from './duration.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArtistComponent,
    AlbumComponent,
    TrackComponent,
    DurationPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(
      [
        {
          "path":"", 
          "component": HomeComponent, 
          "pathMatch": "full"
        }, 
        {
          "path":"artist/:id",
          "component":ArtistComponent, 
          "pathMatch":"full"
        }, 
        {
          "path":"album/:id", 
          "component":AlbumComponent, 
          "pathMatch":"full"
        }, 
        {
          "path":"track/:id", 
          "component":TrackComponent, 
          "pathMatch":"full"
        }
      ],
      {
        useHash: true
      }
)
  ],
  providers: [ArtistService, AlbumService, TrackService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
