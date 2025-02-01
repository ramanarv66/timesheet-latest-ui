import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Timesheet, TimesheetService } from '../../service/time-sheet.service';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrl: './display-result.component.css'
})
export class DisplayResultComponent {
  displayedColumns: string[] = [ 'userId', 'week', 'date', 'hoursLogged', 'status','day','monthNumber'];
  // displayedColumns: string[] = ['timesheetId', 'userId', 'week', 'date', 'hoursLogged', 'status','day','monthNumber'];
  dataSource = new MatTableDataSource<Timesheet>();
  @Input() userId: string = '';

  public doughnutChartLabels: string[] = [];
  // public doughnutChartData: number[] = [];
  public doughnutChartType: ChartType = 'doughnut';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private timesheetService: TimesheetService) {
    console.log('user id from employee detail' , this.userId)
    
   }

   public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    cutout: '60%',
  };
  ngOnInit(): void {
    this.timesheetService.getTimeSheetByUserId(this.userId).subscribe((data: any) => {
      this.dataSource.data = data;
      console.log(this.dataSource.data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
   
 let prepareData = this.groupByWeek(data)
 console.log(prepareData)
    const labels = prepareData.labels; 
    const data1 = prepareData.data;   

    this.doughnutChartData = {
      labels: labels,
      datasets: [
        {
          data: data1,
          label: 'Total Hours Logged',
          backgroundColor: ['rgba(255, 26, 104, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',],  // Different colors for each segment
          hoverBackgroundColor: ['blue', 'lightgreen', 'lightorange'],
          borderWidth: 1 , // Border width
          
          borderColor: [
            'rgba(255, 26, 104, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)']
          
        },
      ],
    }

    this.barChartData = {
      
      labels: labels,
      datasets: [
        {
          data: data1,
          label: 'Total Hours Logged',
          backgroundColor: ['rgba(255, 26, 104, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',],
          hoverBackgroundColor: ['blue', 'lightgreen', 'lightorange'],
          borderColor: [
            'rgba(255, 26, 104, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'],
          
          borderWidth: 1 , // Border width
        barPercentage:0.5,
        categoryPercentage:0.8
        }
      ]
    };
    });

   
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isWeekend(day: string): boolean {
    return day === 'Saturday' || day === 'Sunday';
  }

  graphLables:string[] = [];
  graphData:number[] = [];
  groupByWeek(timesheets: Timesheet[]): { labels: string[], data: number[] } {
    const weeklyHoursMap = new Map<string, number>();

    timesheets.forEach(entry => {
      const week = entry.week;
      const hours = entry.hoursLogged;

      weeklyHoursMap.set(week, (weeklyHoursMap.get(week) || 0) + hours);
    });

    this.graphData =  Array.from(weeklyHoursMap.values());
    this.graphLables = Array.from(weeklyHoursMap.keys());

    return {
      labels: Array.from(weeklyHoursMap.keys()),
      data: Array.from(weeklyHoursMap.values())
    };
  }
 

  public doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Total Hours Logged',
        backgroundColor: [],
        hoverBackgroundColor: []
      },
    ],
  };
  


  //bar chart

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true
    },
      
      y: {
        beginAtZero: true  // Ensure y-axis also starts from zero
      }
    },

  
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };

  // Bar Chart Data
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Week 1', 'Week 2', 'Week 3'],  // X-Axis Labels (categories)
    datasets: [
      {
        data: [50, 25, 25],  // Data for each label (corresponds to Y-Axis)
        label: 'Total Hours Logged',
        backgroundColor: 'red',  // Color of bars
        hoverBackgroundColor: 'yellow',  // Color when hovered
        borderColor: 'black',  // Border color
        
      }
    ]
  };
}
