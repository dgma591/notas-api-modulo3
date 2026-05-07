import categoriesModel from "./categories.model";

export default class NoteMongoRepository {

    async save(noteEntity) {

        const note = new noteModel({
            title: noteEntity.title,
            content: noteEntity.content,
            imageUrl: noteEntity.imageUrl,
            isPrivate: noteEntity.isPrivate,
            password: noteEntity.password,
            userId: noteEntity.userid,
            categoryId: noteEntity.categoryId
        });

        const savedNote = await note.save();
        return savedNote.toObject();
    }

    async findByUserId(userId) {
        return await noteModel.find({ userId });
    }

    async findById(id){
        return await noteModel.findById(id);
    }
}