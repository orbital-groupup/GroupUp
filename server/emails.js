Emails = new Mongo.Collection('emails');

let ONE_HOUR = 60*60*1000;

Meteor.startup(function(){
	//sendPendingEmails();
	Meteor.setInterval(sendPendingEmails, ONE_HOUR);
});

var sendPendingEmails = function(){
	var currentDate = new Date();
	var pendingEmails = Emails.find({emailAt: {$lte: currentDate}}).fetch();

	_.each(pendingEmails, function(e){
		Email.send({
			from: 'admin',
			to: e.email,
			subject: 'Email Reminder',
			text: 'Test\n' + 'This is a test reminder email.',
			html: '<h1>Test</h1>' + '<p>This is a test reminder email.</p>'
		});
	});
}

Meteor.methods({
	'insertEmail': function(userId, reminder, taskId){
		check(userId, String);
		check(reminder, Date);
		
		Emails.insert({
			email:  Meteor.users.findOne({_id: userId}).emails[0].address,
			emailAt: reminder,
			taskId: taskId
		});
	},

	'removeEmail': function(taskId){
		check(taskId, String);
		Emails.remove({taskId: taskId});
	}
})