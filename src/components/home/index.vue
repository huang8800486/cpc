<template>
  <div id="home" class="main_content">
        <div class="inner_content">
            <div class="importance_index interspace">
                <div class="studio_active">
                    <div class="banner_item">
                        <div class="padding_item">
                            <cube-slide ref="slide" :data="bannerItems" :autoPlay="true" :showDots="false" @change="changePage">
                                <cube-slide-item v-for="(item, index) in bannerItems" :key="index">
                                  <a :href="item.url" class="slide_item">
                                    <img :src="item.image">
                                  </a>
                                </cube-slide-item>
                            </cube-slide>
                            <span class="pagation">{{bannerindex}} / {{bannerItems.length}}</span>
                        </div>
                    </div>
                    <ul class="clearfix">
                        <li class="list_itme">
                            <a href="javascript:;" class="img_box">
                                <div class="padding_img">
                                    <img class="lazy" v-lazy="'static/images/index/Index-2.jpg'" alt="">
                                    <div class="text">
                                        <div class="txt">
                                            <p>保 富 图</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="list_itme">
                            <a href="javascript:;" class="img_box">
                                <div class="padding_img">
                                    <img class="lazy" v-lazy="'static/images/index/Index-3.jpg'" alt="">
                                    <div class="text">
                                        <div class="txt">
                                            <p>布 朗</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="studio_recommend_index interspace">
                <div class="photography_title">
                    <div class="cen_tit">
                        <span class="line"></span>
                        <div class="caption">
                            <span class="txt">彩摄汇租赁</span>
                        </div>
                    </div>
                </div>
                <div class="studio intro_photo">
                    <ul class="clearfix">
                        <li class="list_itme">
                            <a href="javascript:;" class="img_box">
                                <div class="padding_img">
                                    <img class="lazy" v-lazy="'static/images/index/Index-6.jpg'" alt="">
                                </div>
                                <div class="scene_price clearfix">
                                    <span class="ti fl">影棚出租</span>
                                    <p class="price fl">提供多种专业影棚</p>
                                </div>
                            </a>
                        </li>
                        <li class="list_itme">
                            <a href="javascript:;" class="img_box Productrent">
                                <div class="padding_img">
                                    <img class="lazy" v-lazy="'static/images/index/pic01_02.jpg'" alt="">
                                </div>
                                <div class="scene_price clearfix">
                                    <span class="ti fl">器材出租</span>
                                    <span class="price fl">好的摄影从设备开始</span>
                                </div>
                            </a>
                        </li>
                        <li class="list_itme">
                            <a href="javascript:;" class="img_box">
                                <div class="padding_img">
                                    <img class="lazy" v-lazy="'static/images/index/Index-4.jpg'" alt="">
                                </div>
                                <div class="scene_price clearfix">
                                    <span class="ti fl">教室出租</span>
                                    <p class="price fl">提供教室、可安排课程</p>
                                </div>
                            </a>
                        </li>
                        <li class="list_itme">
                            <a href="javascript:;" class="img_box">
                                <div class="padding_img">
                                    <img class="lazy" v-lazy="'static/images/index/Index-5.jpg'" alt="">
                                </div>
                                <div class="scene_price clearfix">
                                    <span class="ti fl">场地出租</span>
                                    <p class="price fl">提供环境优美的场地</p>
                                </div>
                            </a>
                        </li>

                    </ul>
                </div>
            </div>

            <div class="activity_index interspace">
                <div class="photography_title">
                    <div class="cen_tit">
                        <span class="line"></span>
                        <div class="caption">
                            <span class="txt"><a href="/Activity/list.html">活动详情</a></span>
                        </div>
                    </div>
                </div>
                <div class="acti_con">
                    <div class="new_active_over clearfix">
                        <div class="new_active_img">
                            <div class="active_padding">
                                <div class="pad_act">
                                    <a href="javascript:;">
                                        <img class="lazy" v-lazy="'http://www.u-cpc.com:8091/filedata/0/image/20180323/20180323172920_6068_400.JPG'">
                                    </a>
                                    <div class="text">
                                        <div class="txt">
                                            <p>2017年11月19日，Profoto(保富图)开放日活动在影棚举办。</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a href="javascript:;" class="active_tit" title="Profoto(保富图)开放日活动"><p>Profoto(保富图)开放日活动</p></a>
                        </div>
                        <div class="new_active_img">
                            <div class="active_padding">
                                <div class="pad_act">
                                    <a href="javascript:;">
                                        <img class="lazy" v-lazy="'http://www.u-cpc.com:8091/filedata/0/image/20180323/20180323173202_4349_400.jpg'">
                                    </a>
                                    <div class="text">
                                        <div class="txt">
                                            <p><span>2017年11月21日，Hasselblad(哈苏)连同<span>Broncolor(布朗)</span><span></span>，于影棚内举行了一场专业摄影灯光的技术创意技术讲座，活动邀来布朗首席摄影师 Urs Recher 为主讲嘉宾，为参与讲座的摄影爱好者讲解并示范各种灯光的应用及效果。</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a href="javascript:;" class="active_tit" title="Hasselblad(哈苏)+Broncolor(布朗)创意技术讲座"><p>Hasselblad(哈苏)+Broncolor(布朗)创意技术讲座</p></a>
                        </div>
                        <div class="new_active_img">
                            <div class="active_padding">
                                <div class="pad_act">
                                    <a href="javascript:;">
                                        <img class="lazy" v-lazy="'http://www.u-cpc.com:8091/filedata/0/image/20180323/20180323173515_8255_400.jpg'">
                                    </a>
                                    <div class="text">
                                        <div class="txt">
                                            <p></p><p>2017年12月15日，Phase One 丹麦总部技术支持总监 Jasper ，跟大家共同见证新产品的革新技术，IQ3 100MP Trichromatic 和 Capture &nbsp;One 11 的功能使用技巧，与你共同分享。</p><p></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a href="javascript:;" class="active_tit" title="Phase One (飞思) 新品品鉴会"><p>Phase One (飞思) 新品品鉴会</p></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
    export default{
        name:"v-index",
        data(){
            return{
                bannerItems: [
                    {
                        url: 'javascript:;',
                        image: 'static/images/index/Index-1.jpg'
                    },
                    {
                        url: 'javascript:;',
                        image: 'static/images/index/Index-2.jpg'
                    },
                    {
                        url: 'javascript:;',
                        image: 'static/images/index/Index-3.jpg'
                    }
                ],
                bannerindex: 1
            }
        },
        methods:{
            changePage(current) {
                this.bannerindex = current + 1;
            },
        }
    }
</script>   
<style lang="stylus">
@import "/index.styl"
</style>