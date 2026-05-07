export default class CategoriesController {
    constructor(categoriesService){
        this.categoriesService = categoriesService;
    }

    createCategories = async (req, res) => {
        const data = req.body;
        data.id = '123'; // Assuming user ID is available in the request object
        try {
            const newCategories = await this.categoriesService.createCategories(categoriesData);
            res.status(201).json(newCategories);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    getCategoriesByUserId = async (req, res) => {
        const id = 'user_123'; // Assuming user ID is available in the request object
        try {
            const categories = await this.categoriesService.getCategoriesByUserId(id);
            res.status(200).json(categories);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}