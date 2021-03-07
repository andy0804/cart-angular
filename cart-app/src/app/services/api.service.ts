import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from './shared.service';

@Injectable()
export class ApiService {
  constructor(
    private httpRequest: HttpClient,
    private router: Router,
    private sharedService: SharedService
  ) {}

  public getRequest(url: string): any {
    this.sharedService.notifySpinner({ flag: true });

    return new Promise((resolve, reject) => {
      const Headers: any = new HttpHeaders();
      Headers.append('Content-Type', 'Application/json');
      this.httpRequest
        .get(url, { headers: Headers, observe: 'response' })
        .subscribe(
          (data) => {
            if (data.status !== 200) {
              this.sharedService.notifySpinner({ flag: false });
              console.log('error occured');
            } else {
              this.sharedService.notifySpinner({ flag: false });

              resolve(data.body);
            }
          },
          (error) => {
            const err: any = error;
            this.sharedService.notifySpinner({ flag: false });

            resolve(err);
          }
        );
    });
  }
}
