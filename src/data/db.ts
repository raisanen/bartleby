import PouchDB from 'pouchdb';
import { IBartlebyData } from './idata';

type DocTypeConverter<BT extends IBartlebyData> = (d: PouchDB.Core.AllDocsMeta|undefined) => BT;

export class DbHelper<BT extends IBartlebyData> {
    private _db: PouchDB.Database;
    private _callback: DocTypeConverter<BT>;
    
    constructor(dbName: string, callback: DocTypeConverter<BT>) {
        this._db = new PouchDB(dbName);
        this._callback = callback;
    }

    docoumentToType(d: PouchDB.Core.AllDocsMeta): BT {
        return this._callback(d);
    }

    async put(doc: BT) {
        return await this._db.put({...doc});
    }

    async update(doc: IBartlebyData & {_id: string}) {
        const resp = await this._db.get(doc._id);
        console.log(doc, resp);
        return await this._db.put({...resp, ...doc});
    }

    async get(id: string) : Promise<BT | undefined> {
        return (await this.getAll()).find((d) => d._id === id);
    }

    async getAll() : Promise<BT[]> {
        return await this._db.allDocs({ include_docs: true }).then((resp) => {
            return resp.rows.filter(r => !!r.doc).map((r) => this._callback(r.doc)).filter((d) => d._deleted === false);
        });
    }

    async remove(id: string) {
        return await this.update({_id: id, _deleted: true});
    }
}
