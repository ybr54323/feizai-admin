<script setup>
import DrawerCU from "./components/drawerCU.vue";
import { getPosts, delPost } from "@/apis/post";
import { reactive, ref, onMounted } from "vue";
import { FILE_PREFIX } from "@/const/index";

const cu = ref();
const columns = [
  {
    title: "title",

    dataIndex: "title",
  },
  {
    title: "content",
    dataIndex: "content",
  },
  {
    title: "files",
    key: "files",
  },
  {
    title: "operate",
    key: "op",
  },
];
const dataSource = reactive([]);
const total = ref(0);
const params = reactive({
  page: 1,
  size: 10,
});
const fetch = () => {
  getPosts(params).then((res) => {
    dataSource.value = res?.rows || [];
    total.value = res?.total || 0;
  });
};
const onPageChange = (page, size) => {
  params.page = page;
  params.size = size;
  fetch();
};
onMounted(() => {
  fetch();
});
const onAdd = () => {
  cu.value.open({ type: "add" });
};
const onEdit = (record) => {
  cu.value.open({ type: "edit", record });
};
const onDel = (record) => {
  delPost({ id: record.id }).then(() => {
    params.page = 1;
    fetch();
  });
};
const onSubmit = () => {
  params.page = 1;
  fetch();
};
</script>
<template>
  <drawer-c-u ref="cu" @submit="onSubmit"></drawer-c-u>

  <a-card title="编辑">
    <a-button class="mb-8" type="primary" @click="onAdd">添加</a-button>
    <a-table
      bordered
      :dataSource="dataSource.value"
      :columns="columns"
      :pagination="{
        showJumper: true,
        showSizeChanger: true,
        total: total.value,
        current: params.page,
        pageSize: params.size,
        onPageChange: onPageChange,
        onShowSizeChange: onPageChange,
      }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'op'">
          <a href="javascript:;" @click="onEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a href="javascript:;" @click="onDel(record)">删除</a>
        </template>
        <template v-if="column.key === 'files'">
          <div class="flex items-center gap">
            <a-image
              style="width: 100px; border-radius: 4px"
              v-for="file in record.files"
              :src="FILE_PREFIX + file.name"
              :key="file.name"
            >
            </a-image>
          </div>
        </template>
      </template>
    </a-table>
  </a-card>
</template>
<style scoped></style>
