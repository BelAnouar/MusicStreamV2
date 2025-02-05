import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddMusicDialogComponent} from "../../shared/components/add-music-dialog/add-music-dialog.component";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/state.model";
import * as TrackActions from "../../store/actions/track.actions";
import {MusicCategory, Track} from "../../core/models/track.model";
import {firstValueFrom} from "rxjs";
import {StorageService} from "../../core/services/storage.service";
import {TrackService} from "../../core/services/track.service";


interface TrackFront {
  title: string;
  artist: string;
  albumArt: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private audio: HTMLAudioElement

  currentTrack: TrackFront = {
    title: "Are You Listening",
    artist: "Chelsea Cutler",
    albumArt: "/assets/images/music.webp?height=400&width=400",
  }

  isPlaying = false

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    private storageService: StorageService,
    private trackService: TrackService,
  ) {
    this.audio = new Audio("/assets/audio/chaba.mp3")
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying

    if (this.isPlaying) {
      this.audio.play()
    } else {
      this.audio.pause()
    }
  }

  async openAddMusicDialog() {
    const dialogRef = this.dialog.open(AddMusicDialogComponent, {
      width: "400px",
    })

    dialogRef.afterClosed().subscribe(async (formData: FormData) => {
      if (formData) {
        try {
          const newTrack = await this.trackService.addTrack(formData).toPromise()
          this.store.dispatch(TrackActions.addTrack({ track: newTrack }))
        } catch (error) {
          console.error("Error adding track:", error)
          // Handle error (e.g., show error message to user)
        }
      }
    })
  }
}
