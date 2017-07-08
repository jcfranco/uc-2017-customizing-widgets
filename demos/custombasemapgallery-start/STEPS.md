# Extending View Demo: Steps

**Note**: Steps assume development environment has been previously set up.

Please refer to the following for more information:

- [Setting up TypeScript](https://developers.arcgis.com/javascript/latest/guide/typescript-setup/index.html)
- [Widget Development](https://developers.arcgis.com/javascript/latest/guide/custom-widget/index.html)
____________

1. Open `index.html`
    - simple app setup
    - imports custom widget

2. Open `CustomBasemapGallery.tsx`
    - widget extension boilerplate

3. Go to [BasemapGallery SDK](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-BasemapGallery.html) and navigate to view file (TSX).
    - all widget views are available on GitHub
    - inside look at how we develop widgets

4. Let's focus on `render()`. For our demo, we want to modify the markup for individual basemap items, which is produced by `_renderBasemapGalleryItem()`.

5. Let's copy `_renderBasemapGalleryItem`.

  ```tsx
  private _renderBasemapGalleryItem(item: BasemapGalleryItem): any {
    const thumbnailUrl = item.get<string>("basemap.thumbnailUrl");
    const thumbnailSource = thumbnailUrl || DEFAULT_BASEMAP_IMAGE;
    const title = item.get<string>("basemap.title");
    const tooltip = item.get<string>("error.message") || title;
    const tabIndex = item.state === "ready" ? 0 : -1;
    const isSelected = this.viewModel.basemapEquals(item.basemap, this.activeBasemap);

    const itemClasses = {
      [CSS.selectedItem]: isSelected,
      [CSS.itemLoading]: item.state === "loading",
      [CSS.itemError]: item.state === "error"
    };

    const loadingIndicator = item.state === "loading" ?
      <div class={CSS.loadingIndicator} key="esri-basemap-gallery_loading-indicator" /> :
      null;

    return (
      <li aria-selected={isSelected} bind={this} class={CSS.item} classes={itemClasses}
          data-item={item} onkeydown={this._handleClick} onclick={this._handleClick}
          role="menuitem" tabIndex={tabIndex} title={tooltip}>
        {loadingIndicator}
        <div class={CSS.thumbnailFrame}>
          <img alt="" class={CSS.itemThumbnail} src={thumbnailSource} />
        </div>
        <div class={CSS.itemTitle}>{title}</div>
      </li>
    );
  }
  ```

  TypeScript will complain because some references are missing, let's copy those too

  ```tsx
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  @accessibleHandler()
  private _handleClick(event: Event) {
    const item = event.currentTarget["data-item"] as BasemapGalleryItem;

    if (item.state === "ready") {
      this.activeBasemap = item.basemap;
    }
  }
  ```

  ```tsx
  import { accessibleHandler, tsx } from "esri/widgets/support/widget";

  import BasemapGallery = require("esri/widgets/BasemapGallery");
  import BasemapGalleryItem = require("esri/widgets/BasemapGallery/support/BasemapGalleryItem");

  const DEFAULT_BASEMAP_IMAGE = require.toUrl("esri/themes/base/images/basemap-toggle-64.svg");

  const CSS = {
    loadingIndicator: "esri-basemap-gallery_loading-indicator",
    item: "esri-basemap-gallery__item",
    itemTitle: "esri-basemap-gallery__item-title",
    itemThumbnail: "esri-basemap-gallery__item-thumbnail",
    selectedItem: "esri-basemap-gallery__item--selected",
    itemLoading: "esri-basemap-gallery__item--loading",
    itemError: "esri-basemap-gallery__item--error",

    // new custom class
    thumbnailFrame: "esri-basemap-gallery__item-thumbnail-frame",
  };
  ```

  **Note**: we added a custom CSS class to the lookup object used to apply CSS.

6. At this point, our widget's markup has been modified, but no custom CSS has been applied.

7. Let's bring in some precooked 8-bit CSS.

  ```css
  /* TODO: eliminate !important usage */
  /* TODO: tidy up*/
  .esri-basemap-gallery {
    color: #fff;
    padding-left: 20px;
    padding-right: 20px;
    height: 700px !important;
    width: 800px !important;
    max-height: none !important;
    background: #1374e8 url("../images/basemap-selection-bg.png") no-repeat;
  }

  .esri-basemap-gallery__item {
    flex-flow: inherit !important;
    width: 20% !important;
    border: none !important;
    margin: 8px 2% !important;
    text-align: center !important;
  }

  .esri-basemap-gallery__item-container {
    margin: 50px 50px 0;
  }

  .esri-basemap-gallery__item-container {
    justify-content: space-around;

    flex-flow: row wrap !important;
    align-items: baseline !important;
  }

  .esri-basemap-gallery__item-title {
    color: #fff;
    padding: 0;
    word-break: normal;
  }

  .esri-basemap-gallery__item.esri-basemap-gallery__item--selected:focus .esri-basemap-gallery__item-title {
    color: #fff;
  }

  .esri-basemap-gallery__item--selected,
  .esri-basemap-gallery__item.esri-basemap-gallery__item--selected:hover,
  .esri-basemap-gallery__item.esri-basemap-gallery__item--selected:focus {
    background-color: transparent;
    color: #fff;
  }

  .esri-basemap-gallery__item:hover,
  .esri-basemap-gallery__item:focus,
  .esri-basemap-gallery__item--selected {
    border: none;
    color: #fff;
    background-color: transparent;
  }
  .esri-basemap-gallery__item:hover .esri-basemap-gallery__item-title {
    color: #fff;
  }

  .esri-basemap-gallery__item-thumbnail-frame {
    display: flex;
    align-items: center;
    justify-content: center;
    background: url("../images/frame.png") no-repeat;
    height: 115px;
    width: 115px;
  }

  .esri-basemap-gallery__item-thumbnail-frame:hover,
  .esri-basemap-gallery__item-thumbnail-frame--selected {
    /* TODO: spritify */
    background: url("../images/frame-selected.png") no-repeat;
  }

  .esri-basemap-gallery__item-thumbnail {
    height: 80px;
    width: 80px;
    max-width: inherit !important;
    margin-bottom: 0 !important;
  }
  ```

8. Done!
