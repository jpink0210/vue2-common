<template>
  <div
    class="radio-input"
    :class="[{ 'radio-input--disabled': disabled }]"
  >
    <label class="form-check-label">
      <input
        type="radio"
        class="form-check-input"
        :disabled="disabled"
        :checked="$attrs.localValue ? $attrs.localValue === value : checked"
        v-bind="$attrs"
        v-on="{
          ...$listeners,
          change: handleChange
        }"
      />
      <span :class="{ 'mr-1': $slots.default }"></span>
      <slot />
    </label>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  model: {
    prop: "localValue",
    event: "change"
  },
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleChange(event) {
      this.$emit("change", event.target.checked ? this.value : null);
    }
  }
});
</script>

<style lang="scss" scoped>

.radio-input {
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

  input[type="radio"] {
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
      border-radius: 100%;
      background-color: $white;
      border: 1px $gray-800 solid;
      transition: background-color ease 0.2s, border-color ease 0.2s;

      &::after {
        content: "";
        display: none;
        position: absolute;
        top: 5px;
        left: 5px;
        width: 4px;
        height: 4px;
        border-radius: 100%;
        background-color: $white;
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
