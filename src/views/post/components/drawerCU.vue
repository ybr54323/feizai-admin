<script setup>
import { ref, reactive, computed, toRaw, nextTick } from "vue";
import { getPost, putPost, post } from "@/apis/post";
import { Form } from "ant-design-vue";
import { getBase64 } from "@/utils/index";
import { FILE_PREFIX } from "@/const/index";
const emit = defineEmits(["submit"]);
const visible = ref(false);
const t = ref("add");

const title = computed(() => {
  return t.value === "add" ? "创建" : "编辑";
});

const previewVisible = ref(false);
const previewImage = ref("");
const previewTitle = ref("");
const fileList = ref([]);

const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = "";
};

const handlePreview = async (file) => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj);
  }

  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value =
    file.name || file.url.substring(file.url.lastIndexOf("/") + 1);
};

const formState = reactive({
  title: "",
  content: "",
});
const modelRef = reactive({
  id: void 0,
  title: "",
  content: "",
});
const ruleRef = reactive({
  title: [{ required: true, message: "请输入" }],
  content: [{ required: true, message: "请输入" }],
});

const { resetFields, validate } = Form.useForm(modelRef, ruleRef);

const customRequest = () => {};
const onChangeFile = (data) => {
  const file = data?.file;
  file.status = "done";
};

const open = (params = {}) => {
  visible.value = true;
  const { type, record } = params;
  t.value = type;
  if (t.value === "edit") {
    getPost({ id: record.id }).then((res) => {
      const record = res?.row || {};
      const files = record?.files || [];
      nextTick(() => {
        modelRef.id = record.id;
        modelRef.title = record.title;
        modelRef.content = record.content;

        fileList.value = files.map((f, i) => {
          return {
            uid: i,
            name: f.name,
            status: "done",
            url: FILE_PREFIX + f.name,
          };
        });
      });
    });
  }
};
const close = () => {
  resetFields();
  fileList.value = [];
  visible.value = false;
};
const onFinish = () => {
  validate().then(() => {
    const formData = new FormData();
    Object.entries(toRaw(modelRef)).forEach(([k, v]) => {
      formData.append(k, v);
    });

    const files = fileList.value.map((f) => f.originFileObj);
    const originalFileNames = fileList.value.filter((f) => !f.originFileObj).map(f => f.name);

    for (let file of files) {
      if (file) formData.append("files", file);
    }
    for (let name of originalFileNames) {
      formData.append("originalFilenames", name);
    }

    const api = t.value === "add" ? post : putPost;

    api(formData).then(() => {
      resetFields();
      close();
      emit("submit");
    });
  });
};
const onReset = () => {
  resetFields();
};

defineExpose({
  open,
  close,
});
</script>
<template>
  <a-drawer :title="title" v-model:visible="visible">
    <a-form
      class="main"
      :model="formState"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
      autocomplete="off"
      @finish="onFinish"
    >
      <a-form-item
        label="title"
        :rules="[{ required: true, message: '请输入' }]"
      >
        <a-input v-model:value="modelRef.title" />
      </a-form-item>

      <a-form-item
        label="content"
        :rules="[{ required: true, message: '请输入' }]"
      >
        <a-textarea v-model:value="modelRef.content" />
      </a-form-item>

      <a-form-item label="imgs">
        <a-upload
          v-model:file-list="fileList"
          list-type="picture-card"
          @preview="handlePreview"
          @change="onChangeFile"
          :customRequest="customRequest"
          :multiple="true"
        >
          <div class="flex items-center">
            +
            <div>Upload</div>
          </div>
        </a-upload>
        <a-modal
          :visible="previewVisible"
          :title="previewTitle"
          :footer="null"
          @cancel="handleCancel"
        >
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 5, span: 19 }">
        <a-button class="mr-8" @click="onReset">重置</a-button>
        <a-button type="primary" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>
