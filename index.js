const AceEditor = require('lib/editor.js')

const VuacePlugin = {
  install (Vue, options) {
    Vue.component('ace-editor', AceEditor)
  }
}

module.export = VuacePlugin
