(function() {
	app.service('apiCalls', ['$http', function($http) {
		var self = this;

		self.makeCall = function (url) {
			return $http.get(url);
		};
	}]);

	app.service('xmlToJSON', [function() {
		var self = this;

		// XML to JSON conversion taken from https://davidwalsh.name/convert-xml-json
		self.dataToDoc = function (data) {
			// Use jQuery to parse the XML string into a valid XML document for our
			// conversion function 
			return jQuery.parseXML(data);
		};

		self.xmlToJSON = function(xml) {
			// Changes XML to JSON
			
			// Create the return object
			var obj = {};

			if (xml.nodeType == 1) { // element
				// do attributes
				if (xml.attributes.length > 0) {
				obj['@attributes'] = {};
					for (var j = 0; j < xml.attributes.length; j++) {
						var attribute = xml.attributes.item(j);
						obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
					}
				}
			} else if (xml.nodeType == 3) { // text
				obj = xml.nodeValue;
			}

			// do children
			if (xml.hasChildNodes()) {
				for(var i = 0; i < xml.childNodes.length; i++) {
					var item = xml.childNodes.item(i);
					var nodeName = item.nodeName;
					if (typeof(obj[nodeName]) == 'undefined') {
						obj[nodeName] = self.xmlToJSON(item);
					} else {
						if (typeof(obj[nodeName].push) == 'undefined') {
							var old = obj[nodeName];
							obj[nodeName] = [];
							obj[nodeName].push(old);
						}
						obj[nodeName].push(self.xmlToJSON(item));
					}
				}
			}
			return obj;
		};
	}]);
})();