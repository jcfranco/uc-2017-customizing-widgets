<!-- .slide: data-background="images/start-background.png" -->

# ArcGIS API for JavaScript: Customizing Widgets

### Alan Sangma – [@alansangma](https://twitter.com/alansangma)
### Matt Driscoll – [@driskull](https://twitter.com/driskull)
### JC Franco – [@arfncode](https://twitter.com/arfncode)

---

# Agenda

- Customization Approaches      <!-- .element: class="fragment" data-fragment-index="1" -->
  - Authoring theme             <!-- .element: class="fragment" data-fragment-index="2" -->
  - Recreating view             <!-- .element: class="fragment" data-fragment-index="3" -->
  - Extending view              <!-- .element: class="fragment" data-fragment-index="4" -->
- Q & A                         <!-- .element: class="fragment" data-fragment-index="5" -->

---

![questions](./images/continue.gif)

---

# Customization Approaches

- Authoring a theme
- Recreating a view
- Extending a view

---

<!-- Presenter: Alan -->
# Level I: Theming

---

# Why Theme?
- Branding
- Match the map
- Contrast with the map
- Based on the environment
- User-specific (e.g. bigger buttons)

---

# Sass

#### A powerful scripting language for producing CSS.

---

### Why Sass?
- Modular and DRY
- Organized code
- Makes **theming** easy

---

### Compiling

---

# Let's Create a Theme!

### Your Theme
1. Create your theme directory.
  -   `esri/themes/[your-theme-name]/`
1. Create a Sass file in your directory.
  - `main.scss`

```
  <!-- in your app -->
  <link rel="stylesheet"
        href="esri/themes/[your-theme-name]/main.css">
```

---

Before writing a bunch of CSS selectors, let's look at the
# Theming Approach.

---

# Theming Approach

Three main areas:
- Color
- Size
- Typography

---

# Theming Approach

Three main files:
- `base/_colorVariables.scss`
- `base/_sizes.scss`
- `base/_type.scss`

---

# Theming Approach

Default:
```
// Inside base/_colorVariables.scss
$text_color : #6e6e6e !default ;
```

Your theme:
```
// Inside esri/themes/[your-theme-name]/main.scss
$text_color : #0079c1;
```

Any value assignment overrides the `!default` value.

But wait...there's more!

---

# Theming Approach

Override the four main **color** variables...

```
$text_color            : #d1d1d1;
$background_color      : #242424;
$anchor_color          : #9e9e8e;
$button_text_color     : #adadad;
```

_...then magic!_

