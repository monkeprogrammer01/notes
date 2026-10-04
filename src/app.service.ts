import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private notes: { id: number; text: string }[] = [];
  private nextId = 1;
  getHello(): string {
    return 'Hello World!';
  }
  createNote(text: string) {
    const note = {id: this.nextId, text};
    this.notes.push(note);
    this.nextId += 1;
    return note;
  }
  listNotes() {
    return this.notes;
  }
  getNote(id: number) {
    return this.notes[id];
  }
}
