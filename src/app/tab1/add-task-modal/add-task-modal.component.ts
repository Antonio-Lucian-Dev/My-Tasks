import { Status } from './../interface/status';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss']
})
export class AddTaskModalComponent implements OnInit {

  task = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    taskDate: ['']
  });

  constructor(public modalController: ModalController, private fb: FormBuilder, private memory: LocalStorageService) { }

  ngOnInit(): void {
  }

  addTask(): void {
    if(this.task.valid) {
      const task = {
        title: this.task.get('title').value,
        description: this.task.get('description').value,
        status: Status.NEW,
        taskDate: this.task.get('taskDate').value
      };
      this.memory.saveTask(task);
      this.modalController.dismiss({
        task: this.task.value
      });
    }
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
