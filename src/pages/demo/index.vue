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
      <div class="col-3">
        <FormInput
          v-model="inputVal_num"
          type="number"
        />
      </div>
      <div class="w-100"></div>
      <div>
        <FormRadio v-model="inputVal_r" value="1"> 1 </FormRadio>
        <FormRadio v-model="inputVal_r" value="2"> 2 </FormRadio>
        <FormRadio v-model="inputVal_r" value="3"> 3 </FormRadio>
        <FormRadio v-model="inputVal_r" value="4"> 4 </FormRadio>
      </div>
      <div class="w-100"></div>
      <p>localValue required && must Array</p>
      <div class="w-100"></div>
      <div>
        <FormCheckbox  :localValue="input_checkbox" :value="1">1</FormCheckbox>
        <FormCheckbox  :localValue="input_checkbox" :value="2">2</FormCheckbox>
        <FormCheckbox  :localValue="input_checkbox" :value="3">3</FormCheckbox>
        <FormCheckbox  :localValue="input_checkbox" :value="4">4</FormCheckbox>
      </div>
      <div class="w-100"></div>
    </div>

    <div class="row bg-mt1 p-3" :style="{minHeight: `300px`}">
        <div class="col-4">
          <Select
            :select-options="selectOptions"
            v-model="selectValue"
            select-placeholder="請輸入文字"
            class="position-relative ml-2"
            @change="selectPureChange"
          />
        </div>
        <div class="col-4">

          <SelectSingle
            :select-options="selectOptions"
            v-model="selectSingleValue"
            select-placeholder="請輸入xx"
            class="position-relative ml-2"
            @change="selectSingleChange"
          />
        </div>
      </div>
  </div>
</template>

<script>
import ChechBoxAryInput from "@/components/ChechBoxAryInput";
import CheckBox from "@/components/inputs/CheckBox";
import FormInput from "@/components/inputs/FormInput";
import FormRadio from "@/components/inputs/FormRadio";
import FormCheckbox from "@/components/inputs/FormCheckbox";

import Select from "@/components/forms/Select";
import SelectSingle from "@/components/forms/SelectSingle";

export default {
  name: 'Demo',
  components: {
    ChechBoxAryInput,
    CheckBox,
    Select,
    SelectSingle,
    FormInput,
    FormRadio,
    FormCheckbox
  },
  data() {
    return {
      localValue : ["1",2,3,4],
      inputVal_1: "",
      inputVal_num: "",
      inputVal_r: "",
      input_checkbox: [],
      selectValue: [],
      selectSingleValue: [],
      selectOptions: [
        { text: "藝術", value: 1 },
        { text: "文學", value: 2 },
        { text: "科學", value: 3 },
        { text: "哲學", value: 4 },
        { text: "商業", value: 5 }
      ],
    }
  },
  computed: {
  },
  mounted: function () {
  },
  methods: {
    change() {},
    checkedChange() {
      console.log("checkedChange")
    },
    selectSingleChange(modal) {
      this.selectSingleValue = [modal];
    },
    selectPureChange(modal) {
      this.selectValue = [modal];
    }
  }
}
</script>
