import { AddTaskModalComponent } from './add-task-modal/add-task-modal.component';
import { Task } from './interface/task';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment-timezone';
import { LocalStorageService } from '../service/local-storage.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  private tasks: Task[] = [];
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public filteredTasks: Task[] = [];

  // eslint-disable-next-line @typescript-eslint/member-ordering
  isLoading = false;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  moment: any = moment;

  constructor(private memory: LocalStorageService, public modalController: ModalController) {
  }

  ngOnInit(): void {
    const taskFromStorage = JSON.parse(localStorage.getItem('tasks'));
    this.tasks = taskFromStorage ? taskFromStorage : [];
    this.filteredTasks = this.tasks;
    this.memory.tasks.subscribe(tasks => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
      if (this.isLoading) {
        setTimeout(() => { this.isLoading = false; }, 3000);
      }
    });
  }

  filterTasks(value: string): void {
    console.log(value);
    this.filteredTasks = this.tasks.filter(task => task.title.toLocaleLowerCase().startsWith(value.toLocaleLowerCase()));
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: AddTaskModalComponent,
      cssClass: 'my-custom-class',
      componentProps: {
      } // data to pass
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
    if (data && data.task) {
      console.log('A intrat');
      this.isLoading = true;
      this.memory.findAllTasks();
    }
  }

  markTaskAsDone(taskId: number) {
    console.log(taskId);
    this.filteredTasks = this.tasks.map(task => {
      if (this.filteredTasks.indexOf(task) === taskId) {
        task.status = 2;
      }
      return task;
    });
    this.refreshLocalStorage();
  }

  removeTask(taskId) {
    this.filteredTasks.splice(taskId, 1);
    this.refreshLocalStorage();
  }

  refreshLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.filteredTasks));
    this.memory.findAllTasks();
  }

  typeOfChip(task): string {
    return task.status === 1 ? 'NEW' : 'COMPLETED';
  }

  filterDate(taskDate: any): string {
    return taskDate ? (moment.tz(taskDate, 'Europe/Dublin')).clone().tz(moment.tz.guess()).format('DD-MM-YYYY, h:mm a') : '';
  }

}
