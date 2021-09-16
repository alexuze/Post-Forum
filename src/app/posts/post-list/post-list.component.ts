import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service.ts';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  totalPosts = 0;
  pageSizeOptions = [1, 2, 5, 10];
  postsPerPage = 2;
  currentPage = 1;
  userIsLoggedIn = false;
  userId: string;

  posts: Post[] = [];
  private postsSub: Subscription;
  private authStatusSub: Subscription;
  isLoading = false;
  /*
  this can be achieved by using public before postService and angular will automatically assign this variable
  with the parameter

  postsService : PostsService;
  constructor(postsService : PostsService){
    this.postsService = postsService;
  }

  */

  // like this: this will create a new property called postsService and will assign it to the parameter
  constructor(
    public postsService: PostsService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[]; maxPosts: number }) => {
        this.isLoading = false;
        this.posts = postData.posts;
        this.totalPosts = postData.maxPosts;
      });
    this.userIsLoggedIn = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuth) => {
        this.userIsLoggedIn = isAuth;
        this.userId = this.authService.getUserId();
      });
  }
  ngOnDestroy() {
    // this makes sure that when the component is destroyed the subscription also ends and prevents memory leaks
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(
      () => {
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.postsPerPage = pageData.pageSize;
    this.currentPage = pageData.pageIndex + 1;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }
}
