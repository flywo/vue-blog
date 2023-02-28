<template>
  <div class="l-back">
    <div class="type-list">
      <div class="add" @click="showTypeAdd()">新建分类</div>
      <ul>
        <li
          v-for="(item, index) in types"
          :key="'type-' + index"
          :class="index === currentType ? 'type-current' : ''"
          @click="changeType(index)"
        >
          {{ item.title }}
          <i
            class="el-icon-delete-solid more"
            @click.stop="showTypeDelete(item)"
          ></i>
          <i class="el-icon-s-tools more" @click.stop="showTypeAdd(item)"></i>
        </li>
      </ul>
    </div>
    <div class="blog-list">
      <div class="add" @click="addNewBlog">新建文章</div>
      <ul>
        <li
          v-for="(item, index) in blogs"
          :key="'blog-' + index"
          :class="index === currentBlog ? 'blog-current' : ''"
          @click="changeBlog(index)"
        >
          <i
            class="el-icon-delete-solid more"
            @click="showBlogDelete(item)"
          ></i>
          <span>{{ item.title }}</span>
          <span>{{ item.preview }}</span>
        </li>
      </ul>
    </div>
    <div class="blog-content">
      <div class="left">
        <el-input
          type="text"
          placeholder="请输入标题"
          v-model="editTitle"
          maxlength="20"
          show-word-limit
          clearable
        >
          <template slot="append">
            <el-button @click="addBlog">保存</el-button>
          </template>
        </el-input>
        <div class="upload">
          <el-upload
            class="upload-image"
            drag
            action="/api/file/upload"
            :multiple="false"
            :show-file-list="false"
            :http-request="uploadImage"
            accept="image/png, image/jpeg"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
          </el-upload>
          <el-image
            class="show-image"
            :src="imageUrl || ''"
            fit="cover"
          ></el-image>
        </div>
        <el-input
          type="textarea"
          placeholder="请输入预览"
          v-model="editPreview"
          maxlength="50"
          show-word-limit
          resize="none"
        >
        </el-input>
        <el-input
          class="blog-content"
          type="textarea"
          placeholder="请输入博客内容"
          v-model="editContent"
          maxlength="65535"
          show-word-limit
          resize="none"
        ></el-input>
      </div>
      <div class="right">
        <h1 class="title">{{ editTitle }}</h1>
        <markdown-show :content="editContent || ''"></markdown-show>
      </div>
    </div>
    <div class="help" @click="openMarkdownHelp">Markdown帮助</div>
    <div class="clear" @click="clearNoUseImage">清理无用图片</div>
  </div>
</template>

<script>
import MarkdownShow from "@/components/MarkdownShow.vue";
import { upload, post, get } from "@/request/request";

