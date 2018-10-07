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
      contentBackup: ''
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

  computed: {
    value: {
      get () {
        return this.editor.getValue()
      },
      set (val) {
        this.editor.setValue(val, 1) // set value from line 1
      }
    },

    theme: {
      get () {
        return this.props.theme
      },
      set (theme) {
        this.editor.setTheme('ace/theme/' + theme)
      }
    },

    lang: {
      get () {
        return this.props.lang
      },
      set (lang) {
        this.editor.getSession().setMode('ace/mode/' + lang)
      }
    },

    options: {
      get () {
        return this.editor.getOptions()
      },
      set (options) {
        this.editor.setOptions(options)
      }
    }
  },

  beforeDestroy () {
    this.editor.destroy()
    this.editor.container.remove()
  },

  mounted () {
    var lang = this.props.lang || 'text' // default text mode
    var theme = this.props.theme || 'chrome' // default chrome theme

    require('brace/ext/emmet')

    this.editor = ace.edit(this.$el) // creates ace editor on this element

    this.$emit('init', this.editor) // emit initiation event to user for loading required modules

    this.editor.$blockScrolling = Infinity
    this.editor.setOption('enableEmmet', true)

    this.editor.getSession().setMode('ace/mode/' + lang)

    this.editor.setTheme('ace/theme/' + theme)

    this.editor.setValue(this.value, 1)
    this.contentBackup = this.value

    this.editor.on('change', () => {
      var content = this.editor.getValue()
      this.$emit('input', content)
      this.contentBackup = content
    })

    if (this.options) {
      this.editor.setOptions(this.options)
    }
  }
}
