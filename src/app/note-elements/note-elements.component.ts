import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from '../shared/note.model';
import { MyNotesService } from '../shared/services/my-notes.service';

@Component({
  selector: 'app-note-elements',
  templateUrl: './note-elements.component.html',
  styleUrls: ['./note-elements.component.css']
})
export class NoteElementsComponent implements OnInit {

  constructor(
    private MyNotesService: MyNotesService,
  ) { }
  @Input() notes: Note[] = [];

  @Output() DeleteNote = new EventEmitter<number>();
  @Output() ChangeNote = new EventEmitter<number>();

  ngOnInit(): void {
  }


  getOnEdit() {
    return this.MyNotesService.onEdit;
  }

  onDeleteNote(note: Note) {
    console.log(this.MyNotesService.notes);
    this.DeleteNote.emit(note.id);
  }
  onChangeNote(id: number) {
    this.ChangeNote.emit(id);
    for (let i in this.notes) {
      if (id == this.notes[i].id)
        this.MyNotesService.noteToChange = this.notes[i];
      this.MyNotesService.onEdit = true;
    }
  }
}
