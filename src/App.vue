<template>
    <div id="app">
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <loading v-show="fetchLoading"></loading>
        </transition>
        
        <v-header></v-header>
        <div class="router_view">
            <transition enter-active-class="animated fadeInRight">
                <router-view></router-view>
            </transition>
        </div>
        <v-footer :class='{"isFixed": FixedClass}'></v-footer>
  </div>
</template>
<script>
import vHeader from "./components/header/header.vue";
import vFooter from "./components/footer/footer.vue";
import Loading from './components/loading/loading';
import { mapState } from 'vuex';
import * as pageTitle from '@/common/js/title';
export default {
    name: "App",
    data() {
        return {
           test:""
        };
    },
    components: {
        vHeader,
        vFooter,
        Loading
    },
    computed: {
        ...mapState([
            'fetchLoading',
            "FixedClass",
            "headerTitle"
        ]),
    },
    mounted(){
        const url = this.$route.path.split('/')[1];
        this.$store.commit("UPDATE_TITLE", pageTitle.NAME_PAGE[url]);
    },
    watch: {
        '$route' (to, from) {
            // console.group("路由页面")
            //     console.log(from);
            //     console.log(to);
            //     console.log("前一页面: " + from.path + " ,进入的页面是: " + to.path);
            // console.groupEnd("路由页面")
            var toTarget = to.path.split("/")[1].toLowerCase().toString();
            this.$store.commit("UPDATE_TITLE", pageTitle.NAME_PAGE[toTarget]);
            this.$store.commit("UPDATE_FIXEDCLASS", pageTitle.NAME_PAGE[toTarget]);
            this.$store.commit("UPDATE_ACTIVITYLIST", false)
        }
    },
    methods: {}
};
</script>

<style>
body.modal-open {
    position: fixed;
    width: 100%;
}
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    max-width: 750px;
    margin: 0 auto;
    background: #ffffff;
    font-size:14px;
    margin-top: 0.666666666666667rem;
}
.main_content.animated {
    animation-duration: 0.4s;
}
.clearlazy{width:100%;background: url('assets/loading.gif') no-repeat center;height:100%!important;}
</style>
