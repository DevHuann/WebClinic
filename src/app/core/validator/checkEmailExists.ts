import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, switchMap, map, catchError } from 'rxjs/operators';
import {LandingPageService} from '../../landing-page/services/landing-page.service';


export function emailExistsValidator(landingPageService : LandingPageService): (control: AbstractControl) => Observable<ValidationErrors | null> {
  return (control: AbstractControl) => {
    return control.valueChanges.pipe(
      debounceTime(300), // Đợi user nhập xong
      switchMap(value => landingPageService.checkEmailExists(value)),
      map(isTaken => (isTaken ? { emailExists: true } : null)),

    );
  };
}
