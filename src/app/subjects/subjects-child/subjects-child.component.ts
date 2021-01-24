import { Component, Input, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DataModel } from '../../datamodel';

@Component({
  selector: 'app-subjects-child',
  templateUrl: './subjects-child.component.html',
  styleUrls: ['./subjects-child.component.css']
})
export class SubjectsChildComponent implements OnInit {

  @Input() subject: Subject<DataModel>;
  @Input() name: string;

  private log: string[] = [];
  private connected: boolean;
  private subscription: Subscription;

  constructor() {
  }

  ngOnInit(): void {

  }

  logData(data: DataModel): void {
    this.log.push('Timestamp: ' + data.timestamp + 'Data: ' + data.data);
  }

  connect(): void {
    this.log.push('Connected!');
    this.connected = true;
    this.subscription = this.subject.subscribe((data: DataModel) => {
        this.logData(data);
      }, error => {
        this.connected = false;
      },
      () => {
        this.connected = false;
        this.log.push('Finished!');
      }
    );
  }

  disconnect(): void {

  }

}
