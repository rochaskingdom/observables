import { Component, OnInit } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-cold-observables',
  templateUrl: './cold-observables.component.html',
  styleUrls: ['./cold-observables.component.css']
})
export class ColdObservablesComponent implements OnInit {

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

    this.s1 = 'waiting for interval...';
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

    this.s2 = 'waiting for interval...';
    setInterval(() => {
      this.subscription2 = myIntervalObservable.subscribe(n => {
          this.n2 = n;
        },
        error => {
          this.s2 = 'Error' + error;
        },
        () => {
          this.s2 = 'Completed.';
        });
    }, 3000);


    setTimeout(() => {
      this.subscription1.unsubscribe();
      this.subscription2.unsubscribe();
    }, 15000);
  }

}
