Emails = new Mongo.Collection('emails');

var ONE_HOUR = 60*1000;

Meteor.startup(function(){
	sendPendingEmails();
	Meteor.setInterval(sendPendingEmails, ONE_HOUR);
});

var sendPendingEmails = function(){
	var currentDate = new Date();
	var pendingEmails = Emails.find({emailAt: {$lte: currentDate}}).fetch();

	Email.send({
		from: 'admin',
		to: 'orbitalgroupup@gmail.com',
		subject: 'Email Reminder',
		text: 'Test\n' + 'This is a test reminder email.',
		html: '<h1>Test</h1>' + '<p>This is a test reminder email.</p>'
	});
}