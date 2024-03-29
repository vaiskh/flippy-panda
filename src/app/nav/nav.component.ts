import { Component, AfterViewInit } from '@angular/core'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { Observable } from 'rxjs'
import { map, shareReplay } from 'rxjs/operators'
import { DataService } from '../#services/data.service'
import { Data } from '../interfaces'
import {
  faCat,
  faPlus,
  faEdit,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor(
    private breakpointObserver: BreakpointObserver,
    public dataService: DataService
  ) {
    this.data = dataService.data
  }
  data: Data
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    )
  faCat = faCat
  faPlus = faPlus
  faEdit = faEdit
  faTimes = faTimes

  readLocalStorageValue() {
    return localStorage.getItem('flippyPanda')
  }

  closeBanner = () =>
    this.dataService.setData({ ...this.dataService.getData() })
}
