import { Component, OnInit } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';

@Component({
  selector: 'app-hot-observables',
  templateUrl: './hot-observables.component.html',
  styleUrls: ['./hot-observables.component.css']
})
export class HotObservablesComponent implements OnInit {

  n = 0;
  n1 = 0;
  n2 = 0;
  s1 = '';
  s2 = '';

  myObservable: Observable<number>;

  constructor() {
  }

  ngOnInit(): void {
    this.myObservable = new Observable<number>((observer: Observer<number>) => {
      let i = 0;
      console.log('%c Observable Created!', 'background: #CCCCCC; color: #FF0000');
      setInterval(() => {
        i++;
        console.log('%c i = ' + i, 'background: #CCCCCC; color: #0000FF');
        i === 100 ? observer.complete() : observer.next(i);
      }, 1000);
    });
    this.usingSubjects();
  }

  usingSubjects(): void {
    const subject = new Subject<number>();
    this.myObservable.subscribe(subject);


    // Subscriber 1
    this.s1 = 'waiting for interval...';
    setTimeout(() => {
      subject.subscribe(number => {
        this.n1 = number;
        this.s1 = 'OK';
      });
    }, 2000);

    // Subscriber 2
    this.s2 = 'waiting for interval...';
    setTimeout(() => {
      subject.subscribe(number => {
        this.n2 = number;
        this.s2 = 'OK';
      });
    }, 4000);
  }

}
