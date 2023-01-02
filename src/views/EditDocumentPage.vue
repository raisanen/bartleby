<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/"></ion-back-button>
                </ion-buttons>
                <ion-title v-if="loaded">
                    {{ document.title }}
                </ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true" v-if="loaded">
            <CodeMirror v-model="content" ref="editor" :extensions="extensions" @update="update" @ready="handleReady" />
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { useRoute } from 'vue-router';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar, IonTitle } from '@ionic/vue';
import { defineComponent, shallowRef } from 'vue';

import CodeMirror from 'vue-codemirror6';
import { markdown } from '@codemirror/lang-markdown';

import { bartleby } from '@/utils/codemirror-theme';
import { documentService } from '@/services/document-service';

import { IBartlebyDocument, BartlebyDocument } from '@/data/document';
import 'bytemd/dist/index.css';

export default defineComponent({
    name: 'EditDocumentPage',
    data() {
        return {
            document: {} as IBartlebyDocument,
            content: '',
            loaded: false,
            editor: null,
        }
    },
    setup() {
        const extensions = [markdown(), bartleby];
        const handleReady = (payload: any) => {
            console.log(payload);
            payload.container.onkeydown = (ev: any) => console.log(ev);
        };
        const update = (ev: any) => console.log(ev.state.doc);


        return {
            extensions,
            handleReady,
            update
        };
    },
    created() {
        const route = useRoute();
        const docId = route.params.id as string;
        this.getDocument(docId);
        console.log(this.$refs.editor);
    },
    methods: {
        updateDocument(doc: BartlebyDocument) {
            this.document = { ...doc};
            this.content = doc.content;
            this.loaded = true;
        },
        handleDocumentChange(value: string) {
            return documentService.updateDocument({ ...this.document, content: value }).then(this.updateDocument);
        },
        getDocument(id: string) {
            return documentService.getDocument(id).then(this.updateDocument);
        },
    },
    components: {
        IonBackButton,
        IonButtons,
        IonContent,
        IonHeader,
        IonPage,
        IonToolbar,
        IonTitle,
        CodeMirror
    },
});
</script>
  
<style scoped>
h1 {
    margin: 0;
    font-weight: bold;
    font-size: 22px;
}

p {
    line-height: 22px;
}
ion-content {
    position: relative;
    height: calc(100vh - 60px);
}
</style>
<style>
.vue-codemirror, .ͼ1.cm-editor {
    width: 100%;
    height: 100%;
}

</style>
  