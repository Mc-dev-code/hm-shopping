<template>
  <div class="count-box">
    <button @click="handleNum('-')" class="minus" :disabled="value <= 1">-</button>
    <input :value="value" class="inp" @change="handleChange" type="text">
    <button @click="handleNum('+')" class="add">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleNum (flag) {
    //   console.log(flag)
      if (flag === '-') {
        if (this.value <= 1) {
          return
        }
        this.$emit('input', this.value - 1)
      }
      if (flag === '+') {
        this.$emit('input', this.value + 1)
      }
    },
    handleChange (e) {
      const input = Number(e.target.value)
      if (isNaN(input) || input < 1) {
        // 输入不合法
        e.target.value = this.value
        return
      }
      this.$emit('input', input)
    }
  }
}
</script>

<style lang="less" scoped>
.count-box {
  width: 110px;
  display: flex;
  .add, .minus {
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
  }
  .inp {
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: #efefef;
    text-align: center;
  }
}
</style>
