// import brace - browser version of ace editor
const ace = require('brace')

module.exports = {
  render: function (h) {
    var height = this.height ? this.px(this.height) : '100%'
    var width = this.width ? this.px(this.width) : '100%'
    return h('div', {
      attrs: {
        style: 'height: ' + height + '; width: ' + width
      }
    })
  },

  props: {
    value: {
      type: String,
      required: true
    },
    lang: String, // ace mode
    theme: String, // ace theme
    height: true,
    width: true,
    // options must have following structure: {optionName: optionValue}
    // check https://github.com/ajaxorg/ace/wiki/Configuring-Ace for more options
    options: Object
  },

  data: function () {
    return {
      editor: null,
      currentValue: ''
    }
  },

  methods: {
    px (n) {
      if (/^\d*$/.test(n)) {
        return n + 'px'
      }
      return n
    }
  },

  watch: {
    value (value) {
      if (this.currentValue !== value) {
        this.editor.setValue(value, 1) // set value from line 1
        this.currentValue = value
      }
    },

    theme (theme) {
      this.editor.setTheme('ace/theme/' + theme)
    },

    lang (lang) {
      this.editor.getSession().setMode('ace/mode/' + lang)
    },

    options (options) {
      this.editor.setOptions(options)
    },

    height () {
      this.$nextTick(() => {
        this.editor.resize()
      })
    },

    width () {
      this.$nextTick(() => {
        this.editor.resize()
      })
    }
  },

  beforeDestroy () {
    this.editor.destroy()
    this.editor.container.remove()
  },

  mounted () {
    var lang = this.lang || 'text' // default text mode
    var theme = this.theme || 'chrome' // default chrome theme

    require('brace/ext/emmet')

    this.editor = ace.edit(this.$el) // creates ace editor on this element

    this.$emit('init', this.editor) // emit initiation event to user for loading required modules

    this.editor.$blockScrolling = Infinity
    this.editor.setOption('enableEmmet', true)

    this.editor.getSession().setMode('ace/mode/' + lang)

    this.editor.setTheme('ace/theme/' + theme)

    this.editor.setValue(this.value, 1)

    this.editor.on('change', () => {
      this.currentValue = this.editor.getValue()
      this.$emit('input', this.currentValue)
      this.value = this.currentValue
    })

    if (this.options) {
      this.editor.setOptions(this.options)
    }
  }
}
