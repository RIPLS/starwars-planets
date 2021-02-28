import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  searchtext: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchtext = params['search'];
    });
  }

  onSearch() {
    if (this.searchtext) {
      this.router.navigate(['/'], { queryParams: { 'search': this.searchtext } });
    }
  }

}
