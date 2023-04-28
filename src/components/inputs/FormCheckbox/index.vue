<template>
  <div
    class="checkbox-input"
    :class="[
      {
        'checkbox-input--disabled': disabled
      }
    ]"
  >
    <label class="form-check-label">
      <input
        type="checkbox"
        :disabled="disabled"
        :true-value="trueValue"
        :false-value="falseValue"
        :checked="checked"
        :value="value"
        v-bind="{
          ...$attrs
        }"
        v-on="{
          ...$listeners,
          change: onChange
        }"
      />
      <span :class="{ 'mr-1': $slots.default }"></span>
      <slot />
    </label>
  </div>
</template>

<script>
import Vue from "vue";
import { IFormCheckbox  } from "./IFormCheckbox";

export default {
  name: "FormCheckbox",
  extends: Vue.extend(IFormCheckbox),
  model: {
    prop: "localValue",
    event: "checkedChange"
  },
  computed: {
    checked() {
      // default checked一律轉型為boolean
      const defaultChecked = !!this.$attrs.checked;

      if (this.hasModelDirective) {
        if (this.value) {
          const hasValueInside =
            this.localValue.find(
              value => JSON.stringify(value) === JSON.stringify(this.value)
            ) !== undefined;

          return hasValueInside;
        }
        if (this.trueValue) return this.localValue === this.trueValue;
        if (this.falseValue && defaultChecked) return !(this.localValue === this.falseValue);

        return this.localValue;
      }

      return defaultChecked;
    },
    hasModelDirective() {
      return !!this.$listeners.checkedChange;
    }
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
    onChange(event) {
      const { target } = event;
      if (this.hasModelDirective && this.value) {
        this.arrayHandler(target.checked);
      }
      this.$emit("change", event);
    }
  }
};
</script>

<style lang="scss" scoped>

.checkbox-input {
  display: inline-block;
  user-select: none;

  label {
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  &--disabled {
    label {
      cursor: not-allowed;
    }
  }

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    visibility: hidden;

    &:checked {
      + span {
        background-color: $primary;
        border-color: $primary;

        &::after {
          display: block;
        }
      }
    }

    + span {
      display: inline-block;
      position: relative;
      width: 16px;
      height: 16px;
      min-width: 16px;
      background-color: $white;
      border: 1px $gray-800 solid;
      border-radius: 2px;
      transition: background-color ease 0.2s, border-color ease 0.2s;

      &::after {
        content: "";
        display: none;
        position: absolute;
        top: 3px;
        left: 3px;
        width: 8px;
        height: 5px;
        border-bottom: 1.5px $white solid;
        border-left: 1.5px $white solid;
        transform: rotate(-45deg);
      }
    }

    &:disabled {
      + span {
        border-color: $gray-600;
      }

      &:checked {
        + span {
          background-color: $gray-600;
        }
      }
    }
  }
}
</style>
