import { Component, Input } from "@angular/core"
import { Profile } from "../../services/interfaces/profile.interface"; 
import { ImgUrlPipe } from "../../helpers/img-url.pipe"; 

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileComponent {
  @Input() profile!: Profile ; //! stellt man, wenn man unbedingt weisst, dass es man haben wird, und ? wenn nicht sicher
}

