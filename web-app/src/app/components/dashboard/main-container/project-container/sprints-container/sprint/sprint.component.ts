import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SprintComponent implements OnInit {

  public showSelectUS: boolean;

  constructor() {
      this.showSelectUS = false;
  }

  ngOnInit() {

  }

  public toggleSelectUS() {
      this.showSelectUS = !this.showSelectUS;
  }

    submitSelectUSForm() {
        this.toggleSelectUS();
    }
}
