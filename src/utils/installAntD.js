import {
  Form,
  Button,
  Input,
  Upload,
  Modal,
  Table,
  Divider,
  Drawer,
  Card,
  Space,
  Image,
} from "ant-design-vue";
const map = {
  Form,
  FormItem: Form.Item,
  Button,
  Input,
  InputPassword: Input.Password,
  Upload,
  Modal,
  Textarea: Input.TextArea,
  Table,
  Divider,
  Drawer,
  Card,
  Space,
  Image,
};
export default (app) => {
  Object.values(map).forEach((cmp) => {
    app.use(cmp);
  });

  return app;
};
