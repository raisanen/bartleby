import { v4 as uuidv4} from 'uuid';
import { DateHelper } from '@/utils/date-helper';

export interface IBartlebyKeyValuePairs {
    [key: string]: string;
}

export interface IBartlebyDocument {
    id?: string;
    title?: string;
    author?: string;
    content?: string;
    created?: string;
    modified?: string;
    meta?: IBartlebyKeyValuePairs;
}


export class BartlebyDocument implements IBartlebyDocument {
    id: string;
    title: string;
    author: string;
    content: string;
    created: string;
    modified: string;
    meta: IBartlebyKeyValuePairs;

    constructor(doc: IBartlebyDocument = {} as IBartlebyDocument) {
        this.id = doc.id || uuidv4();
        this.title = doc.title || '';
        this.author = doc.author || '';
        this.content = doc.content || '';
        this.created = DateHelper.ensureString(doc.created);
        this.modified = DateHelper.nowString();
        this.meta = doc.meta || {};
    }

    update(doc: IBartlebyDocument = {} as IBartlebyDocument) : BartlebyDocument {
        this.id = doc.id || this.id;
        this.title = doc.title || this.title;
        this.author = doc.author || this.author;
        this.content = doc.content || this.content;
        this.modified = DateHelper.nowString();
        this.meta = doc.meta || this.meta;

        return this;
    }

    static copy(doc: IBartlebyDocument = {} as IBartlebyDocument) : BartlebyDocument{
        return new BartlebyDocument({...doc, id: uuidv4()});
    }
}
