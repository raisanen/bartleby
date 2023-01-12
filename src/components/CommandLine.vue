<template>
    <form :class="className" @submit="onSubmit">
        <div class="command-line__history">
            <div v-for="(item, index) in history" :class="item.className" :key="`history-item-${index}`">{{ item.input }}</div>
        </div>
        <label class="command-line__input">
            <span>$</span>
            <input type="text" v-model="input" @keydown="keydown" :readonly="false" :autofocus="true" />
        </label>
    </form>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

class HistoryItem {
    input = '';
    className = 'history__item';

    constructor(input: string, className?: string) {
        this.input = input;
        if (className) {
            this.className += ` history__item--${className}`; 
        }
    }
}

export default defineComponent({
    name: 'CommandLine',
    data() {
        return {
            history: [] as HistoryItem[],
            input: '',
            currHistoryPos: 0
        };
    },
    props: {
        show: Boolean,
        commands: Array<string>
    },
    computed: {
        className() {
            return `command-line command-line--${this.show ? 'show' : 'hide'}`;
        }
    },
    emits: ['command'],
    methods: {
        onSubmit(ev: Event) {
            if (this.history.length > 6) {
                this.history.splice(0, this.history.length - 6);
            }
            const input = this.input.trim();
            const [cmd, ...args] = input.split(/\s+/);
            let success = false;
            if (this.commands?.includes(cmd)) {
                this.command(cmd, args);
                success = true;
            }
            this.history.push(new HistoryItem(input, success ? 'success' : 'fail'));
            this.currHistoryPos = this.history.length;
            this.input = '';

            ev.preventDefault();
        },
        command(id: string, args: string[]) {
            this.$emit('command', id, ...args);
        },
        keydown(ev: KeyboardEvent) {
            if (ev.key === 'ArrowUp' || ev.key === 'ArrowDown') {
                if (this.history.length > 0) {
                    if (ev.key === 'ArrowUp') {
                        this.currHistoryPos = (this.currHistoryPos > 0 ? this.currHistoryPos - 1 : this.currHistoryPos);
                    } else {
                        this.currHistoryPos = (this.currHistoryPos < this.history.length ? this.currHistoryPos + 1 : this.currHistoryPos);
                    }
                    if (this.currHistoryPos >= 0 && this.currHistoryPos < this.history.length) {
                        this.input = this.history[this.currHistoryPos].input;
                    } else if (this.currHistoryPos === this.history.length) {
                        this.input = '';
                    }
                }
            } else if (ev.key === 'Tab' && this.input.length > 0) {
                const matchingCommand = this.commands?.find(c => c.startsWith(this.input));
                if (matchingCommand) {
                    this.input = matchingCommand;
                }
                ev.preventDefault();
            }
        }
    }
});
</script>
  
<style scoped>
.command-line {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 8.5rem;
    width: 100vw;
    max-height: 20vh;

    justify-content: end;
    align-items: stretch;
    flex-direction: column;

    background: linear-gradient(rgba(0, 0, 0, .25), rgba(0, 0, 0, .5));
    overflow: hidden;
}

.command-line.command-line--hide {
    display: none;
}

.command-line.command-line--show {
    display: flex;
}

.command-line .command-line__history {
    overflow: hidden;
}

.command-line .command-line__input,
.command-line .command-line__history {
    display: flex;
    width: 100%;
}
.command-line__history {
    flex-direction: column;
    justify-content: end;
}
.history__item {
    color: var(--ion-color-step-700);
}
.history__item--fail:before {
    color: var(--ion-color-danger);
    content: 'Unknown command: '
}
.command-line__input {
    flex-direction: row;
    justify-content: start;
    color: var(--ion-color-primary-tint);
}

.command-line .command-line__input,
.command-line .command-line__history,
.command-line input[type=text] {
    font-family: var(--ion-font-family-monospace);
    font-weight: 400;
    font-size: .85rem;
    line-height: 1rem;
    background-color: transparent;
}

.command-line input[type=text] {
    border: none;
    outline: none;
    caret-color: var(--ion-color-step-850);
    flex-grow: 1;
    padding-left: 1ch;
    color: var(--ion-text-color);
}
</style>