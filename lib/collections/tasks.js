Tasks = new Mongo.Collection('tasks');

Meteor.methods({
	taskInsert: function(taskAttributes) {
		check(Meteor.userId(), String);
		check(taskAttributes, {
			title: String,
			description: String,
			groupId: String
		});

		var user = Meteor.user();
		var task = _.extend(taskAttributes, {
			author: user.username,
			submitted: new Date()
		});

		var taskId = Tasks.insert(task);

		return {
			_id: task.groupId
		};
	}
});