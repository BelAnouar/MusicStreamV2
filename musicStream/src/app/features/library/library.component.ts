import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {MusicCategory, Track} from '../../core/models/track.model';
import * as TrackActions from '../../store/actions/track.actions';
import * as fromTrack from '../../store/selectors/track.selectors';
import { AppState } from '../../store/state.model';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent implements OnInit {
  tracks$: Observable<Track[]>;

  constructor(private store: Store<AppState>) {
    this.tracks$ = this.store.select(fromTrack.selectAllTracks);
  }

  ngOnInit() {
    this.store.dispatch(TrackActions.loadTracks());
    this.tracks$.subscribe(tracks => {
      console.log('Current tracks:', tracks);

    });

  }

  addTrack(track: Track) {
    this.store.dispatch(TrackActions.addTrack({ track }));
  }

  updateTrack(track: Track) {
    this.store.dispatch(TrackActions.updateTrack({ track }));
  }

  deleteTrack(id: string) {
    this.store.dispatch(TrackActions.deleteTrack({ id }));
  }

  selectTrack(id: string) {
    this.store.dispatch(TrackActions.selectTrack({ id }));
  }

  openAddTrackDialog() {

  }

  playTrack(id: string) {

  }
}

