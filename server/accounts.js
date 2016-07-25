Accounts.onCreateUser(function(options,user){
	if (user.services.password){
		user.profile = {};
		user.profile.name = options.profile['first-name'] + " " + options.profile['last-name'];
	}
	else if(user.services.facebook || user.services.github || user.services.google || user.services.twitter){
		Accounts.validateNewUser(function(){
			return false;
		});
		throw new Meteor.Error('service-not-linked','Please link the service with an existing account.')
	}
	/*
	else if (user.services.facebook){
		user.profile = {};
		user.profile.name = user.services.facebook.name;
		user.emails = [];
		user.emails.push({
			address: user.services.facebook.email,
			verified: true
		});
	}
	else if (user.services.github){
		user.profile = {};
		user.profile.name = user.services.github.username;
		user.emails = [];
		user.emails.push({
			address: user.services.github.emails[0].email,
			verified: true
		});
	}
	else if (user.services.google){
		user.profile = {};
		user.profile.name = user.services.google.name;
		user.emails = [];
		user.emails.push({
			address: user.services.google.email,
			verified: true
		});
	}
	else if (user.services.twitter){
		
		user.profile = {};
		user.profile.name = user.services.twitter.screenName;
		user.emails = [];
		user.emails.push({
			address: user.services.google.email,
			verified: true
		});
		

	}
	*/

	if (options.email){
		Meteor.setTimeout(function(){
			Accounts.sendVerificationEmail(user._id);
		}, 2* 1000);
	}
	return user;
});

Accounts.emailTemplates.siteName = 'Group Up';
Accounts.emailTemplates.from = 'admin <admin@groupup.com>';

Accounts.emailTemplates.verifyEmail.subject = function(user){
	return 'Confirm your Email Address, ' + user.username;
};

Accounts.emailTemplates.verifyEmail.text = function(user, url){
	return 'Welcome to Group Up!\n'
	+ 'Group Up comes with email reminders to remind you of task deadlines.\n'
	+ 'To verify your email address, go ahead and follow the link below:\n\n'
	+ url;
};

Accounts.emailTemplates.verifyEmail.html = function(user,url){
	return '<h1>Welcome to Group Up!</h1>'
	+ '<p>Group Up comes with email reminders to remind you of task deadlines.</p>'
	+ '<p>To verify your email address, go ahead and follow the link below:</p>'
	+ url;
}

Meteor.methods({
  '_accounts/unlink/service': function (userId, serviceName) {
    Accounts.unlinkService(userId, serviceName);
  }
});