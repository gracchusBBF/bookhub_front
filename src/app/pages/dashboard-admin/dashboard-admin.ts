import { Component } from '@angular/core';
import { UserViewer } from '../../components/user-viewer/user-viewer';
import { MatTabGroup } from '@angular/material/tabs';
import { MatTab } from '@angular/material/tabs';
import { LibrairyView } from '../../components/librairy-view/librairy-view';

@Component({
  selector: 'app-dashboard-admin',
  imports: [UserViewer, MatTabGroup, MatTab, LibrairyView],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css',
})
export class DashboardAdmin {



}
