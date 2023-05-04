<template>
  <DropdownMix
    ref="dropdown"
    :list-show="dropdownShow"
    :options="selectOptions"
    select-type="select-multiple"
    :multi-value="multiValue"
    :high-light="highLight"
    :max="max"
    :position-relative="isAtBottom"
    :menu-always-show="menuAlwaysShow"
    :max-alert-no-show="maxAlertNoShow"
    :max-tip-text="maxTipText"
    tabindex="0"
    @select="MenuSelect"
    @blur.native="onBlur"
    @click.native="onFocus"
  >
    <template slot="inputSpace">
      <div
        ref="input"
        class="form-control form-control--category-menu multiple d-flex flex-wrap pr-8"
        @click.stop="onToggleDropdown"
      >
        <span
          v-show="selectPlaceholder && !multiValue.length"
          class="h3 text-gray-dark form-control--placeholder"
          v-text="selectPlaceholder"
        />
        <template v-if="selectedIsTag">
          <Tag
            v-for="(option, index) in multiValue"
            :key="option.value"
            :data="option"
            @deleteTag="deleteSelectModel(index)"
          />
        </template>
        <div v-else class="text-truncate string__wrap">
          <span
            v-for="option in multiValue"
            :key="option.value"
            class="t3"
            :class="[selectedIsTagOrString]"
            v-text="option.text"
          />
        </div>
        <i class="jb_icon_down t3 mr-2" />
      </div>
    </template>
  </DropdownMix>
</template>

<script>
import VueTypes from "vue-types";
import findIndex from "lodash/findIndex";
import cloneDeep from "lodash/cloneDeep";
import DropdownMix from "../../components/dropdown/DropdownMix";
import Tag from "../../components/tag/Tag";

export default {
  name: "SelectMultiple",
  components: {
    DropdownMix,
    Tag
  },
  model: {
    prop: "multiValue",
    event: "change"
  },
  props: {
    multiValue: VueTypes.arrayOf(
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
    max: VueTypes.number.def(0),
    isAtBottom: VueTypes.bool.def(false),
    highLight: VueTypes.bool.def(true),
    selectedIsTagOrString: VueTypes.oneOf(["tag", "string"]).def(
      "tag"
    ),
    menuAlwaysShow: VueTypes.bool.def(false),
    maxTipText: VueTypes.string.def(""),
    maxAlertNoShow: VueTypes.bool.def(false)
  },
  data: function() {
    return {
      dropdownShow: false
    };
  },
  computed: {
    selectedIsTag() {
      return this.selectedIsTagOrString == "tag";
    },
  },
  mounted() {},
  methods: {
    onToggleDropdown() {
      this.dropdownShow = !this.dropdownShow;
      this.$emit("clickInput");
    },
    onFocus() {
      this.dropdownShow = true;
    },
    onBlur() {
      this.dropdownShow = false;
    },
    MenuSelect(model) {
      if (!model) return;
      const modelIndex = findIndex(this.multiValue, model);
      if (modelIndex == -1) {
        if (this.multiValue.length < this.max) {
          let newSelectValue = cloneDeep(this.multiValue);
          newSelectValue.push(model);
          this.$emit("change", newSelectValue);
        }
      } else {
        this.deleteSelectModel(modelIndex);
      }
    },
    deleteSelectModel(i) {
      let newSelectValue = cloneDeep(this.multiValue);
      newSelectValue.splice(i, 1);
      this.$emit("change", newSelectValue);
    },
    findIndex
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

// 使用父層 inputBox 樣式，並做一些調整。
.form-control {
  cursor: default !important;

  &--placeholder {
    line-height: 32px;
  }
}

.form-control--category-menu {
  height: 44px;

  .jb_icon_down {
    position: absolute;
    right: 0;
    z-index: 10;
  }
}

.text-region {
  position: absolute;
  top: 50%;
  left: 12px;
  margin-top: -10px;
}

.blur-input {
  width: 0;
  height: 0;
  opacity: 0;
}

.string {
  line-height: 32px;

  &:not(:first-child) {
    &::before {
      content: "、";
    }
  }
}
</style>
