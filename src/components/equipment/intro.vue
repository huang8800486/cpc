<template>
    <div class="equipintro_wrap">
        <div class="equipintro_header">
            <div class="head_top">
                <div class="pull_left">
                    <a href="javascript:history.go(-1)" class="menu_btn">
                        <i class="iconfont icon-fanhui"></i>
                    </a>
                </div> 
                <div class="pull_text">
                    <div class="title_text">
                        <span >{{dataElement.name}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="equipment_order">
            <div class="picture_img_wrap">
                <a href="javascript:;" class="picture_img" @click="tap(dataElement.images, $event)">
                    <img class="lazy" :src="dataElement.images" alt="">
                </a>
            </div>
            <div class="subscribe_order">
                <div class="sub_eqiup">
                    <h2 class="title">{{dataElement.name}}</h2>
                    <div class="day">{{dataElement.day}}</div>
                    <div class="noting" v-html="dataElement.content"></div>
                </div>
            </div>
        </div>  

        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div class="pop_item_img" v-show="cover">
                <div class="item_cover"></div>
                <div class="scale_img_wrap" :class="{'scaleImg': cover}" ref="scaleImg" @click="untap">
                    <img :src="popImg" onclick="return false" :class="{'active': pinchTransform}" alt="" ref="pinchImg" class="pop_img" v-finger:pinch="pinch" v-finger:multipoint-start="multipointStart" v-finger:multipoint-end="multipointEnd" v-finger:press-move="pressMove.bind(this, 12)">
                    <!-- <span>{{test}}</span> -->
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import axios from 'axios';
import Transform from "css3transform"
import { mapState } from 'vuex';
export default {
    name: "v-intro",
    data(){
        return {
            isDoubleClick: false,   // 双击放大
            pinchTransform: false,  
            cover: false,           // 弹出图片层
            popImg: "",             // 弹出图片
            initScale: 1,           // 缩放倍率
            dataElement:[]
        }
    },
    computed: {
        ...mapState([
            "headerTitle",
            "dataIndex"
        ])
    },
    mounted(){
        this.$nextTick(() => {
            this.$store.commit("UPDATE_FIXEDCLASS", this.headerTitle);
            this.initData();
        })
    },
    methods:{
        get: function(){
            return axios.get("static/json/productLoad.json", {})
        },
        tap: function(img, evt) { 
            // var producImg = evt.currentTarget.querySelector(".product_img");
            // var offsetTop = producImg.getBoundingClientRect().top;
            // var offsetLeft = producImg.getBoundingClientRect().left;
            // this.$refs.scaleImg.style.left = offsetLeft + "px";
            // this.$refs.scaleImg.style.top = offsetTop + "px";
            this.cover = !this.cover;
            this.popImg = img;
            Transform(this.$refs.pinchImg);
        },
        untap: function(){
            this.cover = !this.cover;
            this.initScale = 1;
            this.$refs.pinchImg.scaleX = 1;
            this.$refs.pinchImg.scaleY = 1;
            this.$refs.pinchImg.translateX = 0;
            this.$refs.pinchImg.translateY = 0;
        },
        multipointStart: function () {
            this.initScale = this.$refs.pinchImg.scaleX;
        },
        multipointEnd: function () {
            if(this.$refs.pinchImg.scaleX == 1 && ((this.$refs.pinchImg.translateX > 10) || (this.$refs.pinchImg.translateX < 10))){
                this.pinchTransform = true;
                this.$refs.pinchImg.translateX = 0;
            }

            if(this.$refs.pinchImg.scaleY == 1 && ((this.$refs.pinchImg.translateY > 10) || (this.$refs.pinchImg.translateY < 10))){
                this.pinchTransform = true;
                this.$refs.pinchImg.translateY = 0;
            }

            if (this.$refs.pinchImg.scaleX < 1) {
                this.pinchTransform = true;
                this.$refs.pinchImg.scaleX = 1;
                this.$refs.pinchImg.scaleY = 1;
            }
            if (this.$refs.pinchImg.scaleX > 3) {
                this.pinchTransform = true;
                this.$refs.pinchImg.scaleX = 3;
                this.$refs.pinchImg.scaleY = 3;
            }
        },
        pinch: function (evt) {
            this.pinchTransform = false;
            this.$refs.pinchImg.scaleX = this.$refs.pinchImg.scaleY = this.initScale * evt.zoom;
        },
        pressMove: function (num, evt) {
            evt.preventDefault();
            this.pinchTransform = false;
            this.$refs.pinchImg.translateX += evt.deltaX;
            this.$refs.pinchImg.translateY += evt.deltaY;
        },

        initData(){
            this.get().then((res) =>{
                this.dataElement = res.data[this.dataIndex];
            })
        }
    }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "./intro.styl"
</style>