import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService, Post } from '../../services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  post: Post | null = null;
  isLoading: boolean = true;

  posts: Post[] = [];
  currentIndex: number = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
      this.loadPost();
    });
  }

  loadPost(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.postService.getPostById(Number(postId)).subscribe((post) => {
        this.post = post;
        this.currentIndex = this.posts.findIndex(p => p.id === post.id);
        this.isLoading = false;
      });
    } else {
      this.snackBar.open('Error loading post details', 'error', {
        duration: 2000,
      });
      this.isLoading = false;
    }
  }

  goNext(): void {
    if (this.currentIndex < this.posts.length - 1) {
      const nextPost = this.posts[this.currentIndex + 1];
      this.router.navigate(['/posts', nextPost.id]).then(() => {
        this.loadPost();
      });
    }
  }

  goPrev(): void {
    if (this.currentIndex > 0) {
      const prevPost = this.posts[this.currentIndex - 1];
      this.router.navigate(['/posts', prevPost.id]).then(() => {
        this.loadPost();
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/posts']);
  }
}