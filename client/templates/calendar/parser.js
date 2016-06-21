Template.parser.events({
	'click button#parse-button': function(evt, tpl){
		evt.preventDefault();

		// record the current session view
		var currSessionView = Session.get('eventView');
		
		//clear session else there will be some error
		Session.clear();
		Session.set('eventView',currSessionView);

		var url = tpl.find('input#parse-url').value.trim();

		/*
		var temp = {
			url: url
		};
		*/

		// if using short url
		if (url.startsWith('http://modsn.us')){
			Meteor.call('resolveShortUrl', url, function(err,res){
				if (err){
					console.log('Error with resolveShortUrl');
				}
				else{
					url = res;
					
					// super dumb parser using substrs to extract fields
					if (url.startsWith('https://'))
						url = url.substr(8);

					var urlObj = {	
						url: url,
						year: url.substr(22,9),
						sem: url.substr(35,1),
					};
					var queries = url.substr(37).split('&');
					var newQueries = [];
					_.each(queries, function(q){
						newQueries.push({
							moduleCode: q.substring(0,q.indexOf('[')),
							moduleSessionType: q.substring(q.indexOf('[')+1, q.indexOf(']')),
							moduleSessionNumber: q.substring(q.indexOf('=')+1)
						});
					});
					urlObj.queries = newQueries;
					Session.set('url', urlObj);

					_.each(urlObj.queries, function(q, index){
						Meteor.call('queryModule', q.moduleCode, urlObj.year, urlObj.sem, function(err, res){
							if (err){
								console.log(err);
							}
							else{
								Session.set('mod'+index, res);
							}
						});
					});

				}
			});
		}
		
		// console.log('outside: ' + url);
		else{
			// super dumb parser using substrs to extract fields
			if (url.startsWith('https://'))
				url = url.substr(8);

			var urlObj = {	
				url: url,
				year: url.substr(22,9),
				sem: url.substr(35,1),
			};
			var queries = url.substr(37).split('&');
			var newQueries = [];
			_.each(queries, function(q){
				newQueries.push({
					moduleCode: q.substring(0,q.indexOf('[')),
					moduleSessionType: q.substring(q.indexOf('[')+1, q.indexOf(']')),
					moduleSessionNumber: q.substring(q.indexOf('=')+1)
				});
			});
			urlObj.queries = newQueries;
			Session.set('url', urlObj);

			_.each(urlObj.queries, function(q, index){
				Meteor.call('queryModule', q.moduleCode, urlObj.year, urlObj.sem, function(err, res){
					if (err){
						console.log(err);
					}
					else{
						Session.set('mod'+index, res);
					}
				});
			});
		}
	},

	'click button#clear-events': function(evt,tpl){
		evt.preventDefault();
		Meteor.call('clearAllEvents', function(err,res){
			if (err)
				console.log(err);
			else
				// console.log('success');
				return res;
		});
	},

	'click button#clear-my-events': function(evt,tpl){
		evt.preventDefault();
		Meteor.call('clearMyEvents', function(err,res){
			if (err)
				console.log(err);
			else
				return res;
		});	
	},

	'click button#all-events': function(evt,tpl){
		evt.preventDefault();
		Session.set('eventView', '');
	},

	'click button#odd-events': function(evt,tpl){
		evt.preventDefault();
		Session.set('eventView', 'odd');
	},

	'click button#even-events': function(evt,tpl){
		evt.preventDefault();
		Session.set('eventView', 'even');
	},

});

Template.parser.helpers({
	url: function(){
		return Session.get('url');
	},

	'isActive': function(type){
		return type === Session.get('eventView') ? 'active' : '';
	}
});

Template.parser.onRendered(function(){
	Session.set('eventView', '');
});