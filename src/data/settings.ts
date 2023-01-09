import { v4 as uuidv4} from 'uuid';
import { IBartlebyData } from "./idata";

export interface IBartlebySettings {
    author?: string;
    locale?: string;
}

export type ISettingsParams = IBartlebyData & IBartlebySettings;

export class BartlebySettings implements ISettingsParams {
    _id: string;
    _deleted: boolean;
    author: string;
    locale: string;

    constructor(settings: ISettingsParams  = {} as ISettingsParams) {
        this.author = settings.author ?? 'KR';
        this.locale = settings.locale ?? 'sv';
        this._id = settings._id ?? uuidv4();
        this._deleted = settings._deleted ?? false;
    }
}