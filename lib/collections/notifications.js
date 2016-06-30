Notifications = new Mongo.Collection('notifications');

Notifications.allow({
	remove: function(userId, doc, fieldNames){
		return ownsDocumentUsername(userId, doc);
	}
});

Meteor.methods({
	createUserTaskNotification: function(task, allocatedUsername){
		var groupName = Groups.findOne({_id: task.groupId}).title;

		Notifications.insert({
			userId: allocatedUsername,
			groupId: task.groupId,
			groupName: groupName,
			title: task.title,
			allocatedBy: task.author,
			read: false
		});
	},
});