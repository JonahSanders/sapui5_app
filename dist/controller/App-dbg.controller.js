sap.ui.define([
    "sap/ui/core/mvc/controller"
], function(Controller) {
    'use strict';
    
    return Controller.extend("ui5.walkthrough.controller.App", {
        onInit() {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		}
    
    });
});