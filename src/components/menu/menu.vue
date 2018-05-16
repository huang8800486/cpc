<template>
  <div class="menu">
      <div class="menu_list">
          <div class="menu_header">
              <div class="menu_avatar">
                  <img src="static/images/logo_white.png"></img>
              </div>
              <div class="menu_title">WuTao</div>
          </div>
          <div class="menu_ul">
              <div class="menu_scroll">
                <div class="list" v-for="(menu, index) in MENU_CONVERT.NAME_PAGE" @click="updateTitle(index, menu)">
                    <router-link :to="'/' + index" class="icon-quanbu item border-1px">
                        <span class="menu_text">{{menu}}</span>
                    </router-link>
                </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
import * as MENU_CONVERT from '@/common/js/title';
import BScroll from 'better-scroll'
import { mapState } from 'vuex'
export default {
    name: "v-menu",
    data(){
        return {
            MENU_CONVERT : MENU_CONVERT
        }
    },
    mounted(){
        this.$nextTick(() => {
            // const wrapper = document.querySelector('.menu_ul')
            // const scroll = new BScroll(wrapper, {click: true})
        });
    },
    methods: {
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
        updateTitle(menu, title){
            this.$store.commit("UPDATE_MENUSHOW");
            this.$store.commit("UPDATE_FIXEDCLASS", title);
            this.$store.commit("UPDATE_TITLE", title);
            this.$store.commit("UPDATE_ACTIVITYLIST", false)
            this.removeClassList(document.body, "modal-open");
            document.body.style.top = "";
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "./menu.styl"
</style>

