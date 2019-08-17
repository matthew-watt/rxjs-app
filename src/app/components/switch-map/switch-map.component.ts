import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { StreamService } from 'src/app/services/stream.service';
import { map, mergeMap, concatMap, switchMap, tap } from 'rxjs/operators';
import { Observable, fromEvent, from, of, merge, Subject } from 'rxjs';

@Component({
  selector: 'app-switch-map',
  templateUrl: './switch-map.component.html',
  styleUrls: ['./switch-map.component.scss']
})
export class SwitchMapComponent implements OnInit {

  // pipe async unwraps observables

  images$: Observable<string>;
  streamA$: Observable<string>;
  streamB$: Observable<string>;

  queue = new Subject();
  events = Array<Observable<any>>();

  constructor(private streamService: StreamService) { }

  ngOnInit() {
    this.streamA$ = this.streamService.getStream(1)
      .pipe(
        tap(data => {
          console.log('stream data:', data);
        })
      );

    this.streamB$ = this.streamService.getSlowStream(2);
    this.images$ = this.queue.pipe(concatMap((timer: Observable<string>) => {
      // when an event arrives here it is still wrapped in observable
      
      // subscribe triggers another timer, not mapped in sequence though
      timer.subscribe(data => {
        console.log('inner observable subscription:', data);
      });

      // must return timer for concatMap mapping to execute, like regular map function
      //return new Observable<any>(); // <- timer observable won't be mapped
      return timer;
    }));
  }

  clickA() {
    this.queue.next(this.streamA$);
  }

  clickB() {
    this.queue.next(this.streamB$);
  }

}
