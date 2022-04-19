### backdrop-filter

```md
zh
“背景过滤器 CSS”属性允许您将模糊或颜色变换等图形效果应用到元素后面的区域。因为它适用于元素后面的所有东西，所以要看到效果，必须使元素或其背景至少部分透明。

es

The backdrop-filter CSS property lets you apply graphical effects such as
blurring or color shifting to the area behind an element. Because it applies to
everything behind the element, to see the effect you must make the element or
its background at least partially transparent.
```

```css
/* Keyword value */
backdrop-filter: none;

/* URL to SVG filter */
backdrop-filter: url(commonfilters.svg#filter);

/* <filter-function> values */
backdrop-filter: blur(2px);
backdrop-filter: brightness(60%);
backdrop-filter: contrast(40%);
backdrop-filter: drop-shadow(4px 4px 10px blue);
backdrop-filter: grayscale(30%);
backdrop-filter: hue-rotate(120deg);
backdrop-filter: invert(70%);
backdrop-filter: opacity(20%);
backdrop-filter: sepia(90%);
backdrop-filter: saturate(80%);

/* Multiple filters */
backdrop-filter: url(filters.svg#filter) blur(4px) saturate(150%);

/* Global values */
backdrop-filter: inherit;
backdrop-filter: initial;
backdrop-filter: revert;
backdrop-filter: revert-layer;
backdrop-filter: unset;
```

#### [backdrop-filter api 地址](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)

#### 核心代码片段

```css
-webkit-backdrop-filter: blur(10px);
backdrop-filter: blur(10px);
```
