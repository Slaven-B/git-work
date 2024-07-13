import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService, Post } from '../../services/post.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  post: Post | null = null;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute, 
    private postService: PostService, 
    private location: Location) { 

    }

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.postService.getPostById(Number(postId)).subscribe((post) => {
        this.post = post;
        this.isLoading = false;
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}