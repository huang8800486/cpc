<template>
    <div class="header_wrap">
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div class="page_cover animated" v-show="menuShow" @click="showMenuBtn()"></div>
        </transition>
        
        <div id="header">
            <div class="head_top">
                <div class="pull_left">
                    <a href="javascript:;" class="menu_btn" @click="showMenuBtn()">
                        <i class="iconfont icon-shouyedaohangicon"></i>
                    </a>
                </div>
                <div class="pull_text">
                    <div class="title_text">
                        <span :class="{ 'active': menuShow }">{{headerTitle}}</span>
                    </div>
                </div>
            </div>
        </div>
        <v-menu :class="{ 'active': menuShow }" :show="menuShow"></v-menu>
    </div>
</template>
<script>
import vMenu from '../menu/menu.vue';
import { mapState } from 'vuex';
export default {
    name: "v-header",
    data(){
        return {
            show: false,
            scrollNum: 0,
        }
    },
    components: {
        vMenu
    },
    computed: {
        ...mapState([
            "menuShow",
            "headerTitle"
        ])
    },
    methods: {
        showMenuBtn(){
            this.$store.commit('UPDATE_MENUSHOW'); 
            this.show = !this.show;
            if(this.menuShow){
                this.scrollNum = this.$options.methods.cacheScrollTop();
                this.$options.methods.fixedScrollOpen(this.scrollNum);
            }else{
                this.$options.methods.fixedScrollClose(this.scrollNum);
            }
        },

        cacheScrollTop(){
            return window.pageYOffset;
        },

        addClassList(ele, sClass){
            var bodyClassName = ele.className;
            if(ele.classList){
                ele.classList.add(sClass)
            }else{
                ele.className += " " + sClass;
            }
        },

        removeClassList(ele, sClass){
            var bodyClassName = ele.className;
            var reg;
            if(ele.classList){
                ele.classList.remove(sClass)
            }else{
                reg = new RegExp("\\b" + sClass + "\\b", "g", "gi");
                if(reg.test(ele.className)){
                    bodyClassName = ele.className.replace(reg, "");
                    ele.className = bodyClassName;
                }
            }
        },
        fixedScrollOpen(scrollNum){
            var bodyCls = "modal-open";
            var bodyClassName = "";
            var bodyEle = document.body;
            this.addClassList(bodyEle, bodyCls);
            bodyEle.style.top = -scrollNum + 'px';
            bodyClassName = bodyEle.className;
        },

        fixedScrollClose(scrollNum){
            var bodyCls="modal-open";
            var bodyClassName = "";
            var bodyEle = document.body;
            this.removeClassList(bodyEle, bodyCls);
            bodyEle.style.top = "";
            document.body.scrollTop = scrollNum;
            document.documentElement.scrollTop = scrollNum;
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "./header.styl"
</style>

