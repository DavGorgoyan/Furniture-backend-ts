import operations from "../common";

export default {
    furnitures_for_sliders: () => {
        return operations.exec(
            "SELECT f.`id`,f.`image` FROM furniture f " +
            "LEFT JOIN categories c ON f.`category_id` = c.`id` " +
            "WHERE c.`parent_id` IS NOT NULL " +
            "ORDER BY RAND() " +
            "LIMIT 9;"
        );
    },

    random_funrniture_in_about: () => {
        return operations.exec(
            "SELECT id,image FROM furniture " +
            "ORDER BY RAND() " +
            "LIMIT 3; "
        )
    },

    pass_all_furnitures: (page: number, rowsPerPage: number) => {
        return operations.exec(
            "SELECT id,image FROM furniture " +
            "LIMIT ?,?", [(page - 1) * rowsPerPage, +rowsPerPage]
        )
    },

    random_furniture: () => {
        return operations.exec(
            "SELECT id,image FROM furniture " +
            "ORDER BY RAND() " +
            "LIMIT 3; "
        )
    },

    async filtered_furnitures(page: number, rowsPerPage: number, id: number) {
        const filterQuery = await operations.exec("SELECT id, image FROM furniture " +
            "WHERE category_id IN (SELECT id FROM categories WHERE parent_id = ? UNION SELECT ? id) " +
            "LIMIT ?,?;", [id, id, (page - 1) * rowsPerPage, +rowsPerPage])

        const pageCountQuery = await operations.exec("SELECT c.title,CEIL(COUNT(f.id) / ?) AS pageCount FROM furniture f " +
            "LEFT JOIN categories c ON f.category_id = c.id " +
            "WHERE category_id IN (SELECT id FROM categories WHERE parent_id = ? UNION SELECT ? id); ", [rowsPerPage, id, id, (page - 1) * rowsPerPage, +rowsPerPage]);

        return [filterQuery, pageCountQuery];
    },

    menu_navigatoin: (page: number, rowsPerPage: number, id: number) => {

        return operations.exec("SELECT * FROM furniture " +
            "WHERE category_id IN (SELECT id FROM categories WHERE parent_id = ? ) " +
            "LIMIT ?,?;", [id, (page - 1) * rowsPerPage, +rowsPerPage])
    },

    menu_info() {
        return operations.exec(
            "SELECT id,title FROM categories " +
            "WHERE parent_id IS NULL;")
    }
};



