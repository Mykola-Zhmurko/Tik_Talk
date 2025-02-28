import { Component, inject } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ProfileComponent } from '../../common-ui/profile-card/profile-card.component';
import { ProfileFiltersComponent } from "./profile-filters/profile-filters.component"; 
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileComponent,
    ProfileFiltersComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
})
export class SearchPageComponent {
  profileService = inject(ProfileService);
  profiles = this.profileService.filteredProfiles;



  constructor() {
   
  }
}
