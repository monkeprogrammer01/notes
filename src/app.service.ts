import { Injectable, NotFoundException } from '@nestjs/common';

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
    const note = this.notes.find((item) => item.id === id);
    if (!note) {
      throw new NotFoundException();
    }
    return note;
  }

  deleteNote(id: number) {
    const index = this.notes.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException();
    }
    const [removed] = this.notes.splice(index, 1);
    return removed;
  }
}
