GitHub Primer HTML5 Element Collection
======================================

Demo: https://htmlelement.github.io/github-primer/demo/

## Button

Wraps the css-primer [buttons](https://github.com/primer/primer-css/tree/master/modules/primer-buttons) module.

Supported button types
* primary
* danger
* outline

#### Syntax
```html
<primer-button [buttonType] [disabled]>Click Me</primer-button>
```

#### Example: Primary Button

```html
<link rel="import" href="bower_components/github-primer-elements/button.html" />
<primer-button primary>Click Me</primer-button>
```

## Octicons

```html
<link rel="import" href="bower_components/github-primer-elements/octicon.html" />
<primer-octicon icon="bug"></primer-octicon>
```

## Table

```html
<link rel="import" href="bower_components/github-primer-elements/table.html" />
<table is="prime-table">
  <tr>
    <th>Name</th>
    <th>Role</th>
  </tr>
  <tr>
    <td>Stefan Grönke</td>
    <td>Maintainer</td>
  </tr>
</table>
```

# License

This project includes the markdown compiler GitHub Primer [css](https://github.com/primer/primer-css/) and [octicons](https://github.com/primer/octicons).

The WebComponents built from it are licenced under MIT.

Please see [LICENCE](https://htmlelement.github.io/github-primer/LICENSE) for detailed information and license texts.
