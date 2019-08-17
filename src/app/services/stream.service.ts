import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';
import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  constructor() { }

  getStream(time: number): Observable<string> {

    let timer$ = timer(2000).pipe(mapTo('timer 2 seconds'));
    console.log('get stream');

    const observable = new Observable<string>(observer => {

      timer$.pipe(
        map(() => {
          observer.next('http response 1');
          observer.complete();
        })
      ).subscribe();

    });

    return timer$;
  }

  getSlowStream(time: number): Observable<string> {

    let timer$ = timer(5000);

    const observable = new Observable<string>(observer => {

      timer$.pipe(
        map(() => {
          observer.next('http response 2');
          observer.complete();
        })
      ).subscribe();

    });
    return observable;
  }

  getNumber(): Observable<number> {
    return new Observable<number>();
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
