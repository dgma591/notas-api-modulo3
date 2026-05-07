import { Router } from "express";
import NoteController from "../controllers/note.controller.js";
import NoteService from "../../application/use-cases/note.service.js";
import NoteMongoRepository from "../../infraestructure/datebase/mongo/note.mongo.repository.js";
import NoteMySQLRepository from "../../infraestructure/datebase/mysql/note.mysql.repository.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const noteMongoRepository = new NoteMongoRepository();
//const noteMySQLRepository = new NoteMySQLRepository();
const noteService = new NoteService(noteMongoRepository); // Cambia a noteMySQLRepository si quieres usar MySQL
const router = Router();
const noteController = new NoteController(noteService);
router.get(
    '/:id/public',
    noteController.getPublicNote
);
router.use(authMiddleware);
router.post(
    '/',
    noteController.createNote
);

router.get(
    '/',
    noteController.getNotesByUserId
);
router.post("/", authMiddleware, upload.single('image'), noteController.createNote);
router.get("/", authMiddleware, noteController.getNotesByUser);

export default router;
