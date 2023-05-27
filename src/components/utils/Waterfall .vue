<script   setup>
import { ref, reactive, onMounted } from 'vue'
const props = defineProps({
    columnWidth: Number,
    listData:Array
})

const columns = ref([]);

onMounted(() => {
    const columnCount = Math.floor(window.innerWidth / props.columnWidth);
    for (let i = 0; i < columnCount; i++) {
        columns.value.push([]);
    }
    props.listData.forEach((item) => {
        const minIndex = getMinIndex(columns.value);
        columns.value[minIndex].push(item);
    });
})

function getMinIndex(arr) {
    let min = Infinity;
    let index = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length < min) {
            min = arr[i].length;
            index = i;
        }
    }
    return index;
}


</script>

<template>
    <div>
        <div v-for="(item, index) in columns" :key="index" class="column">
            {{ item }}
        </div>
    </div>
</template>

<style  scoped>
.column {
    display: inline-block;
    vertical-align: top;
}

.item {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #eee;
}
</style>