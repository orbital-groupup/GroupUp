Tasks = new Mongo.Collection('tasks');

Tasks.allow({
	update: function(taskId, task){
		return true;
	}
})

Tasks.deny({
	update: function(taskId, task, fieldNames){
		return (_.without(fieldNames, 'allocatedTo', 'completed').length > 0);
	}
})

Meteor.methods({
	taskInsert: function(taskAttributes) {
		// convert to int for arithmetic later
		taskAttributes.points = parseInt(taskAttributes.points);
		
		check(Meteor.userId(), String);
		check(taskAttributes, {
			title: String,
			description: String,
			points: Number,
			groupId: String
		});

		var user = Meteor.user();
		var task = _.extend(taskAttributes, {
			author: user.username,
			allocatedTo: '',
			completed: false,
			submitted: new Date()
		});

		var taskId = Tasks.insert(task);

		return {
			_id: task.groupId
		};
	}
});