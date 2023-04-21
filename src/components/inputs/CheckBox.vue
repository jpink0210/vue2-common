<template>
  <label class="form-element-checkbox">
    <input
      type="checkbox"
      v-bind="{ ...$attrs, indeterminate, bgwhite }"
      :checked="checked"
      v-on="{ ...$listeners, change }"
    />
    <span v-if="defaultSlot">
      <slot />
    </span>
    <span v-if="text" class="ml-2" v-text="text" />
    <span class="checkbox">
      <span class="check-container" />
    </span>
  </label>
</template>

<script>
import Vue from "vue";
import VueTypes from "vue-types";

export default Vue.extend({
  name: "CCheckbox",
  model: {
    prop: "value",
    event: "changeValue"
  },
  props: {
    value: VueTypes.any.def(""),
    item: VueTypes.any.def(""),
    text: VueTypes.string.def(""),
    trueValue: VueTypes.any.def(""),
    falseValue: VueTypes.any.def(""),
    max: VueTypes.number.def(null),
    indeterminate: VueTypes.bool.def(false),
    bgwhite: VueTypes.bool.def(false)
  },
  computed: {
    defaultSlot() {
      return !!this.$slots.default;
    },
    isMulti() {
      return Array.isArray(this.value);
    },
    itemIsObject() {
      return typeof this.item === "object";
    },
    checked() {
      if (this.isMulti) {
        return this.getIndex > -1;
      } else {
        return this.value === true || this.value === this.trueValue;
      }
    },
    getIndex() {
      if (this.itemIsObject) {
        return this.value
          .map(x => JSON.stringify(x))
          .indexOf(JSON.stringify(this.item));
      } else {
        return this.value.indexOf(this.item);
      }
    }
  },
  mounted() {},
  methods: {
    change: function($event) {
      if (this.isMulti) {
        this.multiCheckboxEmit($event);
      } else {
        this.singleCheckboxEmit($event);
      }
      this.$emit("change", $event);
    },
    singleCheckboxEmit: function($event) {
      const status = $event.target.checked;
      if (status) {
        if (this.trueValue) {
          this.$emit("changeValue", this.trueValue);
        } else {
          this.$emit("changeValue", status);
        }
      } else {
        if (this.falseValue) {
          this.$emit("changeValue", this.falseValue);
        } else {
          this.$emit("changeValue", status);
        }
      }
    },
    multiCheckboxEmit: function($event) {
      let status = $event.target.checked;

      if (status) {
        if (this.max) {
          if (this.value.length < this.max) {
            this.$emit("changeValue", [...this.value, this.item]);
          } else {
            $event.target.checked = false;
            this.$emit("overChoose");
          }
        } else {
          this.$emit("changeValue", [...this.value, this.item]);
        }
      } else {
        this.value.splice(this.getIndex, 1);
        this.$emit("changeValue", [...this.value]);
      }
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// @import "~scss/global.variables.scss";

.form-element-checkbox {
  position: relative;
  margin: 0;
  display: inline-block;
  // cursor: pointer;

  * {
    vertical-align: middle;
  }

  .checkbox {
    width: 20px;
    height: 20px;
    border: 1px solid $gray-600;
    position: absolute;
    left: 2px;
    top: 50%;
    margin-top: -10px;
    transition: 0.15s all ease-in-out;
    border-radius: 4px;

    .check-container {
      position: absolute;
      top: 4px;
      left: 6px;
      box-sizing: content-box;
      width: 6px;
      height: 9px;
      transform: rotate(225deg);
      transition: 0.15s all ease-in-out;

      &::before {
        content: "";
        display: block;
        position: relative;
        width: 100%;
        height: 2px;
        top: 0;
        right: 0;
        background-color: #fff;
        border-radius: 2px;
      }

      &::after {
        content: "";
        display: block;
        position: relative;
        height: 105%;
        width: 2px;
        left: 0;
        bottom: 10%;
        background-color: #fff;
        border-radius: 2px;
      }
    }

    // &::before {
    //   position: absolute;
    //   top: 1px;
    //   left: 5px;
    //   box-sizing: content-box;
    //   width: 6px;
    //   height: 9px;
    //   content: "";
    //   border: solid #fff;
    //   border-width: 0 2px 2px 0;
    //   transform: rotate(45deg);
    //   opacity: 0;
    //   transition: 0.15s all ease-in-out;
    // }
  }

  input {
    &[type="checkbox"] {
      visibility: hidden;
      appearance: none;
      width: 24px;
      height: 24px;
      outline: 0;

      ~ * {
        cursor: pointer;
      }

      &:checked {
        ~ .checkbox {
          background-color: $primary;
          border: 1px solid $primary;

          &::before {
            opacity: 1;
          }
        }
      }

      &[disabled] {
        ~ .checkbox {
          border: 1px solid $gray-600;
        }

        &:checked {
          ~ .checkbox {
            background-color: $gray-600;
          }
        }

        ~ * {
          cursor: not-allowed;
        }
      }

      &[indeterminate] {
        ~ .checkbox {
          .check-container {
            transform: rotate(90deg);
            top: 50%;
            left: 50%;
            margin-left: -2px;
            margin-top: -2px;

            &::before {
              opacity: 0;
            }

            &::after {
              height: 9px;
            }
          }
          // &::before {
          //   opacity: 0;
          //   position: absolute;
          //   top: 50%;
          //   left: 50%;
          //   margin-top: -1px;
          //   margin-left: -4px;
          //   box-sizing: content-box;
          //   width: 8px;
          //   height: 2px;
          //   background-color: $white;
          //   content: "";
          //   border: 0 solid $white;
          //   transform: rotate(0deg);
          //   transition: 0.15s all ease-in-out;
          // }
        }

        &:checked {
          ~ .checkbox {
            .check-container {
              opacity: 1;
            }
            // &::before {
            //   opacity: 1;
            // }
          }
        }
      }

      &[bgwhite] {
        ~ .checkbox {
          background-color: $white;
        }

        &:checked {
          ~ .checkbox {
            background-color: $primary;
            border: 1px solid $primary;
          }
        }
      }
    }
  }
}
</style>
