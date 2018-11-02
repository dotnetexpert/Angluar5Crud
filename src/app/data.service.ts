import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Http ,HttpModule} from '@angular/http';
// import { Http ,HttpModule} from '@angular/http';
@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }
  getPosts() {
    debugger;
    //return this.http.get('https://jsonplaceholder.typicode.com/posts'); 
    return [];
  }
  addPost(post) {
    return this.http.post('https://jsonplaceholder.typicode.com/posts', post);
   
  }
}

