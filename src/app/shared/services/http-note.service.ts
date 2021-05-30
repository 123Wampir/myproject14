import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from '../note.model';

@Injectable({
  providedIn: 'root'
})
export class HttpNoteService {


  source="http://localhost:3000/notes";
  constructor(private http:HttpClient) { }


  getNotes() : Promise<any>{
    return this.http.get(this.source).toPromise();
  }

  postNote(data:Note){
    return this.http.post<Note>(this.source,data).toPromise();
  }
  putNote(data:Note){
    return this.http.put<Note>(`${this.source}/${data.id}`,data).toPromise();
  }
  deleteNote(id:number){
    return this.http.delete(`${this.source}/${id}/`).toPromise();
  }
}
