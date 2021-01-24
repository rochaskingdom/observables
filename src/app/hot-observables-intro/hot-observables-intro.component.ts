import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

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
    const myBtnClickObservable: Observable<number> = fromEvent(
      this.button.nativeElement, 'click'
    );
    myBtnClickObservable.subscribe(event => console.log('button clicked 1'));
    myBtnClickObservable.subscribe(event => console.log('button clicked 2'));
  }

}
