import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  token_data : any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getapikey();
  }

  getapikey(){
    const token = localStorage.getItem('token');
    if(token){
      try{
        this.token_data = jwt_decode(token);
      } catch (err){
        console.log(err);
        this.router.navigate(['/home']);
      }
    } else {
      this.router.navigate(['/home']);
    }
  }

}
