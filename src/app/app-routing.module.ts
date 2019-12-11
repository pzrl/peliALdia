import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { CineComponent } from './cine/cine.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { CategoriasPerfilComponent } from './categorias-perfil/categorias-perfil.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { MisPeliculasComponent } from './mis-peliculas/mis-peliculas.component';
import { MisAmigosComponent } from './mis-amigos/mis-amigos.component';
import { MisCinesComponent } from './mis-cines/mis-cines.component';
import { LoginGuard } from './login.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent/* , canActivate: [LoginGuard] */ },
  { path: 'usuario/:idItem', component: UsuarioComponent/* , canActivate: [LoginGuard]  */ },
  { path: 'pelicula/:idItem', component: PeliculaComponent/* , canActivate: [LoginGuard] */ },
  { path: 'cine/:idItem', component: CineComponent/* , canActivate: [LoginGuard] */ },
  { path: 'registro', component: RegistroComponent },
  { path: 'editarPerfil', component: EditarPerfilComponent/* , canActivate: [LoginGuard] */ },
  { path: 'busqueda/:consulta', component: BusquedasComponent/* , canActivate: [LoginGuard] */ },
  {
    path: 'perfil', component: CategoriasPerfilComponent/* , canActivate: [LoginGuard] */, children: [
      { path: 'peliculas', component: MisPeliculasComponent },
      { path: 'amigos', component: MisAmigosComponent },
      { path: 'cines', component: MisCinesComponent }
    ]
  },
  { path: '**', redirectTo: '/main' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
