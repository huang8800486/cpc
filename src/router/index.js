import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/home/index'
import Activity from '@/components/activity/activity'
import Address from '@/components/address/address'
import Equipment from '@/components/equipment/equipment'
import Intro from '@/components/equipment/intro'
import Instrument from '@/components/equipment/instrument'
Vue.use(Router)

export default new Router({
    routes: [
        { 
            path: '/', 
            redirect: '/index'    // 默认就跳转此页面
        }, 
        {
            path: '/index',
            name: 'Index',
            component: Index
        },
        {
            path: '/activity',
            name: 'Activity',
            component: Activity
        },
        {
            path: '/address',
            name: 'Address',
            component: Address
        },
        {
            path: '/equipment',
            name: 'Equipment',
            component: Equipment,
            children:[
                { 
                    path: '/', 
                    redirect: 'instrument'    // 默认就跳转此页面
                }, 
                {
                    path: 'instrument',
                    name: 'Instrument',
                    component: Instrument,
                    // meta: {
                    //     keepAlive: true, //此组件需要被缓存
                    // }
                },
                {
                    path: 'intro',
                    name: 'Intro',
                    component: Intro
                }
            ]
        }

        
    ]
})
