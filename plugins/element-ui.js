// import Vue from 'vue'
// import Element from 'element-ui'
// import locale from 'element-ui/lib/locale/lang/en'

// export default () => {
//   Vue.use(Element, { locale })
// }
import Vue from 'vue'
import {  
    Loading,
    Notification,
    Message,
    Image,
    Card,
    Input,
    Button,
    
} from 'element-ui' //引入组件
Vue.prototype.$ELEMENT = { size: 'small' };
Vue.use(Loading);
Vue.use(Image);
Vue.use(Card);
Vue.use(Input);
Vue.use(Button);
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
Vue.prototype.$loading = Loading;
