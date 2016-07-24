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
		taskAttributes.reminder = new Date(taskAttributes.reminder);
		taskAttributes.deadline = new Date(taskAttributes.deadline);
		
		check(Meteor.userId(), String);
		check(taskAttributes, {
			title: String,
			description: String,
			points: Number,
			reminder: Date,
			deadline: Date,
			groupId: String
		});

		var user = Meteor.user();
		var task = _.extend(taskAttributes, {
			userId: Meteor.userId(),
			author: user.profile.name,
			allocatedTo: {
				userId: '',
				name: ''
			},
			completed: false,
			submitted: new Date()
		});

		var taskId = Tasks.insert(task);

		return {
			_id: task.groupId
		};
	},

	autoAllocateTasks: function(tasks, groupId){
		check(groupId, String);
		
		_.each(tasks, function(task){
			// find the member with the lowest points currently and allocate to him
			var lowest = _.min(Groups.findOne(groupId).members, (o)=>o.expectedPoints);
			
			Tasks.update({_id: task._id}, {$set: {allocatedTo: {userId: lowest.userId, name: lowest.name}}}, function(error){
				if (error)
					throwError(error.reason);
			});

			Meteor.call('createUserTaskNotification', task, lowest.userId, function(err, res){
				if (err){
					console.log(err.reason);
				}
			});

			Meteor.call('insertEmail', lowest.userId, task.reminder, task._id, function(err, res){
			if (err)
				console.log(err.reason);
			else
				return res;
			});

			Groups.update({_id: task.groupId, "members.userId": lowest.userId}, {$inc: {"members.$.expectedPoints": task.points}});
		});
		
	},

	taskRemove: function(taskId){
		check(taskId, String);
		check(Meteor.userId(), String);
		Tasks.remove({_id: taskId, userId: Meteor.userId()});
	},

	completeTask: function(taskId){
		check (taskId, String);
		check(Meteor.userId(), String);
		Tasks.update({_id: taskId}, {$set: {completed: true, dateCompleted: Date.now()}}, function(error){
			if (error)
				throwError(error.reason);
		});
	}

});