<template>
    <div class="hello">
        <main>
            <input type="text" v-model="bookName">
            <input type="submit" @click="search">
            <div>{{response}}</div>
        </main>
    </div>
</template>
<script>
export default {
    data() {
            return {
                bookName: '',
                response: {}
            }
        },
    methods: {
        search() {
            $.ajax({
                url: 'http://localhost:3000/',
                data: {
                    bookName: this.bookName
                },
                type: 'POST'
            }).done((response) => {
                this.response = response;
            }).fail((response) => {
                this.response = response;
            });
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
