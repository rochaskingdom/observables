import { Component, OnInit } from '@angular/core';
import { GenRandomDataService } from '../gen-random-data.service';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { DataModel } from '../datamodel';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  private subject: Subject<DataModel>;
  private replaySubject: ReplaySubject<DataModel>;
  private asyncSubject: AsyncSubject<DataModel>;
  private behaviorSubject: BehaviorSubject<DataModel>;

  constructor(
    private readonly dataService: GenRandomDataService
  ) {
  }

  ngOnInit(): void {
    this.subject = new Subject<DataModel>();
    this.replaySubject = new ReplaySubject<DataModel>();
    this.asyncSubject = new AsyncSubject<DataModel>();
    this.behaviorSubject = new BehaviorSubject<DataModel>({ timestamp: 0, data: 0 });

    this.dataService.dataObservable.subscribe(this.subject);
    this.dataService.dataObservable.subscribe(this.replaySubject);
    this.dataService.dataObservable.subscribe(this.asyncSubject);
    this.dataService.dataObservable.subscribe(this.behaviorSubject);
  }

  connect(): void {
    this.dataService.dataObservable.connect();
  }

}
