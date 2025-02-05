import {Component, OnInit} from '@angular/core';
import {filter, Observable} from "rxjs";
import {Track} from "../../core/models/track.model";
import {Store} from "@ngrx/store";
import {selectTrack} from "../../store/actions/track.actions";
import {selectCurrentTrack} from "../../store/selectors/track.selectors";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-track-detail',
  templateUrl: './track-detail.component.html',
  styleUrl: './track-detail.component.scss'
})
export class TrackDetailComponent implements OnInit {
  track$: Observable<Track | null>;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.track$ = this.store.select(selectCurrentTrack).pipe(
      filter(track => !!track), // Ensure non-null and non-empty values
      map(track => track || null) // Ensure it's either a Track or null
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const trackId = params['id'];
      if (trackId) {
        this.store.dispatch(selectTrack({ id: trackId }));
      }
    });

    // Debug to see if the observable emits data
    this.track$.subscribe(track => {
      console.log('Current Track:', track); // Check if data exists
    });
  }
}

