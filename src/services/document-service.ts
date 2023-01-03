
import {  IBartlebyDocument, BartlebyDocument } from '@/data/document';

const defaultDocs: BartlebyDocument[] = [
    new BartlebyDocument({
        id: 'fc8aaac2-dd33-481c-9beb-ca6e549ea4b6',
        author: 'Herman Melville',
        title: 'Bartleby the Scrivener',
        meta: {
            subtitle: 'A Story of Wall Street'
        },
        content: `
In this very attitude did I sit when I called to him, rapidly stating what it was I wanted him to do---namely, to examine a small paper with me. Imagine my surprise, nay, my consternation, when without moving from his privacy, Bartleby in a singularly mild, firm voice, replied, *"I would prefer not to."*

I sat awhile in perfect silence, rallying my stunned faculties. Immediately it occurred to me that my ears had deceived me, or Bartleby had entirely misunderstood my meaning. I repeated my request in the clearest  tone I could assume. But in quite as clear a one came the previous reply, "I would prefer not to."

"Prefer not to," echoed I, rising in high excitement, and crossing the room with a stride. "What do you mean? Are you moon-struck? I want you to help me compare this sheet here—take it," and I thrust it towards him.

"I would prefer not to," said he.
`
    })
];

export default {
    createDocument(doc: IBartlebyDocument = {} as IBartlebyDocument): BartlebyDocument {
        return new BartlebyDocument(doc);
    },

    getDocument(id = ''): BartlebyDocument {
        return this.getDocuments().find(d => d.id === id) || this.createDocument({ id });
    },

    getDocuments(): BartlebyDocument[] {
        return [...defaultDocs];
    },

    updateDocument(update: IBartlebyDocument = {} as IBartlebyDocument): BartlebyDocument {
        return this.getDocument(update.id).update(update);
    }
}
