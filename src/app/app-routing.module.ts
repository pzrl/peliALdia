import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { FormularioComponent } from './formulario/formulario.component';
import { LoginComponent } from './login/login.component';
import { CineComponent } from './cine/cine.component';
import { BusquedasComponent } from './busquedas/busquedas.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'usuario/:idUsuario', component: UsuarioComponent },
  { path: 'pelicula/:idPelicula', component: PeliculaComponent },
  { path: 'cine/:idCine', component: CineComponent },
  { path: 'formulario', component: FormularioComponent },
  { path: 'busqueda/:consulta', component: BusquedasComponent },
  { path: '**', redirectTo: '/main' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
