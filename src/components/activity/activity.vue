<template>
  <div class="activity_con main_content">
      <div class="inner_content">
          <div id="div_list" class="xact_list" :class="{ 'xact_list_active': activityList }">
                <div class="xact" v-for="(item, index) in activityData" @click="triggerDetail(index)">
                    <div class="xact_img">
                        <a href="javascript:;">
                            <img class="lazy" v-lazy="item.images" alt="">
                            <span class="status" :class="item.status">{{item.statusText}}</span>
                        </a>
                    </div>
                    <div class="xact_text">
                        <div class="text_txt">
                            <a href="javascript:;"><h1 class="tj">{{item.title}}</h1>
                            </a>
                            <p>{{item.subTitle}}</p>
                            <h2>活动时间: {{item.time}}</h2>
                        </div>
                        
                    </div>
                </div>
            </div>
            <transition name="fade" enter-active-class="animated fadeInRight" leave-active-class="animated fadeInRight">
                <v-detail ref="details" v-if="activityList"></v-detail>
            </transition>
      </div>
  </div>
</template>
<script>
import vDetail from "./activityList.vue";
import axios from "axios"
import { mapState } from 'vuex';
import * as pageTitle from '@/common/js/title';
export default {
    name: "activity",
    data() {
        return {
            activityData: [],
            activityDataLength: 0,
        };
    },
    components: {
        vDetail
    },
    computed: {
        ...mapState([
            'activityList',
            "activityNumber"
        ]),
    },
    mounted(){
        this.$nextTick(() => {
             this.get().then((res) => {
                this.activityData = res.data;
                this.activityDataLength = res.data.length-1;
            });
        })
    },
    methods: {
        get: function(){
            return axios.get("static/json/activityLoad.json", {})
        },

        triggerDetail(index){
            this.$store.commit("UPDATE_ACTIVITYLIST", true)
            this.$store.commit("UPDATE_ACTIVITYNUMBER", index)
        }
    }
};
</script>
<style lang="stylus" scoped>
@import "./activity.styl";
</style>


