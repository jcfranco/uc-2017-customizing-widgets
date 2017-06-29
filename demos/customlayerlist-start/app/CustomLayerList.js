(function ($) {

  $.fn.customLayerList = function (options) {
    // set some defaults
    var defaults = {};
    // merge
    var options = $.extend({}, defaults, options);

    var vm = options.viewModel;
    var obj = $(this);

    var operationalItems = vm.operationalItems;

    var groupNode = $('<div class="list-group">');

    vm.operationalItems.on("change", function () {
      groupNode.empty();

      function setUpdatingClass(item, updatingNode) {
        item.updating ?
          updatingNode.removeClass("hidden") :
          updatingNode.addClass("hidden");
      }

      function setActiveClass(item, itemNode) {
        item.visible ? itemNode.addClass("active") : itemNode.removeClass("active");
      }

      function setDisabledClass(item, itemNode) {
        item.visibleAtCurrentScale ? itemNode.removeClass("disabled") : itemNode.addClass("disabled");
      }

      function addChildren(childGroupNode, children) {
        childGroupNode.empty();

        children.length ? childGroupNode.removeClass("hidden") :
          childGroupNode.addClass("hidden");

        children.forEach(function (child) {
          createItemNode(child, childGroupNode)
        });
      }

      function createItemNode(item, parentNode) {
        var itemNode = $('<button type="button" class="list-group-item" />');
        itemNode.text(item.title);
        var updatingNode = $('<span class="badge"><span class="glyphicon glyphicon-refresh" aria-hidden="true" /></span>');
        itemNode.append(updatingNode);
        var childGroupNode = $('<div class="list-group hidden" />');
        itemNode.append(childGroupNode);

        setActiveClass(item, itemNode);
        item.watch("visible", function () {
          setActiveClass(item, itemNode);
        });

        setUpdatingClass(item, updatingNode);
        item.watch("updating", function () {
          setUpdatingClass(item, updatingNode);
        });

        setDisabledClass(item, itemNode);
        item.watch("visibleAtCurrentScale", function () {
          setDisabledClass(item, itemNode);
        });

        addChildren(childGroupNode, item.children);
        item.children.on("change", function () {
          addChildren(childGroupNode, item.children);
        });

        itemNode.on("click", function (event) {
          item.visible = !item.visible;
          event.stopPropagation();
        });

        parentNode.append(itemNode);
      }

      operationalItems.forEach(function (item) {
        createItemNode(item, groupNode);
      });

    });

    return this.append(groupNode);
  };

}(jQuery));

