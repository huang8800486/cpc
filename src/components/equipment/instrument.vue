<template>
    <div id="eqiup_list">
        <cube-scroll class="equip_ul_wrap"
            ref="scroll"
        :data="equipment"
        :options="scrollOptions"
        @pulling-up="onPullingUp"
        >
            <ul class="product_ul">
                <li class="item" v-for="(item, index) in equipment" :data-index="index" @click="equipIntroFun(index)">
                    <router-link :to="'intro?item=' + index" class="product_good">
                        <div class="product_img">
                            <!-- <p style="position:absolute;left:40%;top:40%;font-size:50px;color:red;z-index:100;">{{index}}</p> -->
                            <img class="lazy" v-lazy="item.images">
                        </div>

                        <div class="productlist_title"><p>{{item.name}}</p></div>
                        <div class="price_day">{{item.price}}</div>
                    </router-link>
                    
                </li>
            </ul>
            <div class="bottom_tip" v-if="noMore">
                <span>没有更多数据了</span>
            </div>
        </cube-scroll>
    </div>
</template>
<script>
import axios from 'axios';
import Transform from "css3transform"
import { mapState } from 'vuex';
export default {
    name: "v-instrument",
    data(){
        return {
            EQUIPMENTDATE: [],      // 返回的json数据
            equipment: [],          // 要显示的数据
            addEquip:[],            //
            equipmentLength: 0,     // 数据长度
            initFlag: true, 
            initNumber:8,
            equipNumber:4,          // 当前要显示的数据个数
            pullUpLoad: true,       // 下拉
            noMore: false,          
            scrollbar: true,
            pullUpRefresh: true,
            pullUpLoadThreshold: 90
        }
    },
    computed: {
        ...mapState([
            "headerTitle",
            "dataIndex"
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
        equipIntroFun(index){
            this.$store.commit("UPDATE_DATAINDEX", index);
        },
        onPullingUp() {
            // Mock async load.
            if(this.initFlag){
                setTimeout(function(){
                    for(let i = 0; i < this.initNumber; i++){
                        this.equipment = this.equipment.concat(this.EQUIPMENTDATE[i]);
                    }
                }.bind(this), 1000)
                this.initFlag = false;
                return false;
            }

            if(this.initNumber < this.equipmentLength){
                setTimeout(function(){
                    this.initNumber += 4;
                    var num = Math.abs(this.equipmentLength - this.initNumber);
                    if(this.initNumber >= this.equipmentLength){
                        this.equipNumber = Math.abs(5 - num);
                    }
                    for(let i = 0; i < this.equipNumber; i++){
                        this.equipment = this.equipment.concat(this.EQUIPMENTDATE[this.initNumber-4 + i]);
                    }
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


