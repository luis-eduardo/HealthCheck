import { Component, OnInit } from '@angular/core';
import { ConnectionService, ConnectionServiceOptions } from 'ngx-connection-service';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'HealthCheck';
  public isOffline: Observable<boolean>;

  constructor(private connectionService: ConnectionService) {
    const options: ConnectionServiceOptions = {
      enableHeartbeat: true,
      heartbeatUrl: environment.baseUrl + 'api/heartbeat',
      heartbeatInterval: 10000,
      requestMethod: "head"
    };
    this.connectionService.updateOptions(options);
    this.isOffline = this.connectionService.monitor()
      .pipe(map(state => !state.hasNetworkConnection || !state.hasInternetAccess));
    ;
  }
}
