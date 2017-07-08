(function ($) {

  $.fn.customLayerList = function (options) {
    var defaults = {};
    var options = $.extend({}, defaults, options);

    var vm = options.viewModel;
    var operationalItems = vm && vm.operationalItems;

    var groupNode = $('<ul class="list-group">');

    if (operationalItems) {
      operationalItems.on("change", function () {
        groupNode.empty();

        function setUpdatingClass(item, updatingNode) {
          var hiddenClass = "hidden";

          item.updating ?
            updatingNode.removeClass(hiddenClass) :
            updatingNode.addClass(hiddenClass);
        }

        function setText(title, textNode) {
          textNode.text(title || "Untitled Layer");
        }

        function setVisible(item, toggleIconNode) {
          var openGlyph = "glyphicon-eye-open";
          var closeGlyph = "glyphicon-eye-close";

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

        function createItemNode(item, parentNode) {
          var itemNode = $('<li class="list-group-item" />');

          var updatingNode = $('<span class="badge" />');
          itemNode.append(updatingNode);

          var updatingIconNode = $('<span class="glyphicon glyphicon-repeat gly-spin" aria-hidden="true" />');
          updatingNode.append(updatingIconNode);

          var buttonGroupNode = $('<span />');
          buttonGroupNode.css("margin-right", "10px");
          buttonGroupNode.css("display", "inline-block");
          itemNode.append(buttonGroupNode);

          var toggleNode = $('<button type="button" class="btn btn-default btn-sm" />');
          buttonGroupNode.append(toggleNode);

          var toggleIconNode = $('<span class="glyphicon glyphicon" aria-hidden="true" />');
          toggleNode.append(toggleIconNode);

          var expandNode = $('<button type="button" class="btn btn-default btn-sm" />');
          buttonGroupNode.append(expandNode);

          var expandIconNode = $('<span class="glyphicon glyphicon glyphicon glyphicon-triangle-right" aria-hidden="true" />');
          expandNode.append(expandIconNode);

          var textNode = $('<span />');
          itemNode.append(textNode);

          var childGroupNode = $('<ul class="list-group hidden" />');
          childGroupNode.css("margin-top", "15px");
          itemNode.append(childGroupNode);

          setText(item.title, textNode);
          item.watch("title", function () {
            setText(item.title, textNode);
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

          addChildren(childGroupNode, expandNode, buttonGroupNode, item.children);
          item.children.on("change", function () {
            addChildren(childGroupNode, expandNode, buttonGroupNode, item.children);
          });

          expandNode.on("click", function (event) {
            expandIconNode.toggleClass("glyphicon-triangle-right glyphicon-triangle-bottom");
            childGroupNode.toggleClass("hidden");
          });

          toggleNode.on("click", function (event) {
            item.visible = !item.visible;
            event.stopPropagation();
          });

          parentNode.append(itemNode);
        }

        operationalItems.forEach(function (item) {
          createItemNode(item, groupNode);
        });

      });
    }

    return this.append(groupNode);
  };

}(jQuery));

