sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict";

    return Controller.extend("ClinicalTrials.ClinicalTrials.controller.App", {


        onInit: function() {

            if (!document.getElementById("recast-webchat")) {

                var s = document.createElement("script");
                s.setAttribute("id", "recast-webchat");
                s.setAttribute("src", "https://cdn.recast.ai/webchat/webchat.js");
                if (document.body != null) {
                    document.body.appendChild(s);
                }

                s.setAttribute("channelId", "6cbd71c4-7894-4413-a8d5-a7217920c58e");
                s.setAttribute("token", "4482cf765f5afe37dfef6013c22e1c07");

            }
        },

        /**
         * Called when a controller is instantiated and its View controls (if available) are already created.
         * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
         * @memberOf ClinicalTrials.ClinicalTrials.view.App
         */
        //	onInit: function() {
        //
        //	},

        /**
         * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
         * (NOT before the first rendering! onInit() is used for that one!).
         * @memberOf ClinicalTrials.ClinicalTrials.view.App
         */
        //	onBeforeRendering: function() {
        //
        //	},

        /**
         * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
         * This hook is the same one that SAPUI5 controls get after being rendered.
         * @memberOf ClinicalTrials.ClinicalTrials.view.App
         */
        //	onAfterRendering: function() {
        //
        //	},

        /**
         * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
         * @memberOf ClinicalTrials.ClinicalTrials.view.App
         */
        //	onExit: function() {
        //
        //	}

    });

});