<template>
    <ion-item v-if="document" :routerLink="'/document/' + document.id" :detail="false" class="list-item">
        <ion-label class="ion-text-wrap">
            <h2>{{ document.title }}</h2>
            <h3>{{ document.author }}</h3>
            <ion-note>{{ document.modified }}</ion-note>
        </ion-label>
    </ion-item>
</template>
  
<script lang="ts">
import { IonIcon, IonItem, IonLabel, IonNote } from '@ionic/vue';
import { defineComponent } from 'vue';

import { IBartlebyDocument } from '@/data/document';

export default defineComponent({
    name: 'DocumentListItem',
    components: {
        IonItem,
        IonLabel,
        IonNote,
    },
    props: {
        document: Object,
    },
});
</script>
  
<style scoped>
.list-item {
    --padding-start: 0;
    --inner-padding-end: 0;
}

.list-item ion-label {
    margin-top: 12px;
    margin-bottom: 12px;
}

.list-item h2 {
    font-weight: 600;
    margin: 0;
}

.list-item p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 95%;
}

.list-item .date {
    float: right;
    align-items: center;
    display: flex;
}

.list-item ion-icon {
    color: #c9c9ca;
}

.list-item ion-note {
    font-size: 15px;
    margin-right: 8px;
    font-weight: normal;
}

.list-item ion-note.md {
    margin-right: 14px;
}

.list-item .dot {
    display: block;
    height: 12px;
    width: 12px;
    border-radius: 50%;
    align-self: start;
    margin: 16px 10px 16px 16px;
}

.list-item .dot-unread {
    background: var(--ion-color-primary);
}
</style>