import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Result {
  checks: Check[]
  totalStatus: string;
  totalResponseTime: number;
}

interface Check {
  name: string;
  status: string;
  responseTime: number;
  description: string;
}

@Component({
  selector: 'app-health-check',
  standalone: false,
  templateUrl: './health-check.component.html',
  styleUrl: './health-check.component.scss'
})
export class HealthCheckComponent implements OnInit {
  public result?: Result;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Result>(environment.baseUrl + 'api/health').subscribe(
      result => {
        this.result = result;
      },
      error => console.error(error)
    );
  }
}
