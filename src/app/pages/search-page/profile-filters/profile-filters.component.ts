import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import { debounceTime, switchMap } from 'rxjs';

@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.css'
})
export class ProfileFiltersComponent {
  fb = inject(FormBuilder)
  profileService = inject(ProfileService)

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });

  constructor(){
    this.searchForm.valueChanges
    .pipe(
      debounceTime(300),//es wartet Zeit in mls, nachdem was geschrieben wird und nur dann schickt req
      switchMap(formValue => {
        return this.profileService.filterProfiles(formValue)
      })
    )
    .subscribe()
  }
}
