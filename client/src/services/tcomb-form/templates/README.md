# Setup

```sh
npm install tcomb-form
npm install tcomb-form-templates-semantic
```

```js
import t from 'tcomb-form/lib'
import en from 'tcomb-form/lib/i18n/en'
import templates from 'tcomb-form-templates-semantic'

t.form.Form.i18n = en
t.form.Form.templates = templates
```