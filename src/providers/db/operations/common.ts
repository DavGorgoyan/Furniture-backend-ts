import { TTransactionParam, TDictionary } from './../../../lib/types';
import { format, ResultSetHeader } from "mysql2";
import db from "..";
import { _WRONG_PARAMS_ } from './../../../helpers/error-codes';

const operations: {
  getOne: (tableName: string, value: string | number, key?: string) => Promise<any>,
  exec: (query: string, params?: (string | number | TDictionary | (string | number | TDictionary)[])[], isCrud?: boolean) => Promise<any>,
  select: (tableName: string, columns: string[] | `*`, condition?: TDictionary) => Promise<any[]>,
  insert: {
    (tableName: string, data: TDictionary | TDictionary[], getQuery?: false): Promise<{ insertId?: number, message: string }>
    (tableName: string, data: TDictionary | TDictionary[], getQuery: true): Promise<string>
  },
  update: (tableName: string, data: TDictionary, condition?: TDictionary, getQuery?: boolean) => Promise<{ message: string } | string>,
  remove: (tableName: string, condition: TDictionary, getQuery?: boolean) => Promise<{ message: string } | string>

} = {
  async getOne(tableName, value, key = "id") {
    const items = await this.exec("SELECT * FROM ?? WHERE ??=?;", [tableName, key, value]);

    if (items.length > 0)
      return items[0];
    throw _WRONG_PARAMS_;
  },
  async exec(query, params, isCrud = false) {
    if (params && params.length > 0) {
      query = format(query, params);
    }
    if (query.indexOf(`WHERE`) != -1 && isCrud) {
      let tmp = query.split(`WHERE`);

      tmp[1] = tmp[1].replace(/\,/gi, ` AND`);
      query = tmp.join(`WHERE`);
    }
    try {
      console.log(`exec query `, query);

      const sqlData = await db.query(query);
      return sqlData[0];
    } catch (err) {
      throw {
        errCode: (err as unknown & { errno: any }).errno,
        errMessage: (err as unknown & { sqlMessage: string }).sqlMessage,
        isSql: true
      }
    }

  },
  async select(tableName, columns, condition) {
    let isColumnsАvailable = Array.isArray(columns);
    let query = `SELECT ${isColumnsАvailable ? '??' : '*'} FROM ?? ${condition ? `WHERE ? ;` : `;`}`;

    const formatParams: any[] = [tableName];
    if (isColumnsАvailable) formatParams.unshift(columns);
    if (condition) formatParams.push(condition);

    const data = await this.exec(query, formatParams, true);
    return data;
  },
  async insert(tableName: string, data: TDictionary | TDictionary[], getQuery?: boolean): Promise<any> {
    if (!Array.isArray(data)) data = [data];

    let query = `INSERT INTO ?? ( ?? ) VALUES `;

    for (let i = 0; i < data.length; i++)
      query += `( ? ), `;

    query = query.slice(0, query.lastIndexOf(`,`));
    const formatParams = [tableName, Object.keys(Array.isArray(data) ? data[0] : data[0]), ...data.map((el: any) => Object.values(el))];

    if (getQuery) return format(query, formatParams)
    const { insertId } = await this.exec(query, formatParams, true);

    return { insertId, message: `Տվյալները ավելացվեցին հաջողությամբ` }
  },
  async update(tableName, data, condition, getQuery) {
    const query = `UPDATE ?? SET ? ${condition ? `WHERE ? ;` : `;`}`;

    const formatParams: any[] = [tableName, data];
    if (condition) formatParams.push(condition);

    if (getQuery) return format(query, formatParams)
    await this.exec(query, formatParams, true);
    return {
      message: `Տվյալները փոխվեցին հաջողությամբ`
    }
  },
  async remove(tableName, condition, getQuery) {
    const query = `DELETE FROM ?? WHERE ? `;
    if (getQuery)
      return format(query, [tableName, condition]);
    await this.exec(query, [tableName, condition], true);

    return {
      message: `Տվյալները ջնջվեցին հաջողությամբ`
    }
  },
}
export default operations;
