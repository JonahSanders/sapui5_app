/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides the Design Time Metadata for the sap.m.ToggleButton control
sap.ui.define([],
	function () {
		"use strict";

		return {
			palette: {
				group: "ACTION",
				icons: {
					svg: "sap/m/designtime/ToggleButton.icon.svg"
				}
			},
			templates: {
				create: "sap/m/designtime/ToggleButton.create.fragment.xml"
			}
		};
	});