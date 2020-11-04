import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../shared/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  photoList: any = [];

  constructor(private dataService: DataService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.dataService.getPhotoList().subscribe(list => {
      this.photoList = list.pictures;
    });
  }

  goDetails(photoId){
    this.router.navigate(['details'], {queryParams: {photoId}});
  }

}
