<template>
  <div
    class="dropdown"
    :class="{
      'dropdown__highlight':
        listShow &&
        (selectType == 'select' || selectType == 'select-multiple') &&
        highLight
    }"
    @keydown="onKeyUp"
  >
    <div v-show="listShow && isLoading" class="multiselect__spinner" />
    <slot name="inputSpace" />
    <div
      v-show="listShow && options.length > 0"
      ref="lister"
      :class="listClass"
    >
      <ul
        v-if="isMenuShow"
        class="multiselect__content w-100"
        @mousedown.prevent
      >
        <li
          v-for="(option, i) in options"
          :key="i"
          class="multiselect__element position-relative"
          :class="{ 'border-bottom': option.underlined }"
          @mouseover="onHover(i)"
        >
          <!-- 只有選單式-多選，使用此元件 -->
          <span
            v-if="selectType == 'select-multiple'"
            class="multiselect__option d-flex align-items-center"
            :class="{ 'multiselect__option--hover': orderHover == i }"
            @click="autoCompleteMenuClick(option)"
          >
            <FormCheckbox
                :localValue="multiValue"
                :value="option.value"
                @click="autoCompleteMenuClick(option)"

            >
                {{option.text}}
            </FormCheckbox>
          </span>
          <!-- 以下其他情況/單選 -->
          <!-- eslint-disable vue/no-v-html -->
          <slot
            v-else
            name="commonOption"
            :option="option"
            :index="i"
            :orderHover="orderHover"
          >
            <span
              class="multiselect__option d-flex align-items-center"
              :class="{ 'multiselect__option--hover': orderHover == i }"
              data-nosnippet
              @click="autoCompleteMenuClick(option)"
              @keydown.enter="autoCompleteMenuClick(option)"
              v-html="highlightText(option.text)"
            />
          </slot>
          <!--eslint-enable vue/no-v-html-->
        </li>
      </ul>
      <ul
        v-if="selectType == 'select-multiple' && maxAlertShow"
        class="multiselect__content"
      >
        <li class="multiselect__element">
          <span class="multiselect__option d-flex align-items-center">
            <span>{{ maxAlertText }}</span>
          </span>
        </li>
      </ul>
    </div>
    <div
      v-if="listShow && noOptionsTips && options.length === 0"
      :class="listClass"
    >
      <ul class="multiselect__content">
        <li class="multiselect__element">
          <span class="multiselect__option d-flex align-items-center">
            <span>{{ noOptionsTips }}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import VueTypes from "vue-types";
import find from "lodash/find";
import FormCheckbox from "../../components/inputs/FormCheckbox";

export default {
  name: "Dropdown",
  components: {
    FormCheckbox
  },
  props: {
    highLight: VueTypes.bool.def(true),
    positionRelative: VueTypes.bool.def(false),
    listShow: VueTypes.bool.def(false),
    isLoading: VueTypes.bool.def(false),
    options: VueTypes.array.def([]),
    selectType: VueTypes.string.def("single"),
    max: VueTypes.number.def(100),
    multiValue: VueTypes.array.def([]),
    menuAlwaysShow: VueTypes.bool.def(false),
    maxTipText: VueTypes.string.def(""),
    maxAlertNoShow: VueTypes.bool.def(false),
    noOptionsTips: VueTypes.string.def("")
  },
  data: function() {
    return {
      orderHover: 0,
      checkedPass: true
    };
  },
  computed: {
    isMenuShow: function() {
      return this.multiValue.length < this.max || this.menuAlwaysShow;
    },
    maxAlertText() {
      return this.maxTipText ? this.maxTipText : `最多 ${this.max} 項`;
    },
    maxAlertShow() {
      return !this.maxAlertNoShow && this.multiValue.length >= this.max;
    },
    listClass() {
      return {
        "high-light": this.highLight,
        "position-relative": this.positionRelative,
        "multiselect__content-wrapper": true
      };
    }
  },
  watch: {
    options() {
      this.orderHover = -1;
    }
  },
  mounted() {},
  methods: {
    change($event) {
      let status = $event.target.checked;
      // 選取大於max，checkbox改回未選
      if (status && !this.checkedPass) {
        $event.target.checked = false;
      }
    },
    autoCompleteMenuClick(model) {
      // checkedPass小於max ，checkbox狀態可變更
      this.checkedPass = this.multiValue.length < this.max;
      this.$emit("select", model);
    },
    highlightText(text) {
      // const replaceReg = new RegExp(this.dataModel.text, 'g');
      // return text.replace(replaceReg, `<b>${this.dataModel.text}</b>`);
      return text;
    },
    onKeyUp(e) {
      if (!this.listShow) return;
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          if (this.orderHover > 0) {
            this.orderHover = this.orderHover - 1;
            this.detectScroller();
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (this.orderHover < this.options.length - 1) {
            this.orderHover = this.orderHover + 1;
            this.detectScroller();
          }
          break;
        case "Enter":
          if (!this.isMenuShow) return;
          if (this.orderHover < 0) return;
          this.$emit("select", this.options[this.orderHover]);
          this.orderHoverStatus(false);
          this.orderHover = -1;
          break;
        case "Escape":
          this.$emit("select", null);
          this.orderHoverStatus(false);
          this.orderHover = -1;
          break;
        default:
          break;
      }
    },
    orderHoverStatus(status) {
      this.$emit("orderHoverStatus", status);
    },
    onHover(order) {
      this.orderHover = order;
    },
    detectScroller() {
      this.orderHoverStatus(true);
      const scrollPage = Math.floor(this.orderHover / 7);
      this.$refs.lister.scrollTop = this.$refs.lister.clientHeight * scrollPage;
    },
    find,
  }
};
</script>

<style scoped lang="scss">
@import "../../scss/forms/Select.scss";

.dropdown {
  box-shadow: 0 0 0 2px #fff;
  transition: background-color .1s ease-in-out;
  outline: 0;
  border-radius: 4px;

  &__highlight {
    box-shadow: 0 0 0 2px $primary !important;
  }
}

.multiselect {
  &__tags {
    min-height: 44px;
    height: auto;
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 8px;
    padding-right: 36px;
  }

  &__option {
    padding: 0;
  }

  &__option--hover {
    background: $cyan;
    color: inherit;
  }

  &__spinner {
    z-index: 51;
    top: 20px;
    margin-top: -17px;
    background: none;

    &::after,
    &::before {
      border-top-color: $primary;
    }
  }

  .form-element-checkbox {
    display: block;
    padding: 8px 24px 8px 12px;
  }

  .checkbox {
    left: 12px;
  }

  .limit-text {
    padding: 8px 24px 8px 12px;
  }
}
</style>
