<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Bartleby</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="create()">
                        <ion-icon :icon="addIcon"/>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-list>
                <DocumentListItem v-for="doc in documents" :key="doc._id" :document="doc" @remove="remove" />
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';
import { 
    addCircleOutline as addIcon, 
} from 'ionicons/icons';


import DocumentListItem from '@/components/DocumentListItem.vue';
import documentService  from '../services/document-service';
import { BartlebyDocument } from '@/data/document';

export default defineComponent({
    name: 'HomePage',
    data() {
        return {
            documents: [] as BartlebyDocument[],
            addIcon
        }
    },
    async created() {
        await this.update();
    },
    methods: {
        async update() {
            const documents = await documentService.getDocuments();
            this.documents = documents; 
        },
        async create() {
            await documentService.createDocument();
            await this.update();
        },
        async remove(id: string) {
            console.log(id);
            await documentService.removeDocument(id);
            await this.update();
        }
    },
    components: {
        IonButton,
        IonButtons,
        IonIcon,
        IonContent,
        IonHeader,
        IonList,
        IonPage,
        IonTitle,
        IonToolbar,
        DocumentListItem
    },
});
</script>
