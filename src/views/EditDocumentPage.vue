<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar :class="editorFocused ? 'editor-focused' : ''">
                <ion-buttons slot="start">
                    <ion-back-button default-href="/"></ion-back-button>
                </ion-buttons>
                <ion-title v-if="document?.title">
                    {{ document.title }}
                </ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="showPreview = true">
                        <ion-icon :icon="codeIcon"/>
                    </ion-button>
                    <ion-button @click="showPreview = true">
                        <ion-icon :icon="previewIcon"/>
                    </ion-button>
                    <ion-button @click="saveDocument">
                        <ion-icon :icon="saveIcon"/>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content class="main-content" :fullscreen="true">
            <code-mirror
                v-model="content" 
                :lang="lang" :dark="true" 
                :extensions="editorExtensions" 

                :wrap="true" 
                @keydown="handleKeydown"
                @change="handleChange"
                @ready="handleReady"
                @update="handleUpdate"
            />

            <command-line :show="showCommand" @command="handleCommand" :commands="cliCommands"></command-line>

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
import { defineComponent, Ref, ref  } from 'vue';
import { IonBackButton, IonButtons, IonButton, IonContent, IonHeader, IonPage, IonModal, IonToolbar, IonTitle, IonIcon } from '@ionic/vue';
import { 
    eyeOutline as previewIcon, 
    codeOutline as editorIcon, 
    saveOutline as saveIcon,
    closeOutline as closeIcon,
    codeOutline as codeIcon
} from 'ionicons/icons';

import { bartleby } from '@/theme/codemirror-theme';
import CodeMirror from 'vue-codemirror6';
import { standardKeymap } from '@codemirror/commands';
import { EditorState  } from '@codemirror/state';
import { ViewUpdate, lineNumbers, keymap, EditorView } from '@codemirror/view';
import { markdown } from '@codemirror/lang-markdown';

import { BartlebyDocument } from '@/data/document';
import documentService from '@/services/document-service';

import CommandLine from '@/components/CommandLine.vue';


export default defineComponent({
    name: 'EditDocumentPage',
    data() {
        return {
            showPreview: false,
            editorFocused: false,
            showCommand: false,
            document: {} as BartlebyDocument,
            previewIcon,
            editorIcon,
            saveIcon,
            closeIcon,
            codeIcon,
            cliCommands: [
                'rename',
                'exit',
            ]
        }
    },
    setup() {
        const content: Ref<string> = ref('');
        return {
            state: {} as EditorState,
            lang: markdown(),
            content,
            editorExtensions: [bartleby, lineNumbers(), keymap.of(standardKeymap)]
        };
    },

    async created() {
        await this.reloadDocument();

    },
    computed: {
        editorContent(): string {
            return this.state.doc ? this.state.doc.toJSON().join("\n") : '';
        },
        htmlPreview(): string {
            return documentService.render(this.editorContent);
        }
    },
    methods: {
        async handleCommand(cmd: string, ...args: string[]) {
            switch(cmd) {
                case 'rename':
                    this.document.title = args.join(' ');
                    await this.saveDocument();
                    break;

                case 'exit':
                    this.showCommand = false;
                    break;
            }
        },

        handleKeydown(ev: KeyboardEvent) {
            if (ev.ctrlKey && ev.shiftKey && ev.key === 'P') {
                this.showCommand = !this.showCommand;
                ev.preventDefault();
            }
        },
        handleUpdate(update: ViewUpdate) {
            this.editorFocused = update.view.hasFocus;
        },
        togglePreview() {
            this.showPreview = !this.showPreview;
        },
        handleReady(args: {state: EditorState}) {
            this.handleChange(args.state);
        },
        handleChange(state: EditorState) {
            this.state = {...state} as EditorState;
        },
        async saveDocument() {
            await documentService.updateDocument({...this.document, content: this.editorContent});
        },
        async reloadDocument() {
            const route = useRoute();
            const docId = route.params.id as string;
            const document = await documentService.getDocument(docId);
            if (document) {
                this.document = {...document} as BartlebyDocument;
                this.content = document.content;
            }
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
        CommandLine
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

