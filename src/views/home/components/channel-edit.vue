<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button
        @click="isEdit = !isEdit"
        size="mini"
        round
        type="danger"
        plain
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(item, index) in myChannels"
        :key="item.id"
        @click="onMyChannelHandler(item, index)"
      >
        <!-- 插槽 -->
        <template #text>
          <span class="text" :class="{ active: active === index }"
            >{{ item.name }}
          </span></template
        >
        <template #icon>
          <van-icon
            v-show="isEdit && !fiexdChannels.includes(item.id)"
            name="close"
          /> </template
      ></van-grid-item>
    </van-grid>
    <van-cell title="频道推荐" :border="false"></van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="item in recommendChannels"
        :key="item.id"
        :text="item.name"
        @click="addChannelHandler(item)"
        ><template #icon><van-icon name="plus" /></template
      ></van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from "@/api";
import { mapGetters } from "vuex";
import { setItem } from "@/utils/storage";

export default {
  name: "ChannelEdit",
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      AllChannels: [],
      isEdit: false,
      fiexdChannels: [0],
    };
  },
  computed: {
    // 筛选推荐频道
    recommendChannels() {
      return this.AllChannels.filter((channels) => {
        return !this.myChannels.find((mychannels) => {
          return mychannels.id === channels.id;
        });
      });
    },
    // 获取本地tokens，
    ...mapGetters(["tokens"]),
  },
  created() {
    this.loadAllChannels();
  },
  methods: {
    // 获取全部频道
    async loadAllChannels() {
      const { data } = await getAllChannels();
      // console.log(data);
      this.AllChannels = data.data.channels;
    },
    // 添加我的频道
    async addChannelHandler(channel) {
      this.myChannels.push(channel);
      // console.log(this.tokens);
      if (this.tokens) {
        // 已登录
        try {
          await addUserChannel({
            id: channel.id, // 频道 id
            seq: this.myChannels.length, // 频道的 序号
          });
          this.$toast("添加成功");
        } catch (err) {
          this.$toast("添加失败");
          console.log(err);
        }
      } else {
        // 未登录
        setItem("TOUTIAO_CHANNELS", this.myChannels);
      }
    },
    // 点击切换频道
    onMyChannelHandler(channel, index) {
      if (this.isEdit) {
        // 执行删除操作
        // 小于当前选中的id
        if (index === 0) return;
        if (index <= this.active) {
          this.$emit("update-active", this.active - 1, true);
        }
        this.myChannels.splice(index, 1);
        // 删除数据持久化,
        this.deleteChannel(channel);
      } else {
        // 执行跳转操作
        this.$emit("update-active", index, false);
      }
    },
    // 我的频道删除功能
    async deleteChannel(channel) {
      if (this.tokens) {
        // 已登录
        try {
          await deleteUserChannel(channel.id);
          this.$toast("删除成功");
        } catch (error) {
          this.$toast("删除失败");
        }
      } else {
        // 未登录
        setItem("TOUTIAO_CHANNELS", this.myChannels);
      }
    },
  },
};
</script>

<style scoped lang="less">
.channel-edit {
  // white-space: nowrap;
  .channel-item {
    height: 86px;
    /deep/ .van-grid-item__content {
      background-color: #f5f5f6;
      .van-grid-item__text,
      .text {
        color: #222;
        font-size: 28px;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
    /deep/ .van-icon-close {
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: 36px;
      color: #ccc;
    }
  }
  /deep/ .recommend-grid {
    .van-grid-item__content {
      flex-direction: row;
      color: #222;
      .van-grid-item__text {
        font-size: 24px;
        margin-top: 0;
      }
      .van-icon {
        font-size: 24px;
      }
    }
  }
}
</style>