/// <reference path="../node_modules/dojo-typings/dojo/1.11/modules.d.ts" />
/// <reference path="../node_modules/dojo-typings/dojox/1.11/modules.d.ts" />
/// <reference path="../node_modules/dojo-typings/dijit/1.11/modules.d.ts" />
/// <reference path="../node_modules/dojo-typings/dojo/1.11/loader.d.ts" />

declare module "dojo/i18n!*" {
  const i18n: any;
  export = i18n;
}

declare module "esri/core/HandleRegistry" {
  type HandleRegistry = __esri.core.HandleRegistry;
  const HandleRegistry: __esri.core.HandleRegistryConstructor;
  export = HandleRegistry;
}

declare module "esri/widgets/BasemapGallery/support/BasemapGalleryItem" {
  import BasemapGalleryItem = __esri.widgets.BasemapGallery.support.BasemapGalleryItem;
  export = BasemapGalleryItem;
}

declare module "esri/widgets/BasemapGallery/interfaces" {
  import interfaces = __esri.widgets.BasemapGallery.interfaces;
  export = interfaces;
}

declare namespace __esri {

  namespace core {
    export interface HandleRegistry extends Accessor {
      add(handles: IHandle[], key: string): IHandle;
      remove(key: string): void;
    }

    export interface HandleRegistryConstructor {
      new(): HandleRegistry;
    }
  }

  namespace widgets {
    namespace BasemapGallery {
      namespace interfaces {
        export interface BasemapsSource {
        }
      }

      namespace support {
        export interface BasemapGalleryItem extends Accessor {
          basemap: Basemap;
          state: "error" | "loading" | "ready";
        }
      }
    }
  }

}
