<template>
  <div class="equipment_content main_content">
    <div class="inner_content">
        <div id="eqiup_list">
            <cube-scroll class="equip_ul_wrap"
                ref="scroll"
            :data="equipment"
            :options="scrollOptions"
            @pulling-up="onPullingUp"
            >
                <ul class="product_ul">
                    <!-- <div class="more" style="display: none;"><span class="text"><em><img src="/images/loading.gif" alt=""></em><p>加载更多...</p></span></div> -->
                    <li class="item" v-for="(item, index) in equipment" @click="tap(item.images, $event)">
                        <a href="javascript:;" class="product_good">
                            <div class="product_img">
                                <img class="lazy" v-lazy="item.images">
                            </div>

                            <div class="productlist_title"><p>{{item.name}}</p></div>
                            <div class="price_day">{{item.price}}</div>
                        </a>
                        
                    </li>
                </ul>
                <div class="bottom_tip" v-if="noMore">
                    <span>没有更多数据了</span>
                </div>
            </cube-scroll>
        </div>
    </div>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div class="pop_item_img" v-show="cover">
            <div class="item_cover"></div>
            <div class="scale_img_wrap" :class="{'scaleImg': cover}" ref="scaleImg" @click="untap">
                <img :src="popImg" onclick="return false" :class="{'active': pinchTransform}" alt="" ref="pinchImg" class="pop_img" v-finger:pinch="pinch" v-finger:multipoint-start="multipointStart" v-finger:multipoint-end="multipointEnd" v-finger:press-move="pressMove.bind(this, 12)">
                <span>{{test}}</span>
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
    name: "v-equipment",
    data(){
        return {
            test: "",               // 
            isDoubleClick: false,   // 双击放大
            pinchTransform: false,  
            cover: false,           // 弹出图片层
            popImg: "",             // 弹出图片
            initScale: 1,           // 缩放倍率
            EQUIPMENTDATE: [],      // 返回的json数据
            equipment: [],          // 要显示的数据
            equipmentLength: 0,     // 数据长度
            equipNumber:0,          // 当前要显示的数据个数
            pullUpLoad: true,       // 下拉
            noMore: false,          
            scrollbar: true,
            pullUpRefresh: true,
            pullUpLoadThreshold: 90
        }
    },
    computed: {
        ...mapState([
            "headerTitle"
        ]),
        scrollOptions() {
            return {
                pullUpLoad: this.pullUpLoadObj,
                scrollbar: this.scrollbarObj
            }
        },
      
        pullUpLoadObj: function () {
            return this.pullUpLoad ? {
                threshold: parseInt(this.pullUpLoadThreshold),
                txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
            } : false
        },
        scrollbarObj: function(){
            return this.scrollbar ? true : false
        }
    },

    mounted(){
        axios.interceptors.request.use(config => {
            // console.log("request 请求前");
            return config;
        })

        this.$nextTick(() => {
            this.$store.commit("UPDATE_FETCHLOADING", true);
            this.$store.commit("UPDATE_FIXEDCLASS", this.headerTitle);
            this.get().then((res) => {
                this.$store.commit("UPDATE_FETCHLOADING", false);
                this.EQUIPMENTDATE = res.data;
                this.equipmentLength = res.data.length-1;
                this.onPullingUp();
            });
        })

    },

    methods: {
        get: function(){
            return axios.get("static/json/productLoad.json", {})
        },
        tap: function(img, evt) { 
            var producImg = evt.currentTarget.querySelector(".product_img");
            var offsetTop = producImg.getBoundingClientRect().top;
            var offsetLeft = producImg.getBoundingClientRect().left;
            this.$refs.scaleImg.style.left = offsetLeft + "px";
            this.$refs.scaleImg.style.top = offsetTop + "px";
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
        onPullingUp() {
            // Mock async load.
            if(this.equipNumber < this.equipmentLength){
                setTimeout(function(){
                    this.equipment = this.equipment.concat(this.EQUIPMENTDATE[this.equipNumber]);
                    this.equipNumber++;
                }.bind(this), 1000)
            }else{
                this.$refs.scroll.forceUpdate()
                this.noMore = true;
                setTimeout(function(){
                    this.noMore = false;
                }.bind(this), 1000)
            }
        }
    } 
}


</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "/equipment.styl"
</style>