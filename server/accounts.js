Accounts.onCreateUser(function(options,user){
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