import { Component, OnInit } from '@angular/core';
import { PostService, Post } from '../../services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  isLoading = true;

  constructor(
    private postService: PostService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      complete: () => {
        this.isLoading = false;
      },
      error: (error) => {
        this.snackBar.open(error.message, 'error', {
          duration: 2000,
        });
        this.isLoading = false;
      }
    });
  }
}