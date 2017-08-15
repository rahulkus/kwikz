import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './common/auth.guard.component';
import { SellComponent } from './sell/sell.component';
import { CarpostsComponent } from './carposts/carposts.component';
import { PostblocksComponent } from "./postblocks/postblocks.component";

export const routes: Routes = [
  { path: '',       component: HomeComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'sell',   component: SellComponent },
  { path: 'carposts', component: CarpostsComponent },
  { path: 'postblocks', component: PostblocksComponent },
  { path: 'home',   component: HomeComponent/*, canActivate: [AuthGuard] */},
  { path: '**',     component: HomeComponent },
];