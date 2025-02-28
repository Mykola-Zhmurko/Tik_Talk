import { Component, inject } from '@angular/core';
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { ProfileService } from '../../services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SubscriberCardComponent } from "../../common-ui/sidebar/subscriber-card/subscriber-card.component";
import { ImgUrlPipe } from "../../helpers/img-url.pipe";
import { PostFeedComponent } from "./post-feed/post-feed.component";


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    RouterLink,
    NgFor,
    SvgIconComponent,
    SubscriberCardComponent,
    ImgUrlPipe,
    PostFeedComponent
],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})  
export class ProfilePageComponent {

  profileService  = inject(ProfileService)
  route = inject(ActivatedRoute)
  me$ = toObservable(this.profileService.me)
  subscribers$ = this.profileService.getSubscribersShortList(5)



  profile$ = this.route.params
  .pipe(
    switchMap(({id})=>{
      if(id === 'me') return this.me$

        return this.profileService.getAccount(id)
    })
  )
menuItems: any;

}
