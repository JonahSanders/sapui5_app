//@ui5-bundle testlibs/scenario15/lib3/library-preload.js
sap.ui.predefine("testlibs/scenario15/lib3/library",[
	"sap/ui/core/Lib",
	"sap/ui/core/library",
	"testlibs/scenario15/lib4/library"
], function(Library) {
	"use strict";
	return Library.init({
		name: "testlibs.scenario15.lib3",
		apiVersion: 2,
		dependencies: [
			"testlibs.scenario15.lib4"
		],
		noLibraryCSS: true
	});
});
sap.ui.require.preload({
	"testlibs/scenario15/lib3/manifest.json":"{\n\t\"sap.ui5\": {\n\t\t\"dependencies\": {\n\t\t\t\"libs\": {\n\t\t\t\t\"testlibs.scenario15.lib4\": {\n\t\t\t\t\t\"minVersion\": \"1.0.0\"\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}"
});