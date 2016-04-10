/**
*	JSGetSet Generator
*/
// http://www.kjetil-hartveit.com/blog/1/setter-and-getter-generator-for-php-javascript-c%2B%2B-and-csharp
// mode static / dynamic

function createGetter (data) {
	data = data || {};
	var propertyName = data.propertyName;
	var addUnderscore = (typeof data.underscore !== 'undefined') ? (data.underscore) : (false);
	
	var methodeName = 'get'+generateMethodeName(propertyName);
	var getter = methodeName+': function() {\n';
	if (addUnderscore) {
		getter += '\treturn this.'+addUnderscoreToString(propertyName)+'; \n},\n';
	}
	else {
		getter += '\treturn this.'+propertyName+'; \n},\n';
	}	
	return getter;
};


function createSetter (data) {
	data = data || {};
	var propertyName = data.propertyName;
	var addUnderscore = (typeof data.underscore !== 'undefined') ? (data.underscore) : (false);
	
	var methodeName = 'set'+generateMethodeName(propertyName);
	var setter = methodeName+': function('+removeUnderscore(propertyName)+') {\n';
	if (addUnderscore) {		
		setter += '\tthis.'+addUnderscoreToString(propertyName)+' = '+removeUnderscore(propertyName)+'; \n},\n';
	}
	else {
		setter += '\tthis.'+propertyName+' = '+removeUnderscore(propertyName)+'; \n},\n';
	}		
	return setter;
};


function createSetterComment (data) {
	data = data || {};
	data.methodeType = 'Set';
	var comment = createComment(data);	
	return comment;
}

function createGetterComment (data) {
	data = data || {};
	data.methodeType = 'Get';
	var comment = createComment(data);	
	return comment;
}

function createComment (data) {
	data = data || {};
	var propertyName = data.propertyName;
	var methodeType = data.methodeType;
	
	var comment = '/**\n';
	comment += '* '+methodeType+' '+propertyName+'\n';
	comment += '* @public\n';
	comment += '*/\n';
	return comment;
}

function generateMethodeName (string) {
	string = removeUnderscore(string);
	string = upperCaseFirstLetter(string);
	return string;
};

/**
* upperCaseFirstLetter - Set first letter of string in upper case.
* @param {String} string - the string to set first letter in upper case.
* @return {String}
*/
function upperCaseFirstLetter(string) {
	if (!string) {
		return null;
	}
	return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
* addUnderscoreToString - Add underscore before string if needed.
* @param {String} string
* @return {String}
*/
function addUnderscoreToString(string) {
	if (!string) {
		return '_';
	}
	if (string.charAt(0) === '_') {
		return string;
	}
	else {
		return '_' + string;
	}
};

/**
* removeUnderscore - Remove underscore at begining if needed
* @param {String} string
* @return {String}
*/
function removeUnderscore(string) {
	if (!string) {
		return null;
	}
	if (string.charAt(0) === '_') {
		// remove underscore
		return string.slice(1);
	}
	else {
		return string;
	}
};


/**
* Generate - Main methode, generate the getters and setters and display result in textarea
*/
function generate() {
	var resultGenerated = "";
	var inputs = document.getElementById("propertiesInput");
	var comments = document.getElementById("comments");
	var underscore = document.getElementById("underscore");
	if (inputs.value) {
		var properties = inputs.value;	
		properties = properties.replace(/(?:\r\n|\r|\n)/g, ',');
		properties = properties.replace(/\s/g, '');
		properties = properties.split(',');
		for (var i = 0 ; i < properties.length; i++) {
			var currentProperty = properties[i];
			if (currentProperty) {
				if (comments && comments.checked) {
					resultGenerated += createGetterComment({propertyName: currentProperty});
				}			
				resultGenerated += createGetter({propertyName: currentProperty, underscore: underscore.checked});
				
				if (comments && comments.checked) {
					resultGenerated += createSetterComment({propertyName: currentProperty});
				}
				resultGenerated += createSetter({propertyName: currentProperty, underscore: underscore.checked });
				resultGenerated += '\n';
			}			
		}		
		var result = document.getElementById("result").value = resultGenerated;
	}		
};	