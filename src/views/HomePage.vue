<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Bartleby</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-list>
                <DocumentListItem v-for="doc in documents" :key="doc.id" :document="doc" />
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';

import DocumentListItem from '@/components/DocumentListItem.vue';
import { documentService } from '@/services/document-service';
import { BartlebyDocument, IBartlebyDocument } from '@/data/document';

export default defineComponent({
    name: 'HomePage',
    data() {
        return {
            documents: [] as IBartlebyDocument[]
        };
    },
    created() {
        this.getDocuments();
    },
    methods: {
        getDocuments() {
            return documentService.getDocuments().then(docs =>this.documents = docs); 
        }
    },
    components: {
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
