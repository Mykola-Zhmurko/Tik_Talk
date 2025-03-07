import { Component, effect, inject, ViewChild } from '@angular/core';
import { ProfileHeaderComponent } from "../../common-ui/profile-header/profile-header.component";
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { ProfileService } from '../../services/profile.service';
import { AvatarUploadComponent } from "./avatar-upload/avatar-upload.component";
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    ReactiveFormsModule,
    RouterLink,
    SvgIconComponent,
    AvatarUploadComponent
],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css'
})
export class SettingsPageComponent {
[x: string]: any;
  fb = inject(FormBuilder)
  profileService = inject(ProfileService)

  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent

  form = this.fb.group({
    firstName: ['' , Validators.required],
    lastName: [this.profileService.me()?.username],
    username: [{value: '', disabled: true} , Validators.required],
    description: [''],
    stack: [''],
  })

  constructor(){
    effect(()=>{
      //@ts-ignore
      this.form.patchValue({
      ...this.profileService.me(),
      //@ts-ignore
        stack: this.mergeStack(this.profileService.me()?.stack)
    })
    });
  }

  ngAfterViewInit(){
    
  }

  onSave(){
    console.log('clicked', this.form)
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()

    if(this.form.invalid) return

    if(this.avatarUploader.avatar){
      firstValueFrom(this.profileService.uploadAvatar(this.avatarUploader.avatar))
    }

    //@ts-ignore
    firstValueFrom(this.profileService.patchProfile({
      ...this.form.value,
      stack: this.splitStack(this.form.value.stack)
    }))

  }


  splitStack(stack: string | null | string[] | undefined): string[] {

    if(!stack) return []
    if(Array.isArray(stack)) return stack

    return stack.split(',')

  }

  mergeStack(stack: string | null | string[] | undefined){

    if(!stack) return ''
    if(Array.isArray(stack)) return stack.join(',')
      
    return stack

  }

}
