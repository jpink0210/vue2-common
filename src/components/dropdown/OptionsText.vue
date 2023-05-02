<template>
  <div>
    <div
      v-show="listShow && options.length > 0"
      ref="lister"
      :class="listClass"
    >
      <ul
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
          <!-- eslint-disable vue/no-v-html -->
          <slot
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

export default {
  name: "OptionsText",
  components: {
  },
  props: {
    highLight: VueTypes.bool.def(true),
    positionRelative: VueTypes.bool.def(false),
    listShow: VueTypes.bool.def(false),
    isLoading: VueTypes.bool.def(false),
    options: VueTypes.array.def([]),
    multiValue: VueTypes.any.def([]),
    menuAlwaysShow: VueTypes.bool.def(false),
    noOptionsTips: VueTypes.string.def("")
  },
  data: function() {
    return {
      orderHover: 0,
      checkedPass: true
    };
  },
  computed: {
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
    orderHoverStatus(status) {
      this.$emit("orderHoverStatus", status);
    },
    onHover(order) {
      this.orderHover = order;
    },
  }
};
</script>

<style scoped lang="scss">
@import "~scss/forms/Select.scss";

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
