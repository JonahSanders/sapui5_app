sap.ui.define([
    "sap/ui/core/mvc/controller",
    "sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
    'use strict';

    return Controller.extend("ui5.walkthrough.controller.InvoiceList", {
        onInit(){
            const oViewModel = new JSONModel({
                currency: "EUR"
            });
            this.getView().setModel(oViewModel, "view");
        }

    });
    
});