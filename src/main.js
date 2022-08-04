import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router.js";

import "ant-design-vue/dist/antd.css"; // or 'ant-design-vue/dist/antd.less'
import installAntD from "./utils/installAntD";

const app = createApp(App);
app.use(router);
installAntD(app);
app.mount("#app");
