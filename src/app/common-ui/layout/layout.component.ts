import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ProfileComponent } from "../profile-card/profile-card.component";
import { SearchPageComponent } from "../../pages/search-page/search-page.component"; 
import { Profile } from '../../services/interfaces/profile.interface';
import { ProfileService } from '../../services/profile.service';




@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    ProfileComponent,
    SearchPageComponent,
],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})


export class LayoutComponent {
  profileService = inject(ProfileService);
  profiles: Profile[] = [];

  constructor() {
    this.profileService.getTestAccounts().subscribe((val) => {
      this.profiles = val;
    });
  }
}
  