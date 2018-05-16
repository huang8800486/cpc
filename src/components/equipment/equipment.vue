<template>
  <div class="equipment_content main_content">
    <div class="inner_content">
        <transition enter-active-class="animated fadeInRight">
            <router-view></router-view>
        </transition>
    </div>
  </div>
</template>
<script>
export default {
    name: "v-equipment",
    data(){
        return {

        }
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "./equipment.styl"
</style>
