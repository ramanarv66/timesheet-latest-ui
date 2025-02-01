import { Component, DoCheck, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Student } from '../student/student';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent implements DoCheck, OnChanges{
  ngDoCheck(): void {
    console.log('Child ngDocheck')
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Child ngOChanges')
  }

  @Input() varValue!: string;

}
