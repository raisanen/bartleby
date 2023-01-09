
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

import { BartlebyDocument, IDocumentParams } from '@/data/document';
import { BartlebySettings } from '@/data/settings';
import { DbHelper } from '@/data/db';

import settingsService from './settings-service';

export default {
    _db: new DbHelper<BartlebyDocument>('docs', (d) => new BartlebyDocument((d ?? {}) as IDocumentParams)),

    async _getSettings(): Promise<BartlebySettings> {
        return await settingsService.get();
    },

    async _defaultDoc(n: number): Promise<BartlebyDocument> {
        const settings = await this._getSettings();
        return new BartlebyDocument({
            author: settings.author,
            title: `New Document ${n+1}`,
            content: `
# New document ${n+1}
`
        });
    },

    async createDocument(): Promise<BartlebyDocument|undefined> {
        const documents = await this.getDocuments();
        const document = await this._defaultDoc(documents.length);

        const resp = await this._db.put(document);
        return await this.getDocument(resp.id);
    },

    async getDocument(id = '') : Promise<BartlebyDocument|undefined>{
        return (await this.getDocuments()).find(d => d._id === id);
    },

    async getDocuments()  {
        return await this._db.getAll();
    },

    async updateDocument(update: BartlebyDocument) {
        return await this._db.update(update);
    },
    async removeDocument(id: string) {
        return await this._db.remove(id);
    },

    mdToDocument(markdown: string): BartlebyDocument {
        const rex = /(^\{)(?:([\s\S]*?)(?:\r?\n|\r))(\})/;
        const md = markdown.trim();
        const match = rex.exec(md);
        if (match) {
            const json = `{${match[2].trim()}}`;
            const meta = JSON.parse(json);
            return new BartlebyDocument({
                ...meta,
                content: md.replace(rex, '').trim()
            })
        } else {
            return new BartlebyDocument({
                content: md
            });
        }
    },

    documentToMd(doc: BartlebyDocument): string {
        return JSON.stringify({...doc, content: null}, null, 3) + "\n\n" + doc.content;
    },

    render(doc: BartlebyDocument | string) {
        const content = doc instanceof BartlebyDocument ? doc.content : doc;
        const file = unified()
            .use(remarkParse)
            .use(remarkRehype)
            .use(rehypeSanitize)
            .use(rehypeStringify)
            .processSync(content);
            
        return String(file); 
    },
}

