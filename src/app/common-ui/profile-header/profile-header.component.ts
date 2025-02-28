import { Component, input } from '@angular/core';
import { Profile } from '../../services/interfaces/profile.interface';
import { ImgUrlPipe } from "../../helpers/img-url.pipe";

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [
    ImgUrlPipe,
  ],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.css'
})
export class ProfileHeaderComponent {
  profile = input<Profile>()
}
