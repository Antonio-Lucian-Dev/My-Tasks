import { Task } from './../tab1/interface/task';
import { LocalStorageService } from './../service/local-storage.service';
import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, AfterViewInit {

  // Importing ViewChild. We need @ViewChild decorator to get a reference to the local variable
  // that we have added to the canvas element in the HTML template.
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;

  lineChart: any;

  todayTasks: Task[] = [];

  username = '';

  constructor(private memory: LocalStorageService) {
    this.findAllTaskForToday();
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') ? localStorage.getItem('username') : '';
      this.memory.userInfo.subscribe(information => this.username = information);
  }

  findAllTaskForToday() {
    const date = new Date();
    this.todayTasks = this.memory.findAllTaskBasedOnCondition(date).filter(task => task.status === 1);
  }

  markTaskAsDone(taskId: number) {
    console.log(taskId);
    this.todayTasks.forEach(task => {
      if (this.todayTasks.indexOf(task) === taskId) {
        task.status = 2;
        this.memory.updateTask(task);
      }
    });

    this.findAllTaskForToday();
  }

  // When we try to call our chart to initialize methods in ngOnInit() it shows an error nativeElement of undefined.
  // So, we need to call all chart methods in ngAfterViewInit() where @ViewChild and @ViewChildren will be resolved.
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit() {
    this.lineChartMethod();
  }


  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
        datasets: [
          {
            label: 'Sell per week',
            fill: false,
            // lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
            spanGaps: false,
          }
        ]
      }
    });
  }

}
