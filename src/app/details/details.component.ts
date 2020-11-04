import { Component, OnInit } from '@angular/core';
import {DataService} from '../shared/data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  private photoId: string;
  photoDetails: any;

  constructor(private dataService: DataService,
              private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.photoId = params.photoId;
      this.dataService.getDetails(this.photoId).subscribe(photo => {
        this.photoDetails = photo;
      });
    });
  }
}
