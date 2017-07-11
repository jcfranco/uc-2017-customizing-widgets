
1. Open the index HTML page and add the script for the jQuery plugin

```
  <script src="app/CustomLayerList.js"></script>
```

2. request LayerListViewModel

```
"esri/widgets/LayerList/LayerListViewModel",
```

3. Create viewModel

```
var viewModel = new LayerListViewModel({
  view: view
});
```

4. Add elements for Custom LayerList

```
<h2>Layers</h2>
<div id="customLayerList"></div>
```

5. Initialize the customlayerList jQuery plugin passing the viewModel in options argument

```
$("#customLayerList").customLayerList({
  viewModel: viewModel
});
```

6. View page and notice the following `$(...).customLayerList is not a function`.

7. Open `CustomLayerList.js` to start creating the jQuery plugin.

8. Add the code to the jQuery plugin to get the plugin setup. Error should be gone now

```
(function ($) {

  $.fn.customLayerList = function (options) {
    var defaults = {};
    var options = $.extend({}, defaults, options);
  };

}(jQuery));
```

9. Add viewModel option

```
var vm = options.viewModel;
var operationalItems = vm && vm.operationalItems;
```

10. Create and return node for custom layerlist

```
var groupNode = $('<ul class="list-group">');

return this.append(groupNode);
```

11. Inspect HTML and see node that was created

12. Add code for LayerListViewModel operationalItems change

```
if (operationalItems) {
  operationalItems.on("change", function () {
    groupNode.empty();

    operationalItems.forEach(function (item) {
      createItemNode(item, groupNode);
    });

  });
}
```

13. Add function for creating an item node

```
function createItemNode(item, parentNode) {
  var itemNode = $('<li class="list-group-item" />');

  var updatingNode = $('<span class="badge hidden" />');
  itemNode.append(updatingNode);

  var updatingIconNode = $('<span class="glyphicon glyphicon-repeat gly-spin" aria-hidden="true" />');
  updatingNode.append(updatingIconNode);

  var buttonGroupNode = $('<span />');
  buttonGroupNode.css("margin-right", "10px");
  buttonGroupNode.css("display", "inline-block");
  itemNode.append(buttonGroupNode);

  var toggleNode = $('<button type="button" class="btn btn-default btn-sm" />');
  buttonGroupNode.append(toggleNode);

  var toggleIconNode = $('<span class="glyphicon glyphicon glyphicon-eye-open" aria-hidden="true" />');
  toggleNode.append(toggleIconNode);

  var expandNode = $('<button type="button" class="btn btn-default btn-sm" />');
  buttonGroupNode.append(expandNode);

  var expandIconNode = $('<span class="glyphicon glyphicon glyphicon glyphicon-triangle-right" aria-hidden="true" />');
  expandNode.append(expandIconNode);

  var textNode = $('<span />');
  textNode.text(item.title);
  itemNode.append(textNode);

  // sublayers node
  var childGroupNode = $('<ul class="list-group hidden" />');
  childGroupNode.css("margin-top", "15px");
  itemNode.append(childGroupNode);

  parentNode.append(itemNode);
}
```

14. Sublayer nodes

```
function addChildren(childGroupNode, expandNode, buttonGroupNode, children) {
  var hiddenClass = "hidden";
  var buttonGroupClass = "btn-group btn-group-sm";

  childGroupNode.empty();

  if (children.length) {
    expandNode.removeClass(hiddenClass);
    buttonGroupNode.addClass(buttonGroupClass);
  }
  else {
    expandNode.addClass(hiddenClass);
    buttonGroupNode.removeClass(buttonGroupClass);
  }

  children.forEach(function (child) {
    createItemNode(child, childGroupNode)
  });
}

// recursively add children to sublayers node
addChildren(childGroupNode, expandNode, buttonGroupNode, item.children);
item.children.on("change", function () {
  addChildren(childGroupNode, expandNode, buttonGroupNode, item.children);
});
```

15. Check to see if nodes are there now.

16. Setup onclick listeners

```
expandNode.on("click", function (event) {
  expandIconNode.toggleClass("glyphicon-triangle-right glyphicon-triangle-bottom");
  childGroupNode.toggleClass("hidden");
});

toggleNode.on("click", function (event) {
  item.visible = !item.visible;
  event.stopPropagation();
});
```

17. Add watchers for item properties

```
setText(item, textNode);
item.watch("title", function () {
  setText(item, textNode);
});

setVisible(item, toggleIconNode);
item.watch("visible", function () {
  setVisible(item, toggleIconNode);
});

setUpdatingClass(item, updatingNode);
item.watch("updating", function () {
  setUpdatingClass(item, updatingNode);
});

setMutedClass(item, textNode);
item.watch("visibleAtCurrentScale", function () {
  setMutedClass(item, textNode);
});
```

18. Add node functions

```
function setUpdatingClass(item, updatingNode) {
  var hiddenClass = "hidden";

  item.updating ?
    updatingNode.removeClass(hiddenClass) :
    updatingNode.addClass(hiddenClass);
}

function setText(item, textNode) {
  textNode.text(item.title);
}

function setVisible(item, toggleIconNode) {
  var openGlyph = "glyphicon-eye-open";
  var closeGlyph = "glyphicon-eye-close text-muted";

  if (item.visible) {
    toggleIconNode.addClass(openGlyph).removeClass(closeGlyph);
  }
  else {
    toggleIconNode.addClass(closeGlyph).removeClass(openGlyph);
  }
}

function setMutedClass(item, textNode) {
  var mutedClass = "text-muted";

  item.visibleAtCurrentScale ?
    textNode.removeClass(mutedClass) :
    textNode.addClass(mutedClass);
}
```

19. Custom bootstrap layerlist should be working!

20. Optional: Add custom bootstrap theme

```
<!-- Optional theme -->
<link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
<link rel="stylesheet" href="app/css/8bit.css">
```
