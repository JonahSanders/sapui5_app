//@ui5-bundle sap/test/lib3/library-preload.js
sap.ui.predefine("sap/test/lib3/library", ['sap/ui/core/Lib', 'sap/test/lib2/library'],
function(Library) {
"use strict";

return Library.init({
	name:"sap.test.lib3",
	apiVersion:2,
	noLibraryCSS:true
});
});
sap.ui.require.preload({
	"version":"2.0",
	"name":"sap.test.lib3",
	"modules":{
		"sap/test/lib3/manifest.json":"{\n\t\"sap.ui5\": {\n\t\t\"dependencies\": {\n\t\t\t\"libs\": {\n\t\t\t\"sap.test.lib2\": {}\n\t\t}\n\t\t}\n\t}\n}"
	}
});