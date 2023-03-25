import { _WRONG_PARAMS_ } from './../helpers/error-codes';
import { format } from 'mysql2';
import { createController } from ".";
import DbOperations from "../providers/db/operations";


type TFormatParams = (string | string[] | number)[];

export default class Crud {
    private getPaginationParams(qp: any, qrpp: any) {
        const page: number = Number.isNaN(parseInt((Array.isArray(qp) ? qp[0] : qp) + "" || "a")) ? 1 : parseInt((Array.isArray(qp) ? qp[0] : qp) + "" || "a");
        const rowsPerPage: number = Number.isNaN(parseInt((Array.isArray(qrpp) ? qrpp[0] : qrpp) + "" || "a")) ? 100 : parseInt((Array.isArray(qrpp) ? qrpp[0] : qrpp) + "" || "a");

        return [page, rowsPerPage]
    }


    columns?: string[]
    primaryKey?: string
    searchableColumns?: string[]

    constructor(private tableName: string) {
    }

    get = createController(async (req) => {
        let query = `SELECT ${this.columns ? '??' : '*'} FROM ?? `;
        const [page, rowsPerPage] = this.getPaginationParams(req.query.page, req.query.rowsPerPage);
        const params: TFormatParams = [this.tableName, (page - 1) * rowsPerPage, rowsPerPage];
        const pagesCountParams: TFormatParams = [rowsPerPage, this.tableName];

        if (req.query.query && this.searchableColumns) {
            query += format(`WHERE CONCAT(??) LIKE ? `, [this.searchableColumns, `%${req.query.query}%`]);
        }

        if (this.columns) {
            params.unshift(this.columns);
            pagesCountParams.splice(1, 0, this.columns);
        }

        const [items, pagesCount] = await Promise.all([
            DbOperations.common.exec(
                `${query} LIMIT ?, ?;`,
                params
            ),
            DbOperations.common.exec(`SELECT CEIL(COUNT(id)/?) AS count FROM (${query}) a`,
                pagesCountParams),
        ]);
        return { pagesCount: +pagesCount[0]?.count, items };
    })

    current = createController(async (req) => {
        return await DbOperations.common.getOne(this.tableName, req.params.id);
    })

    add = createController(async (req) => {
        const payload = req.body;
        return await DbOperations.common.insert(this.tableName, payload);
    })

    update = createController(async (req) => {
        const id = req.params.id;
        const payload = req.body;
        if (!Object.keys(payload).length) throw _WRONG_PARAMS_;
        return await DbOperations.common.update(this.tableName, payload, { [this.primaryKey || `id`]: id });
    })

    remove = createController(async (req) => {
        const id = req.params.id;
        return await DbOperations.common.remove(this.tableName, { [this.primaryKey || `id`]: id });
    })

}
