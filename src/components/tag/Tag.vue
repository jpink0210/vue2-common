<template>
  <span class="form-tag d-inline-block p-1">
    <span
      class="d-flex align-items-center position-relative form-tag__item pr-6 d-inline-block"
      :class="styleClassName"
      @click.stop="deleteTag"
    >
      <span 
        class="text-truncate t4 d-inline-block"
      >
        {{ data.text }}
      </span>
      <span
        v-if="showIcon"
        class="form-tag__item__icon text-white t3"
      >
      x
      </span>
    </span>
  </span>
</template>

<script>
import VueTypes from "vue-types";
export default {
  name: "Tag",
  props: {
    data: VueTypes.shape({
      text: VueTypes.string.def(""),
      id: VueTypes.oneOfType([VueTypes.string, VueTypes.integer]).def(""),

    }),
    showIcon: VueTypes.bool.def(true),
    index: VueTypes.oneOfType([VueTypes.string, VueTypes.integer]).def(-1),
    styleSelect: VueTypes.oneOf(["cyan","gray"]).def("cyan"),
  },
  computed: {
    styleClassName(){
      return `form-tag__${this.styleSelect}`
    }
  },
  mounted() {},
  methods: {
    deleteTag() {
      this.$emit('deleteTag', this.data)
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.form-tag {
  &__item{
    padding: 2px 4px 2px 8px;
    cursor: pointer;

    &__icon {
      position: absolute;
      right: 10px;
      top: -4px;
    }
  }

  &__cyan {
    color: #fff;
    background-color: $cyan;
    border-radius: 24px;
  }

  &__gray{
    color: $gray-700;
  }

  [class^=jb_icon] {
    margin-left: 2px;
    right: 6px;
    top: -2px;
  }
}

</style>
