<template>
    <div>
        <h1>Events Listing</h1>
        <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
</template>

<script>
import EventService from '@/services/EventService.js';
import EventCard from '@/components/EventCard.vue';

export default {
    name: 'EventList',
    data() {
        return {
            events: []
        }
    },
    components: {
        EventCard
    },
    created() {
        EventService.getEvents()
        .then(response => {
            console.log(response.data);
            this.events = response.data;
        })
        .catch(error => {
            console.log('There was an error: ', error.response);
        })
    }
}
</script>
