<template>
    <div>
        <p>{{ comment?.commentTitle }}</p>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(['comment'])
</script>
