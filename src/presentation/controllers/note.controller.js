export default class NoteController {
    constructor(noteService){
        this.noteService = noteService;
    }

    createNote = async (req, res) => {
        const data = req.body;
        if(req.file) data.imageUrl = '/uploads/'+req.file.filename; // Assuming the file path is stored in the request object
        data.userId = 'user_123'; // Assuming user ID is available in the request object
        try {
            const newNote = await this.noteService.createNote(noteData);
            res.status(201).json(newNote);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    getNotesByUserId = async (req, res) => {
        const userId = 'user_123'; // Assuming user ID is available in the request object
        try {
            const notes = await this.noteService.getNotesByUserId(userId);
            res.status(200).json(notes);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}