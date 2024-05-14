sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
], (UIComponent, JSONModel, ResourceModel) => {
    "use strict";

    return UIComponent.extend("ui5.walkthrough.Component", {
        metadata : {
           manifest: "json"
        },

        init(){
            //call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);
            //set data model
            const oData = {
                recipient : {
                    name : "World"
                }
            };
            const oModel = new JSONModel(oData);
            this.setModel(oModel);
        }
    })
})