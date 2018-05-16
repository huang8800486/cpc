<template>
    <div class="activity_listpage">
        <div class="xdetail" :class="{ 'showdetail': showDetail }">
            <div class="photography_title">
                <div class="cen_tit">
                    <span class="line"></span>
                    <div class="caption">
                        <em class="quadrangle icon quadrangle_l"></em>
                        <span class="txt">活动详情</span>
                        <em class="quadrangle icon quadrangle_r"></em>
                    </div>
                </div>
            </div>
            <div class="close_return_btn" @click="returnActivity">
                <i class="iconfont icon-guanbi"></i>
            </div>
            <div class="newsContent">
                <div class="detailContent">
                    <h1>{{currentActivity.title}}</h1>
                    <img class="lazy" v-lazy="currentActivity.images" alt="" onclick="return false">
                    <p>{{currentActivity.content}}</p>
                </div>
            </div>
            <div class="photography_title">
                <div class="cen_tit">
                    <span class="line"></span>
                    <div class="caption">
                        <em class="quadrangle icon quadrangle_l"></em>
                        <span class="txt">精彩图集</span>
                        <em class="quadrangle icon quadrangle_r"></em>
                    </div>
                </div>
            </div>
            <div class="intro_img_box">
                <a href="javascript:;" class="intro_img" v-for="(value, num) in currentActivity.gallery">
                    <img class="lazy" v-lazy="value" alt="">
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import axios from "axios"
export default {
    name: "activityList",
    data() {
        return {
            showDetail: false,
            currentActivity: []
        }
    },
    computed: {
        ...mapState([
            "activityList",
            'activityNumber'
        ]),
    },
    mounted(){
        this.$nextTick(() => {
            document.body.scrollTop = 0;
            this.$store.commit("UPDATE_FETCHLOADING", true);
             this.get().then((res) => {
                this.currentActivity = res.data[this.activityNumber];
                setTimeout(function(){
                    this.$store.commit("UPDATE_FETCHLOADING", false);
                    this.showDetail = true;
                }.bind(this), 1000)
            });
        })
    },
    methods: {
        get: function(){
            return axios.get("static/json/activityLoad.json", {})
        },
        returnActivity(){
            document.body.scrollTop = 0;
            this.$store.commit("UPDATE_ACTIVITYLIST", false)
            this.$store.commit("UPDATE_ACTIVITYNUMBER", this.activityNumber)
        }
    }  
}
</script>

<style lang="stylus" scoped>
@import "./activity.styl";
</style>


