<template>
    <div class="hello">
        <main>
            <input type="text" v-model="bookName">
            <input type="submit" @click="search">
        </main>
    </div>
</template>
<script>
export default {
    data() {
            return {
                bookName: ''
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
                console.log(response);
            }).fail((response) => {
                console.log(response);
            });
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
