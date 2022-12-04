import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/api/auth/auth.service';
import { FieldService } from 'src/app/core/services/field.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public hide: boolean = true;
  public fields: any = [
    {
      "name": "email",
      "label": "Email",
      "value": "akash@sociosafety.com"
    },
    {
      "name": "password",
      "label": "password",
      "value": "12345"
    }
  ];

  constructor(
    private authService: AuthService, 
    private fieldService: FieldService, 
    private storage: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login = () => {
    const service = this.fieldService.setFields(this.fields);
    if (service.validate().getErrorsCount() > 0) {
      service.setToastr();
      return;
    }

    // const params: any = service.getJsonData();

    const params: any = {
      email: "aakash5792@gmail.com",
      password: "AAbb12"
    }

    const response = this.authService.login(params);

    const success = (res: any) => {
      if (res && res.status && res.data) {
        // this.storage.set('user', res.data.user);
        this.storage.set('tokens', res.data.tokens);
        this.router.navigate(['main/society/dashboard']);
      }

    }
    response.subscribe(success);
  }

}
