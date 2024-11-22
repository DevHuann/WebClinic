import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../models/loginRequest";
import {environment} from "../../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";
import {RegistrationRequest} from '../models/registrationRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient,   private jwtHelperService: JwtHelperService) { }
  login(loginRequest: LoginRequest) {
    return this.httpClient.post(`${environment.api_domain}/Authentication/login`, loginRequest);
  }
  registration(registrationRequest : RegistrationRequest){
    return this.httpClient.post(`${environment.api_domain}/Patient/PatientRegistration`,registrationRequest)
  }

  public token = () => {
    const token = sessionStorage.getItem('token') ?? '';
    return this.decodeToken(token);
  }

  public decodeToken = (rawToken: string) => this.jwtHelperService?.decodeToken(rawToken);
}
