GitHub Primer HTML5 Element Collection
======================================

Credit for the icons and stylesheet belongs to GitHub's Design Team: http://primercss.io/

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
