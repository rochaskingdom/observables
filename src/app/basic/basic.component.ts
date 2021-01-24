import { Component, OnInit } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

  subscription1: Subscription;
  subscription2: Subscription;
  n1 = 0;
  n2 = 0;
  s1 = '';
  s2 = '';

  constructor() {
  }

  ngOnInit(): void {
    this.s1 = 'Initializing...';
    this.s2 = 'Initializing...';
    new Observable(
      (observer: Observer<number>) => {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        observer.next(4);
        observer.next(5);
        observer.error('error');
        observer.complete();
      }).subscribe(n => console.log(n),
      error => console.error(error),
      () => console.log('completed.'));

    // const timerCount = interval(500);
    // timerCount.subscribe(n => console.log(n));
    // console.log('after interval');

    const myIntervalObservable = new Observable((observer: Observer<any>) => {
        let i = 0;
        const id = setInterval(() => {
          i++;
          console.log('from Observable:', i);
          if (i === 10) {
            observer.complete();
          } else if (i % 2 === 0) {
            observer.next(i);
          }
        }, 1000);
        return () => {
          clearInterval(id);
        };
      }
    );
    this.subscription1 = myIntervalObservable.subscribe(n => {
        this.n1 = n;
      },
      error => {
        this.s1 = 'Error' + error;
      },
      () => {
        this.s1 = 'Completed.';
      }
    );
    this.subscription2 = myIntervalObservable.subscribe(n => {
        this.n2 = n;
      },
      error => {
        this.s2 = 'Error' + error;
      },
      () => {
        this.s2 = 'Completed.';
      });

    setTimeout(() => {
      this.subscription1.unsubscribe();
      this.subscription2.unsubscribe();
    }, 4000);
  }

}
