<template>
  <DropdownMix
    ref="dropdown"
    :list-show="dropdownShow"
    :options="selectOptions"
    :high-light="highLight"
    select-type="select"
    tabindex="0"
    @select="menuSelect"
    @blur.native="onBlur"
    @click.native="onFocus"
  >
    <template slot="inputSpace">
      <div
        ref="input"
        class="form-control d-flex flex-wrap input-show d-flex align-items-center"
        :class="[{ 'input-disabled': selectDisabled }]"
      >
        <span
          class="h3 text-gray-dark form-control--placeholder"
          :class="[{ placeholder: !selectValue }]"
        >
          {{inputTextShow}}
        </span>
      </div>
    </template>
  </DropdownMix>
</template>

<script>
import VueTypes from "vue-types";
import FormInput from "../../components/inputs/FormInput";
import DropdownMix from "../../components/dropdown/DropdownMix";
import isEmpty from "lodash/isEmpty";

export default {
  name: "Select",
  components: {
    DropdownMix,
    FormInput
  },
  model: {
    prop: "selectValue",
    event: "change"
  },
  props: {
    highLight: VueTypes.bool.def(true),
    selectValue: VueTypes.arrayOf(
      VueTypes.shape({
        text: VueTypes.string.def(""),
        value: VueTypes.any.def(0)
      })
    ).isRequired.def([]),
    selectOptions: VueTypes.arrayOf(
      VueTypes.shape({
        text: VueTypes.string.def(""),
        value: VueTypes.any.def(0)
      })
    ).isRequired.def([]),
    selectPlaceholder: VueTypes.string.def(""),
    selectDisabled: VueTypes.bool.def(false),
  },
  data: function() {
    return {
      dropdownShow: false
    };
    
  },
  watch: {
    dropdownShow(newVal) {
      if (newVal) {
        document.body.addEventListener("click", this.clickDownHandler);
      } else {
        document.body.removeEventListener("click", this.clickDownHandler);
      }
    }
  },
  updated() {
    this.$emit("setDropdownPosition", this.$refs.dropdown, this.$refs.input);
  },
  mounted() {},
  beforeDestroy() {
    document.body.removeEventListener("click", this.clickDownHandler);
  },
  computed: {
    inputTextShow() {
      const { selectValue } = this;
      return !isEmpty(selectValue) ? selectValue[0].text : this.selectPlaceholder
    },
    hasModelDirective() {
      return !!this.$listeners.change;
    },
  },
  methods: {
    onFocus() {
      if (!this.selectDisabled) {
        this.dropdownShow = !this.dropdownShow;
      }
    },
    onBlur() {
      this.dropdownShow = false;
    },
    clickDownHandler(e) {
      this.$nextTick(() => {
        if (!this.$refs["dropdown"].$el.contains(e.target)) {
          this.dropdownShow = false;
        }
      });
    },
    menuSelect(model) {
      if (!model) return;
      if (!this.hasModelDirective) return;
      this.$emit("change", model);
      setTimeout(() => {
        this.dropdownShow = false;
      }, 0);
    }
  }
};
</script>

<style scoped lang="scss">

.form-control {
  cursor: default !important;
}

.input-disabled {
  cursor: not-allowed !important;
  background-color: $gray-100 !important;
  opacity: 0.5;

  .text-region {
    font-weight: 400 !important;
  }
}

.text-region {
  left: 12px;
  padding-right: 35px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.blur-input {
  width: 0;
  height: 0;
  opacity: 0;
}

.input-show {
  padding: 5px 8px;
  min-height: 44px;

  &.multiple {
    white-space: normal;
    height: auto;
  }

  &:disabled {
    .placeholder {
      font-weight: $font-weight-normal;
    }
  }
}
</style>
