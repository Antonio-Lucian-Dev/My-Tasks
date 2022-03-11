
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Task } from '../tab1/interface/task';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  @Output() tasks = new EventEmitter<Task[]>();
  @Output() userInfo = new EventEmitter<string>();

  constructor() { }

  saveTask(task: Task) {
    const findedTasks = JSON.parse(localStorage.getItem('tasks'));
    console.log(findedTasks);
    const tasks = findedTasks ? findedTasks : [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  updateTask(task: Task) {
    const findedTasks = JSON.parse(localStorage.getItem('tasks'));
    console.log(findedTasks);
    const tasks: Task[] = findedTasks ? findedTasks : [];
    tasks.splice(tasks.indexOf(task), 1, task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  findAllTasks(): void {
    this.tasks.emit(JSON.parse(localStorage.getItem('tasks')));
  }

  findAllTaskBasedOnCondition(condition: Date): Task[] {
    const tasks: Task[] = JSON.parse(localStorage.getItem('tasks'));
    if(tasks && tasks.length > 0) {
      return tasks.filter(task => {
        const convertedDateFromString = new Date(task.taskDate);
        if(
          convertedDateFromString.getFullYear() === condition.getFullYear() &&
          convertedDateFromString.getMonth() === condition.getMonth() && convertedDateFromString.getDay() === condition.getDay()) {
          return task;
        }
      });
    } else {
      return [];
    }
  }

  removeAllTasks(): void {
   localStorage.clear();
  }

  saveUserInfo(username: string) {
    localStorage.setItem('username', username);
    this.userInfo.emit(username);
  }
}
