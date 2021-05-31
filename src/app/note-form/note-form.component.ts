import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Note } from 'src/app/shared/note.model'
import { MyNotesService } from '../shared/services/my-notes.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnInit {

  noteForm:FormGroup=new FormGroup({
    noteTitle:new FormControl(null,[Validators.required]),
    noteText:new FormControl()
  });

  constructor(
    private MyNotesService: MyNotesService,
    ) { }

  @Input() note: Note = new Note("", "");
  @Output() CreateNote=new EventEmitter<Note>();
  @Output() ChangeNote=new EventEmitter<Note>();


  getOnEdit(){
    return this.MyNotesService.onEdit;
  }
  ngOnInit(): void {
  }

  onCreateNote() {
    if (this.noteForm.value!=0) {
      let note = new Note(this.noteForm.value["noteTitle"],this.noteForm.value["noteText"]);
      this.noteForm.value["noteCreateDate"]=note.noteCreateDate;
      this.noteForm.value["noteCreateTime"]=note.noteCreateTime;
      //this.noteForm.value["id"]=note.noteID;
      console.log(this.noteForm.value);
      this.CreateNote.emit(this.noteForm.value);
      console.log(this.MyNotesService.notes);
      this.clearData();
    }
    else alert("Название заметки обязательное поле");
  }
  clearData() {
    this.note.noteTitle = "";
    this.note.noteText = "";
  }
  onChangeNote() {
    console.log(this.note);
    if (this.noteForm.value!=0) {
      let note = new Note(this.noteForm.value["noteTitle"],this.noteForm.value["noteText"]);
      this.noteForm.value["noteCreateDate"]=this.note.noteCreateDate;
      this.noteForm.value["noteCreateTime"]=this.note.noteCreateTime;
      this.noteForm.value["id"]=this.note.id;
      console.log(this.noteForm.value);
      this.ChangeNote.emit(this.noteForm.value);
      console.log(this.MyNotesService.notes);
      this.clearData();
    }
    else alert("Название заметки обязательное поле");
  }
}
