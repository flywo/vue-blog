<template>
  <div class="input-back">
    <p>第{{ index }}句:</p>
    <el-input v-model="input" clearable></el-input>
  </div>
</template>

<script>
export default {
  name: "InputView",
  props: ["index", "value"],
  data() {
    return {
      input: null,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.input = value;
      },
    },
  },
  computed: {},
  components: {},
  mounted() {},
  beforeDestroy() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.input-back {
  height: 100%;
  width: 100%;
  p {
    width: 80px;
    text-align: center;
    color: white;
  }
}
</style>