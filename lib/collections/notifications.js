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
			type: 'task',
			read: false
		});
	},

	createNewEventNotification: function(event){
		var group = Groups.findOne({_id: event.groupId});

		_.each(group.members, function(member){


			Notifications.insert({
				userId: member.name,
				groupId: event.groupId,
				groupName: group.title,
				title: event.title,
				start: event.start,
				allocatedBy: event.owner,
				eventItemType: event.type,
				type: 'event',
				read: false
			});
		})


	}
});