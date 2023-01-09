<template>
    <ion-item-sliding v-if="document && document._id">
        <ion-item  :routerLink="'/document/' + document._id" :detail="false" class="list-item">
            <ion-label class="ion-text-wrap">
                <h2>{{ document.title }}</h2>
                <h3>{{ document.author }}</h3>
                <ion-note>
                    <div class="date">{{ formattedDate }}</div>
                </ion-note>
            </ion-label>
        </ion-item>
        <ion-item-options side="end">
            <ion-item-option>Favorite</ion-item-option>
            <ion-item-option color="danger">Delete</ion-item-option>
        </ion-item-options>
    </ion-item-sliding>
</template>
  
<script lang="ts">
import { IonItem, IonLabel, IonNote, IonItemOption, IonItemOptions, IonItemSliding } from '@ionic/vue';
import { defineComponent } from 'vue';
import { 
    documentOutline as docIcon,
    removeCircleOutline as removeIcon 
} from 'ionicons/icons';

import { DateHelper } from '@/utils/date-helper';

export default defineComponent({
    name: 'DocumentListItem',
    components: {
        IonItem,
        IonItemOption,
        IonItemOptions,
        IonItemSliding,
        IonLabel,
        IonNote,
    },
    props: {
        document: Object,
    },
    data() {
        return {
            docIcon, removeIcon
        }
    },
    computed: {
        formattedDate(): string {
            return DateHelper.toLocaleString(this.document?.modified);
        }
    },
    emits: ['remove'],
    methods: {
        delete(id: string) {
            this.$emit('remove', id);
        }
    }
});
</script>
  
<style scoped>
.list-item {
    --padding-start: 1em;
    --inner-padding-end: 1em;
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
</style>