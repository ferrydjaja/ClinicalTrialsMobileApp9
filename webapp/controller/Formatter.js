sap.ui.define(function() {
    "use strict";

    var Formatter = {
        status: function(sStatus) {

            if (sStatus === "Completed") {
                return "Error";
            } else if (sStatus === "Terminated") {
                return "Error";
            } else if (sStatus === "Withdrawn") {
                return "Error";
            } else if (sStatus === "Suspended") {
                return "Error";
            } else if (sStatus === "Active, not recruiting") {
                return "Error";
            } else if (sStatus === "Recruiting") {
                return "Success";
            } else if (sStatus === "Not yet recruiting") {
                return "Success";
            } else if (sStatus === "Unknown status") {
                return "Warning";
            } else {
                return "None";
            }
        },

        intro: function(sStatus) {

            var d1 = new Date(sStatus);
            var d2 = new Date();

            var diff = Math.abs(d1.getTime() - d2.getTime());
            var diff = diff / (1000 * 60 * 60 * 24);
            if (diff <= 30)
                return "images/new.png";
            else
                return "";
        },

		gender: function(sStatus) {

            if (sStatus == "All")
                return "images/malefemale.png";
            else if (sStatus == "Male")
				return "images/male.png";
            else if (sStatus == "Female")
				return "images/female.png";
        },
    };

    return Formatter;
}, /* bExport= */ true);