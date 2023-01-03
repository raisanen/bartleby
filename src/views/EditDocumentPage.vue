<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar :class="editorFocused ? 'editor-focused' : ''">
                <ion-buttons slot="start">
                    <ion-back-button default-href="/"></ion-back-button>
                </ion-buttons>
                <ion-title v-if="title">
                    {{ title }}
                </ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="showPreview = true">
                        <ion-icon :icon="previewIcon"/>
                    </ion-button>
                    <ion-button @click="saveDocument">
                        <ion-icon :icon="saveIcon"/>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content class="main-content"  :fullscreen="true">
            <code-mirror 
                v-model="content" 
                :lang="lang" :dark="true" 
                :extensions="[theme]" 
                :wrap="true" 
                @keydown="handleKeydown"
                @change="handleChange"
                @ready="handleReady"
                @update="handleUpdate"
            />

            <ion-modal class="command-modal" :is-open="showCommand">
                <ion-content>
                    <input type="text"/>
                </ion-content>
            </ion-modal>

            <ion-modal class="preview-modal" :is-open="showPreview">
                <ion-header>
                    <ion-toolbar>
                    <ion-title>Preview</ion-title>
                    <ion-buttons slot="end">
                        <ion-button @click="showPreview = false">
                            <ion-icon :icon="closeIcon"/>
                        </ion-button>
                    </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding">
                    <div class="html-preview" v-html="htmlPreview"/>
                </ion-content>
            </ion-modal>
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { useRoute } from 'vue-router';
import { defineComponent, ref  } from 'vue';
import { IonBackButton, IonButtons, IonButton, IonContent, IonHeader, IonPage, IonModal, IonToolbar, IonTitle, IonIcon } from '@ionic/vue';
import { 
    documentOutline as previewIcon, 
    codeOutline as editorIcon, 
    saveOutline as saveIcon,
    closeOutline as closeIcon ,
    menuOutline as menuIcon
} from 'ionicons/icons';

import CodeMirror from 'vue-codemirror6';
import { EditorState } from '@codemirror/state';
import { ViewUpdate } from '@codemirror/view';
import { markdown } from '@codemirror/lang-markdown';
import { bartleby } from '@/theme/codemirror-theme';

import documentService from '@/services/document-service';
import markdownHelper from '@/utils/markdown-helper';


export default defineComponent({
    name: 'EditDocumentPage',
    data() {
        return {
            showPreview: false,
            editorFocused: false,
            showCommand: false
        }
    },
    setup() {
        const route = useRoute();
        const docId = route.params.id as string;
        const document = documentService.getDocument(docId);
        return {
            state: {} as EditorState,
            previewIcon,
            editorIcon,
            saveIcon,
            closeIcon,
            document,
            title: document.title,
            content: ref(document.content),
            lang: markdown(),
            theme: bartleby
        };
    },
    computed: {
        editorContent(): string {
            return this.state.doc ? this.state.doc.toJSON().join("\n") : '';
        },
        htmlPreview(): string {
            return markdownHelper.parse(this.editorContent);
        }
    },
    methods: {
        handleKeydown(ev: KeyboardEvent) {
            if (ev.ctrlKey && ev.shiftKey && ev.key === 'P') {
                this.showCommand = true;
                ev.preventDefault();
            }
        },
        handleUpdate(update: ViewUpdate) {
            this.editorFocused = update.view.hasFocus;
//            console.log(update);
        },
        togglePreview() {
            this.showPreview = !this.showPreview;
        },
        handleReady(args: {state: EditorState}) {
            this.handleChange(args.state);
        },
        handleChange(state: EditorState) {
            this.state = state;
        },
        saveDocument() {
            documentService.updateDocument({...this.document, content: this.editorContent});
        },
        reloadDocument() {
            const route = useRoute();
            const docId = route.params.id as string;
            const document = documentService.getDocument(docId);

            this.document = document;
            this.title = document.title;
            this.content = document.content;
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
        IonIcon,
        IonButton,
        IonModal,
        CodeMirror,
    },
});
</script>
  
<style scoped>
h1 {
    margin: 0;
    font-weight: 900;
    font-size: 22px;
}

p {
    line-height: 22px;
}
ion-toolbar {
    opacity: 1.0;
    transition: opacity .5s ease-in-out;
}
 ion-toolbar.editor-focused {
    opacity: 0.2;
}

ion-content.main-content {
    position: relative;
    height: calc(100vh - 60px);
}

ion-modal.preview-modal {
    --width: 100vw;
    --height: 100vh;
}
ion-modal.preview-modal ion-content {
    --background: var(--ion-color-step-100);
}
ion-modal.preview-modal ion-toolbar {
    --background: var(--ion-color-step-150);
}
ion-modal.command-modal {
    --width: fit-content;
    --min-width: 300px;
    --min-height: 60px;
    --max-width: 90vw;
    --height: fit-content;
    --border-radius: 6px;
    --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}
ion-modal.command-modal input {
    width: 300px;
    height: 2rem;
    --color: var(--ion-color-primary);
}

.html-preview, .vue-codemirror {
    width: 100%;
    height: 100%;
}
.html-preview {
    font-family: var(--ion-font-family-preview);
    font-size: 1rem;
    line-height: 150%;
    width: 900px;
    max-width: 90%;
    margin: 0 auto;
}
</style>

  