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
import { InComponent } from './in/in.component';
import { ErrorComponent } from './error/error.component';

/* , canActivate: [LoginGuard] */

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'in', component: InComponent, canActivate: [LoginGuard], children: [
      { path: 'main', component: MainComponent },
      { path: 'usuario/:idItem', component: UsuarioComponent },
      { path: 'pelicula/:idItem', component: PeliculaComponent },
      { path: 'cine/:idItem', component: CineComponent },
      { path: 'editarPerfil', component: EditarPerfilComponent },
      { path: 'busqueda/:consulta', component: BusquedasComponent },
      {
        path: 'perfil', component: CategoriasPerfilComponent, children: [
          { path: 'peliculas', component: MisPeliculasComponent },
          { path: 'amigos', component: MisAmigosComponent },
          { path: 'cines', component: MisCinesComponent }
        ]
      },
      { path: 'error404', component: ErrorComponent }
    ]
  },
  { path: '**', redirectTo: '/in/main' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
