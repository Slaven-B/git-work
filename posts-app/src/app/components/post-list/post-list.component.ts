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

  filteredPosts: Post[] = [];
  searchQuery: string = '';

  constructor(
    private postService: PostService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.filteredPosts = posts;
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

  filterPosts(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredPosts = this.posts.filter(post => post.title.toLowerCase().includes(query));
  }
}