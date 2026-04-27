import NoteEntity from "../../domain/entities/note.entity";

export default class NoteService {
    constructor(noteRepository) {
        this.noteRepository = noteRepository;
    }

    async createNote(data) {
        if(!data.title || !data.content){
            throw new Error('Title content are required');
        }

        const note = new NoteEntity(data);
        return await this.noteRepository.save(note);
    }

    async getNoteByUser(userId) {
        return await this.noteRepository.findByUserId(userId);
    }

    async updateNote(id, data) {
        if (!id) {
            throw new Error('Note ID is required');
        }

        const existingNote = await this.noteRepository.findById(id);
        if (!existingNote) {
            throw new Error('Note not found');
        }

        existingNote.title = data.title ?? existingNote.title;
        existingNote.content = data.content ?? existingNote.content;

        return await this.noteRepository.update(id, existingNote);
    }

    async deleteNote(id) {
        if (!id) {
            throw new Error('Note ID is required');
        }

        const existingNote = await this.noteRepository.findById(id);
        if (!existingNote) {
            throw new Error('Note not found');
        }

        return await this.noteRepository.delete(id);
    }
}
