Meteor.methods({
	'queryModule': function(moduleCode, year, sem){	
		var apiUrl = 'http://api.nusmods.com/' + year + '/' + sem + '/modules/' + moduleCode + '/timetable.json';
		var response = Meteor.wrapAsync(nusmodsApiCall)(apiUrl);
		return response;
	},

	'resolveShortUrl': function(url){
		var response = Meteor.wrapAsync(resolveShortUrlCall)(url);
		return response.href;
	}
});

var nusmodsApiCall = function(apiUrl, callback){
	try{
		var response = HTTP.get(apiUrl).data;
		callback(null,response);
	}
	catch(error){
		console.log('error indeed');
		if (error.response){
			var errorCode = error.response.data.code;
			var errorMessage = error.response.data.message;
		}
		else{
			var errorCode = 500;
			var errorMessage = 'Cannot access the API';
		}

		var myError = new Meteor.Error(errorCode, errorMessage);
		callback(myError,null);
	}
};

var resolveShortUrlCall = function(url, callback){
	try{
		var response = HTTP.call('HEAD', url, {rejectUnauthorized: false});
		callback(null, response);
	}
	catch(error){
		console.log('error indeed');
		if (error.response){
			var errorCode = error.response.data.code;
			var errorMessage = error.response.data.message;
		}
		else{
			var errorCode = 500;
			var errorMessage = 'Cannot access the API';
		}

		var myError = new Meteor.Error(errorCode, errorMessage);
		callback(myError,null);
	}
}