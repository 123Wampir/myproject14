import { Injectable } from '@angular/core';
import { Note } from '../note.model';

@Injectable({
  providedIn: 'root'
})
export class MyNotesService {
  notes: Note[] = [new Note("first", "first")];
  onEdit = false;
  noteToChange: Note = new Note("", "");



  createNote(note: Note) {
    this.notes.push(note);
  }


  updateNote(note: Note) {
    let i = this.notes.findIndex(item => note.id === item.id);
    this.notes.splice(i, 1);
    this.createNote(note);
    console.log(note);
    console.log(this.notes);
    this.onEdit = false;
      }
  constructor() { }
}
