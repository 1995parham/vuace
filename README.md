# vuace

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

[![npm](https://img.shields.io/npm/v/vuace.svg?style=flat-square)](https://www.npmjs.com/package/vuace)
[![npm](https://img.shields.io/npm/dw/vuace.svg?style=flat-square)](https://www.npmjs.com/package/vuace)


## Introduction
A packaging of [ace](https://ace.c9.io/) for Vue.js based on [vue2-ace-editor](https://github.com/chairuosen/vue2-ace-editor).

## How to use

1. Install

    ```
    npm install --save vuace
    ```

2. Use it with `Vue.use`

    ```js
    import VuacePlugin from `vuace`
    Vue.use(VuacePlugin)
    ```

3. Require the editor's mode/theme module in custom methods that is bind to `@init`

    ```js
    {
        data,
        methods: {
            editorInit: function () {
                require('brace/ext/language_tools') //language extension prerequsite...
                require('brace/mode/html')
                require('brace/mode/javascript')    //language
                require('brace/mode/less')
                require('brace/theme/chrome')
                require('brace/snippets/javascript') //snippet
            }
        },
    }
    ```

4. Use the component in template

    ```html
    <ace-editor v-model="content" @init="editorInit" lang="html" theme="chrome" width="500" height="100"></ace-editor>
    ```


* prop `v-model`  is required
* prop `lang` and `theme` is same as [ace-editor's doc](https://github.com/ajaxorg/ace)
* prop `height` and `width` could be one of these:  `200`, `200px`, `50%`
