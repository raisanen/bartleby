import { v4 as uuidv4} from 'uuid';
import { DateHelper } from '@/utils/date-helper';
import { IBartlebyData } from './idata';

export interface IBartlebyKeyValuePairs {
    [key: string]: string;
}

export interface IBartlebyDocument {
    title?: string;
    author?: string;
    content?: string;
    created?: string;
    modified?: string;
    meta?: IBartlebyKeyValuePairs;
}

export type IDocumentParams = IBartlebyData & IBartlebyDocument;

export class BartlebyDocument implements IDocumentParams {
    _id: string;
    title: string;
    author: string;
    content: string;
    created: string;
    modified: string;
    meta: IBartlebyKeyValuePairs;
    _deleted: boolean;

    constructor(doc: IDocumentParams = {} as IDocumentParams) {
        this._id = doc._id ?? uuidv4();
        this.title = doc.title ?? '';
        this.author = doc.author ?? '';
        this.content = doc.content ?? '';
        this.created = DateHelper.ensureString(doc.created);
        this.modified = DateHelper.nowString();
        this.meta = doc.meta || {};
        this._deleted = doc._deleted ?? false;
    }
}
