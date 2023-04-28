export const IFormCheckbox = {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    localValue: {
      type: Array,
      default: []
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
  };
  