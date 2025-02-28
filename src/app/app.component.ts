import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfilePageComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent {

  title(title: any) {
    throw new Error('Method not implemented.');
  }



}

