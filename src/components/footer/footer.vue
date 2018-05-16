<template>
    <div class="footer_wrap">
        <div id="footer">
            <div class="webfooter">
                <div class="copy_right">
                    <p>彩摄汇传媒有限公司版权所有©2017</p>
                    <p><a href="http://www.miitbeian.gov.cn">[粤ICP备17096784号]</a> </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import vMenu from '../menu/menu.vue';
import { mapState } from 'vuex';
export default {
    name: "App",
    data() {
        return {

        };
    },
    computed: {
        ...mapState([
            "headerTitle",
            "FixedClass"
        ])
    },
    methods: {}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "./footer.styl"
</style>

