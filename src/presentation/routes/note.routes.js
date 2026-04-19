import { Router } from "express";
import NoteController from "../controllers/note.controller.js";
import NoteService from "../../application/use-cases/note.service.js";
import NoteMongoRepository from "../../infraestructure/datebase/mongo/note.mongo.repository.js";
import NoteMySQLRepository from "../../infraestructure/datebase/mysql/note.mysql.repository.js";

const noteMongoRepository = new NoteMongoRepository();
//const noteMySQLRepository = new NoteMySQLRepository();
const noteService = new NoteService(noteMongoRepository); // Cambia a noteMySQLRepository si quieres usar MySQL
const router = Router();
const noteController = new NoteController(noteService);

router.post("/notes", upload.single('image'), noteController.createNote);
router.get("/notes", noteController.getNotesByUser);

export default router;
