import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  formulario: FormGroup;
  arrPosts: any;


  constructor(
    private chatService: ChatService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.formulario = new FormGroup({ post: new FormControl('', [Validators.required]) });
    this.arrPosts = [];
    this.token = localStorage.token_peliALdia;
  }

  ngOnInit() {
    this.id = this.activatedRoute.params['_value'].idItem;
    const urlCompleta = this.activatedRoute['_routerState'].snapshot.url;
    this.categoria = urlCompleta.split(/[/]/)[1];

    this.chatService.getChat(this.categoria, this.token, this.id)
      .then(res => {
        this.arrPosts = res;
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
          .then(() => this.router.navigate([this.categoria + '/' + this.id]));
      });

  }
}
