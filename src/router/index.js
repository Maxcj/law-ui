import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const index = r => require.ensure([], () => r(require('@/page/index')), 'index');
const money = r => require.ensure([], () => r(require('@/page/money')), 'money');
const marry = r => require.ensure([], () => r(require('@/page/marry')), 'marry');
const car = r => require.ensure([], () => r(require('@/page/car')), 'car');



export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },{
			path: '/money',
			component: money,
		},{
			path: '/marry',
			component: marry,
		},{
			path: '/car',
			component: car,
		}
  ]
})