export default {
  name: "AdminList",
  components: {
    MarkdownShow,
  },
  data() {
    return {
      types: [],
      currentType: null,
      blogs: [],
      currentBlog: null,
      editTitle: "",
      imageUrl: "",
      editPreview: "",
      editContent: "",
    };
  },
  mounted() {
    this.queryTypeList();
    this.queryBlogList();
  },
  methods: {
    // 添加博客
    addNewBlog() {
      this.currentBlog = null;
      this.editTitle = "";
      this.imageUrl = "";
      this.editPreview = "";
      this.editContent = "";
    },
    // 改变类型
    changeType(index) {
      this.currentType = index;
    },
    // 改变博客
    changeBlog(index) {
      this.currentBlog = index;
      const blog = this.blogs[index];
      this.editTitle = blog.title;
      this.imageUrl = blog.image;
      this.editPreview = blog.preview;
      this.editContent = blog.content;
      get(
        "/blog/detail",
        {
          id: blog.id,
        },
        false,
        false,
        (data) => {
          this.editContent = data.content;
        }
      );
    },
    // 查询类型
    queryTypeList() {
      get("/type/list", null, false, false, (data) => {
        this.types = data;
        this.currentType = null;
      });
    },
    // 查询博客列
    queryBlogList() {
      get("/blog/list", null, false, false, (data) => {
        this.blogs = data;
        this.currentBlog = null;
      });
    },
    // 博客删除弹窗
    showBlogDelete(blog) {
      this.$confirm("此操作将永久删除该博客, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          post("/blog/delete", null, { id: blog.id }, true, true, () => {
            this.queryBlogList();
          });
        })
        .catch(() => {});
    },
    // 类型删除弹窗
    showTypeDelete(type) {
      this.$confirm(
        "此操作将永久删除该类型，删除之前请先清空或移动博客列表, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          post("/type/delete", null, { id: type.id }, true, true, () => {
            this.queryTypeList();
          });
        })
        .catch(() => {});
    },
    // 类型添加弹窗
    showTypeAdd(item) {
      this.$prompt("请输入类型名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPlaceholder: "类型名称",
        inputValue: item ? item.title : null,
        inputValidator: (value) => {
          if (!value) {
            return "请输入类型名称！";
          } else if (value.length > 10) {
            return "类型长度请勿超过10个字符！";
          }
          return true;
        },
      })
        .then(({ value }) => {
          post(
            item ? "/type/update" : "/type/add",
            null,
            {
              title: value,
              id: item ? item.id : null,
            },
            true,
            true,
            () => {
              this.queryTypeList();
            }
          );
        })
        .catch(() => {});
    },
    // 添加博客
    addBlog() {
      if (this.currentType === null) {
        this.$message.error("必须先选择类型！");
        return;
      }
      post(
        this.currentBlog === null ? "/blog/add" : "/blog/update",
        null,
        {
          id:
            this.currentBlog === null ? null : this.blogs[this.currentBlog].id,
          image: this.imageUrl,
          title: this.editTitle,
          preview: this.editPreview,
          typeId: this.types[this.currentType].id,
          content: this.editContent,
        },
        true,
        true,
        () => {
          this.queryBlogList();
        }
      );
    },
    // 打开markdown帮助
    openMarkdownHelp() {
      window.open("/help");
    },
    clearNoUseImage() {
      get("/file/clear", null, true, true);
    },
    // 上传图片
    uploadImage(event) {
      if (this.imageUrl) {
        post(
          "/file/delete",
          null,
          {
            filename: this.imageUrl,
          },
          false,
          false,
          (data) => {
            console.log(data);
          }
        );
      }
      upload("/file/upload", event.file, true, true, null, (data) => {
        this.imageUrl = "/upload/" + data.path;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.l-back {
  height: 100%;
  width: 100%;
  display: flex;
  .type-list {
    width: 10%;
    height: 100%;
    overflow-y: auto;
    background-color: #404040;
    .add {
      cursor: pointer;
      color: #f2f2f2;
      text-align: center;
      margin-block: 10px;
    }
    ul {
      li {
        line-height: 40px;
        font-size: 15px;
        cursor: pointer;
        color: #f2f2f2;
        padding: 0 0 0 15px;
        .more {
          float: right;
          margin-top: 12.5px;
          margin-right: 10px;
        }
      }
      li:hover {
        background-color: #666;
      }
      .type-current {
        background-color: #666;
        border-left: 3px solid #ec7259;
        padding-left: 12px;
      }
    }
  }
  .blog-list {
    width: 20%;
    height: 100%;
    overflow-y: auto;
    border-right: 1px solid #d9d9d9;
    .add {
      line-height: 20px;
      font-size: 15px;
      font-weight: 400;
      padding: 20px 0 20px 25px;
      cursor: pointer;
      color: #595959;
      text-align: center;
    }
    ul {
      li {
        cursor: pointer;
        height: 90px;
        border-left: 5px solid transparent;
        box-shadow: 0 0 0 1px #d9d9d9;
        padding-left: 20px;
        padding-block: 15px;
        box-sizing: border-box;
        span {
          display: block;
          height: 30px;
          line-height: 30px;
          overflow: hidden;
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 18px;
          color: #333;
        }
        span:nth-child(3) {
          color: #595959;
          font-size: 16px;
        }
        .more {
          float: right;
          color: #333;
          margin-inline: 10px;
          margin-top: 22.5px;
        }
      }
      li:hover {
        background-color: #e6e6e6;
      }
      .blog-current {
        border-left-color: #ec7259;
        background-color: #e6e6e6;
      }
    }
  }
  .blog-content {
    width: 70%;
    height: 100%;
    display: flex;
    .left,
    .right {
      width: 0;
      flex-grow: 1;
    }
    .left {
      background-color: white;
      display: flex;
      flex-direction: column;
      .upload {
        display: flex;
        .upload-image {
          width: 70%;
          ::v-deep .el-upload {
            width: 100%;
          }
          ::v-deep .el-upload-dragger {
            width: 100%;
          }
        }
        .show-image {
          margin: 10px;
          width: 0;
          flex-grow: 1;
        }
      }
    }
    .blog-content {
      flex-grow: 1;
      width: 100%;
    }
    .left ::v-deep .el-input__inner {
      border-radius: 0;
    }
    .left ::v-deep .el-input-group__append {
      border-radius: 0;
    }
    .left ::v-deep .el-textarea__inner {
      border-radius: 0;
    }
    .right {
      padding: 20px;
      .title {
        font-size: 40px;
        line-height: 1.3;
        font-family: "Montserrat", sans-serif;
        letter-spacing: 0.6px;
        color: #222;
      }
    }
  }
  .help,
  .clear {
    position: fixed;
    top: 10px;
    right: 10px;
    color: #999;
    cursor: pointer;
    font-size: 16px;
  }
  .clear {
    top: 40px;
  }
}
</style>