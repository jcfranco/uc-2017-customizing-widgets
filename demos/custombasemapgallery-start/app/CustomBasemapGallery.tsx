/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import { subclass, declared } from "esri/core/accessorSupport/decorators";

import BasemapGallery = require("esri/widgets/BasemapGallery");

@subclass("demo.CustomBasemapGallery")
class CustomBasemapGallery extends declared(BasemapGallery) {

}

export = CustomBasemapGallery;
