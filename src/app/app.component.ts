import { Component, OnInit } from '@angular/core';
import { Note } from './shared/note.model';
import { HttpNoteService } from './shared/services/http-note.service';
import { MyNotesService } from './shared/services/my-notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public MyNotesService: MyNotesService,
    private HttpNoteService: HttpNoteService
  ) { }

  title = 'project14';
  notes: Note[] = [];
  noteToChange() {
    return this.MyNotesService.noteToChange;
  }


  ngOnInit() {
    this.getData();
    console.log("this.MyNotesService.notes");
  }
  async getData() {
    try {
      this.MyNotesService.notes = await this.HttpNoteService.getNotes();
    } catch (err) {
      console.error(err);
    } finally{console.log(this.MyNotesService.notes);}

    console.log(this.MyNotesService.notes);
  }
  async onCreateNote(note: Note) {
    try {
      await this.HttpNoteService.postNote(note);
    } catch (err) { console.error(err) }
    finally { this.getData(); }
  }

  async onDeleteNote(id:number){
    try {
      await this.HttpNoteService.deleteNote(id);
    } catch (err) { console.error(err) }
    finally {
      this.getData();
      console.log(this.MyNotesService.notes);
    }
  }

  async onChangeNote(note: Note) {
    try {
      await this.HttpNoteService.putNote(note);
      this.MyNotesService.onEdit=false;
    } catch (err) { console.error(err) }
    finally { this.getData(); }
  }

}
