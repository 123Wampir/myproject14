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
    for (let i in this.notes) {
      if (note.id == this.notes[i].id) {
        this.notes.splice(parseInt(i), 1);
        this.createNote(note);
        console.log(note);
        console.log(this.notes);
        this.onEdit = false;
      }
    }
  }
  constructor() { }
}
