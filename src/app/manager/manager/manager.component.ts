import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Reportee} from '../../model/reportee';
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent implements OnInit {
  reportees: Reportee[] = [
    { id: "raza", name: 'Abbas Raza' },
    { id: "ramana", name: 'Ramana Rao' },
    { id: "ankit", name: 'Ankit' },
    { id: "deepa", name: 'Deepa' },
    { id: "savitha", name: 'Savitha' },
    { id: "hemanth", name: 'Hemanth' },
  ];

  selectedReportee: Reportee | null = null;


  constructor(private router: Router) {}

  ngOnInit(): void {}

  onReporteeSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedId = selectElement.value;
    this.selectedReportee = this.reportees.find(reportee => reportee.id === selectedId) || null;
  }

  onApprove(): void {
    if (this.selectedReportee) {
      this.router.navigate(['/approve', this.selectedReportee.id]);
    }
  }
  getTimeSheet(){
    if (this.selectedReportee) {
      this.router.navigate([this.selectedReportee.name, this.selectedReportee.id]);
    }
  }
}
