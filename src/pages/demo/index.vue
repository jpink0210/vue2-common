<template>
  <div>

    <p>我確實都是使用了： export default Vue.extend，為了釋出</p>    

    <p>第一個是模仿：vip 嚴格定義版本的</p>

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
    <p>第二個是模仿 cvue</p>
    <CheckBox />
    <div class="row">
      <div class="col-2">
        <FormInput
          v-model="inputVal_1"
          :clearable="inputVal_1.length > 0"
          @clear="inputVal_1 = ''"
        />
      </div>
      <div>
        <FormRadio />
      </div>
    </div>
  </div>
</template>

<script>
import ChechBoxAryInput from "@/components/ChechBoxAryInput";
import CheckBox from "@/components/inputs/CheckBox";
import FormInput from "@/components/inputs/FormInput";
import FormRadio from "@/components/inputs/FormRadio";


export default {
  name: 'Demo',
  components: {
    ChechBoxAryInput,
    CheckBox,
    FormInput,
    FormRadio
  },
  data() {
    return {
      localValue : ["1",2,3,4],
      inputVal_1: ""
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
