import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient)
  // constructor()
  { }
  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };


  posts$: any;
  post: object = { id: 0, title: "", userId: 1, body: "" };
  btnText: string = "Save";
  displayForm: boolean = false;
  ngOnInit() {
    this.getPosts().subscribe(data => {
      this.posts$ = data;
    });
  }
  getPosts() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
  newPost() {
    this.post = { title: "", userId: 1, body: "" };
    this.displayForm = true;
  }
  deletePost(event, post) {
    var posts = [];
    this.posts$.forEach(element => {
      if (element.id != post.id)
        return posts.push(element);
    });
    this.posts$ = posts;
  }
  saveUpdatePost(event, post) {
    if (post.id > 0) {
      this.posts$.forEach(element => {
        if (element.id == post.id) {
          element.title = post.title;
          element.body = post.body;
        }
      });
      this.displayForm = false;
    } else {
      return this.http.post('https://jsonplaceholder.typicode.com/posts', post).subscribe(data => {

        this.displayForm = false;
        this.addNewPost(post);
        this.post = { title: "", userId: 1, body: "" };
      });
    }
  }
  addNewPost(post) {
    this.btnText = "Save";
    this.posts$.push(post);
  }
  cancelPost() {
    this.displayForm = false;
  }
  editPost(event, post) {
    this.btnText = "Update";
    this.post = post;
    this.displayForm = true;
  }

}
