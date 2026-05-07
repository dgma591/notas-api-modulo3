export default class NoteController {

    constructor(noteService){
        this.noteService = noteService;
    }

    createNote = async (req, res) => {

        const data = req.body;

        if(req.file){
            data.imageUrl = '/uploads/' + req.file.filename;
        }

        data.userId = 'user_123';

        try {

            const newNote = await this.noteService.createNote(data);

            res.status(201).json(newNote);

        } catch (error) {

            res.status(400).json({
                error: error.message
            });

        }
    }

    getNotesByUserId = async (req, res) => {

        const userId = 'user_123';

        try {

            const notes = await this.noteService.getNotesByUserId(userId);

            res.status(200).json(notes);

        } catch (error) {

            res.status(400).json({
                error: error.message
            });

        }
    }

    getPublicNote = async (req, res) => {

        try {

            const { id } = req.params;

            const note = await this.noteService.getNoteById(id);

            if(!note){
                return res.status(404).json({
                    message: 'Nota no encontrada'
                });
            }

            if(note.isPrivate){
                return res.status(403).json({
                    message: 'Esta nota es privada'
                });
            }

            return res.status(200).json(note);

        } catch (error) {

            return res.status(500).json({
                error: error.message
            });

        }
    }
}