[Theming Guide](https://developers.arcgis.com/javascript/latest/guide/styling/index.html)

---

# Demo: Theming

<!-- .slide: data-background="images/demo-background.png" -->

---

# Level I: Theming Recap

[TODO: SUMMARIZE]

---

<!-- Presenter: JC -->
# Esri Widgets

`esri/widgets/Widget`: Our new widget framework

- Accessor-based
- Built with TypeScript

---

# Lifecycle

- `constructor`
- `postInitialize`
- `render`
- `destroy`

---

# `render()`

- Entry point for UI updates
- Driven by widget's state
- JSX used to render our UI

```js
render() {
  return <div>{this.title}</div>;
}
```

---

# Widget Composition

Our widgets are composed of views and viewmodels.

Lets talk about them!

---

<!-- Presenter: Matt -->
# Level II: Views

- Presentation of the Widget              <!-- .element: class="fragment" data-fragment-index="1" -->
- Uses ViewModel APIs to render the UI    <!-- .element: class="fragment" data-fragment-index="2" -->
- View-specific logic resides here        <!-- .element: class="fragment" data-fragment-index="3" -->

---

# Views: Why?

- Separates concerns        <!-- .element: class="fragment" data-fragment-index="1" -->
- Framework compatibility   <!-- .element: class="fragment" data-fragment-index="2" -->

---

# Level II: Widget base class

- [Widget base class](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Widget.html)
  - `esri/widgets/Widget`
  - Lifecycle mentioned earlier
  - `viewModel` property

---

# Level II: Working with Views

Example: [LayerList](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-LayerList.html) widget

- [LayerList.tsx](https://github.com/Esri/arcgis-js-api/blob/4master/widgets/LayerList.tsx) (View)
- [LayerList.scss](https://github.com/Esri/arcgis-js-api/blob/4master/themes/base/widgets/_LayerList.scss) (Theme)

---

# Views: Let's customize!

Lets create a custom widget view. <!-- .element: class="fragment" data-fragment-index="1" -->

Using <!-- .element: class="fragment" data-fragment-index="2" -->

- jQuery <!-- .element: class="fragment" data-fragment-index="3" -->
- Bootstrap <!-- .element: class="fragment" data-fragment-index="3" -->

---

# Demo

Lets create a custom LayerList view for a Bootstrap app

[STEPS](https://github.com/jcfranco/uc-2017-customizing-widgets/blob/master/demos/steps.md)

<!-- .slide: data-background="images/demo-background.png" -->

---

# Level II: Views Recap

What have we learned? <!-- .element: class="fragment" data-fragment-index="1" -->

- View <!-- .element: class="fragment" data-fragment-index="2" -->
  - Face of the widget <!-- .element: class="fragment" data-fragment-index="3" -->
  - Renders the viewModel brains <!-- .element: class="fragment" data-fragment-index="4" -->
  - Separation allows easy framework integration <!-- .element: class="fragment" data-fragment-index="5" -->
- Demo <!-- .element: class="fragment" data-fragment-index="6" -->
  - Where to get widget info in the API <!-- .element: class="fragment" data-fragment-index="7" -->
  - How to create a custom view in another framework <!-- .element: class="fragment" data-fragment-index="8" -->

---

<!-- Presenter: JC -->
# Level III: ViewModels

(The brain)

- Core logic of widget resides here
- Provides necessary APIs for the view to do it's thing
- No DOM/UI concerns (think business logic)

---

# ViewModels: Why?

- Framework integration
- Reusability
- Separates concerns

---

# ViewModels: Extending

* Add or override behavior

```ts
class Foo extends declared(Bar) {

  // custom logic
  function yell(): void {
    console.log("AHHHH!");
  }

  // overrides
  function barMethod(): string {
    return "I'm foo now";
  }

}
```

---

# TypeScript

- Typed JavaScript <!-- .element: class="fragment" data-fragment-index="1" -->

```ts
let view: MapView | SceneView;

// later...

// TS2322: Type '"not-a-view"' is not assignable
// to type 'MapView | SceneView'.
view = "not-a-view";
```
<!-- .element: class="fragment" data-fragment-index="2" -->

---

# TypeScript

- JS of the future, now

```ts
// const
const numbers = [1, 2, 3];

// fat arrow functions
letters.forEach(letter => console.log(letter));

// template literals
const myString = `last number: ${ numbers[ numbers.length - 1 ] }`;

// decorators
class Example {
  @log
  stringify(item: object): string { /* ... */ }
}
```
<!-- .element: class="fragment" data-fragment-index="1" -->

---

# TypeScript

- IDE support
  - Visual Studio, WebStorm, Sublime, and more!  <!-- .element: class="fragment" data-fragment-index="1" -->

---

# Demo: Custom View

<!-- .slide: data-background="images/demo-background.png" -->

---

# Level III: ViewModels Recap

[TODO: SUMMARIZE]

---

# Conclusion

- Authored a theme      <!-- .element: class="fragment" data-fragment-index="1" -->
- Recreated a view      <!-- .element: class="fragment" data-fragment-index="2" -->
- Extended a view       <!-- .element: class="fragment" data-fragment-index="3" -->

---

## Suggested Session

- [Developing Your Own Widget with the ArcGIS API for JavaScript
](https://userconference2017.schedule.esri.com/schedule/603662896)

---

## Additional Resources

- [Implementing Accessor](https://developers.arcgis.com/javascript/latest/guide/implementing-accessor/index.html)
- [Setting up TypeScript](https://developers.arcgis.com/javascript/latest/guide/typescript-setup/index.html)
- [Widget Development](https://developers.arcgis.com/javascript/latest/guide/custom-widget/index.html)
- [JS API SDK](https://developers.arcgis.com/javascript/)

---

# The source code!

## [esriurl.com/customwidgets-uc2017](http://esriurl.com/customwidgets-uc2017)

---

<!-- .slide: data-background="images/survey-background.png" -->

---

# Questions?

![questions](./images/questions.gif)

---

# Thank you!

![questions](./images/thanks.gif)

---

<!-- .slide: data-background="images/end-background.png" -->
