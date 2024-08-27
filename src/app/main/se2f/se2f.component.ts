import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { ChainingDataService } from '../../services/chaining-data.service';
import {Options} from '../../models/options.model';

@Component({
  selector: 'app-se2f',
  templateUrl: './se2f.component.html',
  styleUrl: './se2f.component.css',
  providers: [MessageService]
})
export class Se2fComponent implements OnInit, OnDestroy {
  private optionsSubs!: Subscription;
  options!: Options;

  constructor(private chainingDataService: ChainingDataService) {}

  ngOnInit() {
    this.optionsSubs = this.chainingDataService.options.subscribe(data => this.options = data);
  }

  validateChoice(clicked: string, form: NgForm) {
    form.form.controls[clicked].setValue('si');
    console.log('Form: ', form.form.value);
  }

  ngOnDestroy() {
    if (this.optionsSubs) this.optionsSubs.unsubscribe();
  }
}
