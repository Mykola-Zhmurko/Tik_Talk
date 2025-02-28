import { Component, inject } from '@angular/core'; 
import { NgForOf } from '@angular/common';
import { SubscriberCardComponent } from "./subscriber-card/subscriber-card.component";
import { Router, RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { SvgIconComponent } from '../../pages/svg-icon/svg-icon.component'; 
import { AsyncPipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from "../../helpers/img-url.pipe";
import { Profile } from '../../services/interfaces/profile.interface';
import { CookieService } from 'ngx-cookie-service';
import { RouterLinkActive } from '@angular/router';



@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    NgForOf,
    SubscriberCardComponent,
    RouterLink,
    AsyncPipe,
    ImgUrlPipe,
    SvgIconComponent,
    RouterLinkActive
],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  profileService: ProfileService = inject(ProfileService)
  subscribers$ = this.profileService.getSubscribersShortList()//$ am Ende bedeutet, dass es ein Strim ist. Das ist ein Verabredung
  me = this.profileService.me
  cookieService = inject(CookieService)
  router = inject(Router)
  token: string | null = null
  refreshToken: string | null = null
  


  menuItems = [
  {
    label: "My page",
    icon: "home",
    link: "profile/me"
  },
  {
    label: "Chats",
    icon: "chats",
    link: "chats"
  },
  {
  label: "Search",
  icon: "search",
  link: "search"
  }
]
  subscribers!: Profile;


ngOnInit(){
  firstValueFrom(this.profileService.getMe())
}

logout(){
  this.cookieService.deleteAll()
  this.token = null
  this.refreshToken = null
  this.router.navigate(["/login"])
}


}



