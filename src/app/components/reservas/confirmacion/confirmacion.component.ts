import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})
export class ConfirmacionComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    const source = timer(5000);
    const subscribe = source.subscribe(val => {
      this.router.navigate(['/home']);
    });
  }

}
