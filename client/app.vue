<template>
    <div id="app">
        <div id="cover"></div>
        <div id="loading" v-show="loading">
            <loading />
        </div>
        <Header />
        <transition name="fade" mode="out-in">
            <router-view />
        </transition>
        <!-- <notification
            content="test notify"/> -->
        <button @click="notify">click me1</button>
        <Footer />
    </div>
</template>

<script>
import Header from '@/layout/header.vue'
import Footer from '@/layout/footer.vue'
import Loading from '@/components/loading/loading.vue';
import {mapState} from 'vuex';

export default {
    metaInfo: {
        title: 'Jokcy\'s Todo App'
    },
    components: {
        Header,
        Footer,
        Loading
    },
    async created () {
        await this.getinfo();
        // console.log('yewei')

    },
    // created() {
    //     console.log(123)
    // },
    mounted () {
        this.$store.dispatch('updateCountAsync', 20);
    },
    computed: {
        ...mapState(['loading'])
    },
    methods: {
        getinfo() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve()
                }, 2000)
            })
        },
        notify () {
            this.$notify({
                content: 'test $notify',
                btn: 'close'
            })
        }
    }
}
</script>

<style lang="less" scoped>
#app{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
#cover{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #999;
    opacity: .9;
    z-index: -1;
}
#loading{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(255, 255, 255, .3);
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>


