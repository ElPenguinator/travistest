import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-backlog-container',
  templateUrl: './backlog-container.component.html',
  styleUrls: ['./backlog-container.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BacklogContainerComponent implements OnInit {

    /**
     * If true, the form for adding a US is shown.
     * @type {boolean}
     */
  private showAddUS: boolean;

    /**
     * If true, the form for adding a US is shown.
     * @type {boolean}
     */
    private showModifyUS: boolean;

    /**
     * FormGroup for add member form
     */
  private addUSForm: FormGroup;


  constructor() {
      this.showAddUS = false;
      this.showModifyUS = false;
  }

  ngOnInit() {

      this.addUSForm = new FormGroup ({
          us: new FormControl('', [Validators.required]),
          priority: new FormControl('', [Validators.required]),
          difficulty: new FormControl('', [Validators.required])
      });

      this.addUSForm.setValue({
          us: "",
          priority: "",
          difficulty : ""
      });
  }

  public toggleAddUS(): void {
        this.showAddUS = !this.showAddUS;
  }

  public toggleModifyUS(): void {
        this.showModifyUS = !this.showModifyUS;
  }

  public submitAddUSForm() {
      this.toggleAddUS();
  }

  public deleteUS() {

  }

  public modifyUS() {
      console.log("i'm here");
        this.toggleModifyUS();

  }
}
