import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-hot-observables-intro',
  templateUrl: './hot-observables-intro.component.html',
  styleUrls: ['./hot-observables-intro.component.css']
})
export class HotObservablesIntroComponent implements OnInit {

  @ViewChild('myButton') button: ElementRef;

  n1 = 0;
  n2 = 0;
  s1 = '';
  s2 = '';

  constructor() {
  }

  ngOnInit(): void {
    // const myBtnClickObservable: Observable<number> = fromEvent(
    //   this.button.nativeElement, 'click'
    // );
    // myBtnClickObservable.subscribe(event => console.log('button clicked 1'));
    // myBtnClickObservable.subscribe(event => console.log('button clicked 2'));

    class Producer {
      private myListeners = [];
      private n = 0;
      private id;

      addListener(l): void {
        this.myListeners.push(l);
        console.log(this.myListeners.length);
      }

      start(): void {
        this.id = setInterval(() => {
          this.n++;
          console.log('From Producer:', this.n);
          for (const l of this.myListeners) {
            l(this.n);
          }
        }, 1000);
      }

      stop(): void {
        clearInterval(this.id);
      }

    }

    const producer: Producer = new Producer();
    producer.start();
    setTimeout(() => {
      producer.addListener(n => console.log('From listener 1', n));
      producer.addListener(n => console.log('From listener 2', n));
    }, 4000);

    const myHotObservable = new Observable((observer: Observer<number>) => {
      producer.addListener((n) => observer.next);
    });
    myHotObservable.subscribe(n => console.log('From subscribe 1', n));
    myHotObservable.subscribe(n => console.log('From subscribe 2', n));
  }

}
