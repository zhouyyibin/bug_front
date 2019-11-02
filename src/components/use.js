import Vue from 'vue'
import {
  Icon,
  Alert,
  Switch,
  Divider,
  LocaleProvider,
  Layout,
  Dropdown,
  Avatar,
  Menu,
  Breadcrumb,
  Drawer,
  Tooltip,
  Tag,
  Input,
  Button,
  Select,
  Card,
  Form,
  Row,
  Col,
  Modal,
  Table,
  List,
  Radio,
  Tabs,
  Tree,
  Checkbox,
  notification,
  Upload,
  Transfer,
  DatePicker,
  Spin,
  message,
  Steps,
  Popover
} from 'ant-design-vue'

Vue.use(Steps)
Vue.use(Popover)
Vue.use(Input)
Vue.use(Spin)
Vue.use(Button)
Vue.use(Select)
Vue.use(Card)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Modal)
Vue.use(Table)
Vue.use(notification)
Vue.use(Icon)
Vue.use(Alert)
Vue.use(Switch)
Vue.use(Divider)
Vue.use(LocaleProvider)
Vue.use(Layout)
Vue.use(Dropdown)
Vue.use(Avatar)
Vue.use(Menu)
Vue.use(Breadcrumb)
Vue.use(Drawer)
Vue.use(Tooltip)
Vue.use(Tag)
Vue.use(List)
Vue.use(Radio)
Vue.use(Tabs)
Vue.use(Tree)
Vue.use(Checkbox)
Vue.use(Upload)
Vue.use(Transfer)
Vue.use(DatePicker)
Vue.prototype.$notification = notification
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.$confirm = Modal.confirm
