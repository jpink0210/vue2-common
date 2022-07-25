<template>
  <div>
    this is demo
      <chech-box-ary-input
        v-for="(item, index) in Array.from(Array(10).keys())"
        :key="`item-check-${index}`"
        :value="item"
        v-bind="{
          localValue
        }"
        @change="change"
        @checkedChange="checkedChange"
      >
        {{ item }}
      </chech-box-ary-input>
  </div>
</template>

<script>
import ChechBoxAryInput from "@/components/ChechBoxAryInput";

export default {
  name: 'Demo',
  components: {
    ChechBoxAryInput
  },
  data() {
    return {
      localValue : ["1",2,3,4]
    }
  },
  mounted: function () {
  },
  methods: {
    change() {},
    checkedChange() {
      console.log("checkedChange")
    },
  }
}
</script>
