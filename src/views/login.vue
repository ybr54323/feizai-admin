<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import { useRouter } from "vue-router";
import { Form } from "ant-design-vue";
import { reactive, toRaw } from "vue";
import { login } from "@/apis/user";

const router = useRouter();
const modelRef = reactive({
  user: "",
  pwd: "",
});
const ruleRef = reactive({
  user: [{ required: true, message: "请输入" }],
  pwd: [{ required: true, message: "请输入" }],
});

const { validate, validateInfos } = Form.useForm(modelRef, ruleRef);
const onSubmit = () => {
  validate()
    .then(() => {
      login(toRaw(modelRef)).then((res) => {
        window.sessionStorage.setItem("logined", "true");
        router.push("/");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<template>
  <div class="login">
    <a-form class="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
      <a-form-item label="用户名" v-bind="validateInfos.user">
        <a-input v-model:value="modelRef.user" />
      </a-form-item>
      <a-form-item label="密码" v-bind="validateInfos.pwd">
        <a-input-password v-model:value="modelRef.pwd" />
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click.prevent="onSubmit">确定</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped lang="less">
.login {
  height: calc(100vh - 40px);

  display: flex;
  justify-content: center;
  align-items: center;
  .form {
    min-width: 50%;
  }
}
</style>
