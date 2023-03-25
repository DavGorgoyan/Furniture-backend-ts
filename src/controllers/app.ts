import { createController } from '../lib';
import DbOperations from '../providers/db/operations';
const { app, common } = DbOperations;

export const getSliderImagesController = createController(async () => {
    const sqlData = await app.furnitures_for_sliders();
    return { items: sqlData };

})

export const getRandomFurnitureInAboutController = createController(async () => {
    const sqlData = await app.random_funrniture_in_about();
    return { items: sqlData }
})

export const getAllFurnitureController = createController(async (req) => {
    const { page = 1, rowsPerPage = 8 } = req.query;
    const sqlData = await app.pass_all_furnitures(+page, +rowsPerPage);
    return { items: sqlData }

})

export const getRandomFurnitureController = createController(async () => {
    const sqlData = await app.random_furniture();
    return { item: sqlData }

})

export const getCategoriesController = createController(async () => {
    const data = await common.select("categories", "*");
    const arr = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].parent_id === null) {
            data[i].subcategories = []
            for (let j = 0; j < data.length; j++) {
                if (data[j].parent_id === data[i].id) {
                    data[i].subcategories.push(data[j])
                }
            }
            arr.push(data[i])
        }
    }

    return { categories: arr }
})

export const getFilteredFurnituresController = createController(async (req) => {
    const { page = 1, rowsPerPage = 9 } = req.query;
    const sqlData = await app.filtered_furnitures(+page, +rowsPerPage, +req.params.id);

    return { items: sqlData[0], info: sqlData[1] }
})

export const getMenuInfoFurnitureController = createController(async () => {
    return { items: await app.menu_info() }
})

export const getMenuNavigationCintroller = createController(async (req) => {
    const { page = 1, rowsPerPage = 10 } = req.query;
    const sqlData = await app.menu_navigatoin(+page, +rowsPerPage, +req.params.id);
    return { item: sqlData }
})





