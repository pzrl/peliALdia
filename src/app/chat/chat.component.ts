import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  token: any;
  id: number;
  usuario: {};
  categoria: string;
  urlCompleta: string;

  formulario: FormGroup;
  arrPosts: any;
  subscripcion: Subscription;

  editable: number;
  edicion: boolean;
  textoAEditar: string;
  idTextoEditado: number;

  constructor(
    private chatService: ChatService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.formulario = new FormGroup({ post: new FormControl });
    this.arrPosts = [];
    this.token = localStorage.token_peliALdia;
    this.urlCompleta = this.activatedRoute['_routerState'].snapshot.url;
  }

  ngOnInit() {
    this.edicion = false;

    this.subscripcion = this.activatedRoute.params.subscribe(async (params) => {
      this.id = params.idItem;

      this.categoria = this.urlCompleta.split(/[/]/)[2];

      this.chatService.getChat(this.categoria, this.token, this.id)
        .then(res => {
          this.editable = res.id;
          this.arrPosts = res.posts;
        });
    });
  }

  onSubmit() {
    const post = {
      post: this.formulario.value.post,
      idItem: this.id,
      token: this.token,
      categoria: this.categoria
    };
    this.chatService.savePost(post)
      .then(res => {
        this.router.navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate([this.urlCompleta]));
      });
  }

  onDelete(pId) {
    const body = {
      idPost: pId,
      categoria: this.categoria
    };
    this.chatService.deletePost(body)
      .then(res => {
        this.router.navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate([this.urlCompleta]));
      });
  }

  onEdit(pTexto, pId) {
    this.textoAEditar = pTexto;
    this.edicion = true;
    this.idTextoEditado = pId;
    console.log(document.getElementsByClassName('principal'))
    const altura = document.getElementsByClassName('principal').item(0).clientHeight;
    scrollTo(0, altura);
  }

  onConfrimEdit(pPostEditado) {
    const body = {
      id: this.idTextoEditado,
      categoria: this.categoria,
      post: pPostEditado
    };
    this.chatService.editPost(body)
      .then(res => {
        this.router.navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([this.urlCompleta]);
            this.edicion = false;
          });
      });
  }

  onCancelEdit() {
    this.edicion = false;
    this.textoAEditar = '';
  }

}
