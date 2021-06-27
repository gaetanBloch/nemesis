import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-collection-form',
  templateUrl: './collection-form.component.html',
  styleUrls: ['./collection-form.component.scss']
})
export class CollectionFormComponent implements OnInit {
  form = new FormGroup({
    collection: new FormControl('')
  });

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.form.value)
  }
}
