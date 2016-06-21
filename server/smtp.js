smtp = {
	username: Meteor.settings.private.smtp.username,
	password: Meteor.settings.private.smtp.password,
	server: Meteor.settings.private.smtp.server,
	port: Meteor.settings.private.smtp.port
};

process.env.MAIL_URL = 'smtp://' +
												encodeURIComponent(smtp.username) + ':' +
												encodeURIComponent(smtp.password) + '@' +
												encodeURIComponent(smtp.server) + ':' + 
												smtp.port;
