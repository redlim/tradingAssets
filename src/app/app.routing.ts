import { Routes, RouterModule } from '@angular/router';
import { AssetsComponent } from './assets/assets.component';
import { AssetDetailComponent } from './assets/assets.detail.component';

const appRoutes = [
  { path: 'asset/:id', component: AssetDetailComponent,  },
  { path: 'assets', component: AssetsComponent },
  { path: '', redirectTo: 'assets', pathMatch: 'full' }
]
export const routing = RouterModule.forRoot(appRoutes);
