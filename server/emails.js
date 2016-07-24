Emails = new Mongo.Collection('emails');

let ONE_HOUR = 60*60*1000;

Meteor.startup(function(){
	sendPendingEmails();
	Meteor.setInterval(sendPendingEmails, ONE_HOUR);
});

var sendPendingEmails = function(){
	var currentDate = new Date();
	var pendingEmails = Emails.find({emailAt: {$lte: currentDate}}).fetch();
	Emails.remove({emailAt: {$lte: currentDate}});

	_.each(pendingEmails, function(e){
		var task = Tasks.findOne({_id: e.taskId});

		Email.send({
			from: 'admin',
			to: e.email,
			subject: 'GroupUp Email Reminder: Task ' + task.title,

			text: 	'GroupUp Email Reminder: Task ' + task.title + '\n\n' + 
					'Hello ' + task.allocatedTo.name + '\n' +
					'This is a reminder email that has been scheduled to remind you of the following task: \n' +
					'Title: ' + task.title + '\n' +
					'Description: ' + task.description + '\n' +
					'Points: ' + task.points + '\n' +
					'Deadline: ' + moment(task.deadline).format('MMMM Do YYYY, h:mm:ss a') + '\n' +
					'Please visit your group page on our website to find out more about this task.\n' +
					'Thank you.\n' + 
					'The Orbital GroupUp Team\n',

			html: 	'<h1>GroupUp Email Reminder: Task ' + task.title + '</h1>' +
					'<p>Hello ' + task.allocatedTo.name + '</p>' +
					'<p>This is a reminder email that has been scheduled to remind you of the following task: </p>' + 
					'<p><strong>Title:</strong> ' + task.title + '</p>' +
					'<p><strong>Description:</strong> ' + task.description + '</p>' +
					'<p><strong>Points:</strong> ' + task.points + '</p>' +
					'<p><strong>Deadline:</strong> ' + moment(task.deadline).format('MMMM Do YYYY, h:mm:ss a')  + '</p>' +
					'<p>Please visit your group page on our website to find out more about this task.</p>' + 
					'<p>Thank you.</p>' + 
					'<p>The Orbital GroupUp Team</p>'
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