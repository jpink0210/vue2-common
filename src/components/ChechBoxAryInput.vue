<template>
  <div>
      <label>
          <input type="checkbox"
            :disabled="disabled"
            :checked="checked"
            v-on="{
              ...$listeners,
              change: onChange
            }"
          >
          <slot />
      </label>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "ChechBoxAryInput",
  model: {
    prop: "localValue",
    event: "checkedChange"
  },
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    localValue: {
      type: [Array],
      default: false
    },
    value: {
      type: [Boolean, String, Number, Array, Object],
      default: ""
    },
    trueValue: {
      type: [String, Number],
      default: ""
    },
    falseValue: {
      type: [String, Number],
      default: ""
    }
  },
  computed: {
    hasModelDirective() {
      // 確認你預設的 model 有 $listeners, 有能耐更動 localValue 
      return !!this.$listeners.checkedChange;
    },
    isLocalValueArray() {
      return Array.isArray(this.localValue);
    },
    checked() {
      // 如有設定default checked一律轉型為boolean
      const defaultChecked = !!this.$attrs.checked;

      if (this.hasModelDirective) {
        // 如localValue為Array, 則做序列化比對判斷Array有沒有value
        if (this.isLocalValueArray && this.value) {
          const hasValueInside =
            this.localValue.find(
              value => JSON.stringify(value) === JSON.stringify(this.value)
            ) !== undefined;

          return hasValueInside;
        }
      }
      return defaultChecked;

    },
  },
  methods: {
    arrayHandler(checked) {
      const value = checked
        ? [...this.localValue, this.value]
        : this.localValue.filter(
            item => JSON.stringify(item) !== JSON.stringify(this.value)
          );
      this.$emit("checkedChange", value);
    },
    defaultHandler(checked) {
      const value = (checked ? this.trueValue : this.falseValue) || checked;
      this.$emit("checkedChange", value);
    },
    onChange(event) {
      const { target } = event;

      if (this.hasModelDirective) {
        // 如localValue為Array, 則執行陣列處理&回傳
        if (this.isLocalValueArray && this.value) {
          this.arrayHandler(target.checked);
        } else {
          this.defaultHandler(target.checked);
        }
      }

      this.$emit("change", event);
    }
  }
})
</script>

<style>

</style>