Notifications = new Mongo.Collection('notifications');

Notifications.allow({
	remove: function(userId, doc, fieldNames){
		return ownsDocument(userId, doc);
	}
});

Meteor.methods({
	createUserTaskNotification: function(task, allocatedUserId){
		var groupName = Groups.findOne({_id: task.groupId}).title;

		Notifications.insert({
			userId: allocatedUserId,
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
				userId: member.userId,
				groupId: event.groupId,
				groupName: group.title,
				title: event.title,
				start: event.start,
				allocatedBy: event.owner,
				eventItemType: event.type,
				type: 'event',
				read: false
			});
		});

	},

	createNewUploadNotification: function(upload){
		var group = Groups.findOne({_id: upload.groupId});

		_.each(group.members, function(member){

			Notifications.insert({
				userId: member.userId,
				groupId: upload.groupId,
				groupName: group.title,
				title: upload.name,
				type: 'upload',
				read: false
			});
		});
	}

});