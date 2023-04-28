<template>
  <div>
    <div class="position-relative">
      <input
        class="form-control form-input"
        :class="[
          { 'form-input--error': error },
        ]"
        v-bind="$attrs"
        v-on="{
          ...$listeners,
          input: event => {
            $emit('input', event);
            $emit('inputValue', event.target.value);
          }
        }"
      />
      <div
        v-if="clearable"
        class="icon-delete d-flex align-items-center"
        @click="() => $emit('clear')"
      >
        <div>x</div>
      </div>
    </div>
    
    <div v-show="error" class="t4 text-danger">
      <slot name="error" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { ITextPure } from "./ITextPure.js";

export default {
  extends: Vue.extend(ITextPure),
  model: {
    prop: "value",
    event: "inputValue"
  },
  components: {
  },
  props: {},
  computed: {
  }
};
</script>

<style lang="scss" scoped>

.form-input {
  background-color: $white;
  border-color: $gray-400;
  color: $black;
  padding: prem(8px);
  caret-color: $primary;

  &--primary {
    border-color: $primary;
  }

  &::placeholder {
    color: $gray-800;
  }

  &:focus {
    border-color: $primary;
    box-shadow: none;
  }

  &--error {
    border-color: $red !important;
  }

  &:read-only {
    background-color: $white;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: $gray-100;
    border-color: $gray-400;
    color: $gray-600;
  }
}

.icon-delete {
  cursor: pointer;
  display: flex;
  align-items: center;
  position: absolute;
  top: calc(50% - 1px);
  transform: translateY(-50%);
  right: 0;
  padding: 8px;
  color: $gray-600;
}
</style>
