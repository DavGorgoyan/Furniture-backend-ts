import { Router } from "express";
import {
    getSliderImagesController,
    getRandomFurnitureInAboutController,
    getAllFurnitureController,
    getRandomFurnitureController,
    getCategoriesController,
    getFilteredFurnituresController,
    getMenuInfoFurnitureController,
    getMenuNavigationCintroller
} from "../controllers/app";
import Crud from "../lib/crud";
const router = Router();

const furnitureCrud = new Crud("furniture");
furnitureCrud.columns = ['id', 'image'];


router.get("/furnitures", getSliderImagesController);
router.get("/ourFurnitures", getRandomFurnitureInAboutController);
router.get("/furnitures/all", furnitureCrud.get);
router.get("/randFurniture", getRandomFurnitureController);
router.get("/categories", getCategoriesController);
router.get("/furnitures/filter/:id", getFilteredFurnituresController);
router.get("/menu", getMenuInfoFurnitureController);
router.get("/menu/navigation/:id", getMenuNavigationCintroller)

export default router;
