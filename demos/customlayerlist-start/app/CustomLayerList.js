(function ($) {

  $.fn.customLayerList = function (options) {
    // set some defaults
    var defaults = {};
    // merge
    var options = $.extend({}, defaults, options);

    var vm = options.viewModel;
    var obj = $(this);

    var operationalItems = vm.operationalItems;

    console.log(operationalItems.length);

    var list = $("<ul>");

    vm.operationalItems.on("change", function (event) {
      console.log("changed", event);

      list.empty();


      operationalItems.forEach(function (item) {

        var itemNode = $("<li>");
        itemNode.text(item.title);

        list.append(itemNode);
      }, this);

    });

    return this.append(list);
  };

}(jQuery));