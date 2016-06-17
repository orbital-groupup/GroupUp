Template.unallocatedTask.events({
	'click button#takeTask': function(e){
		e.preventDefault();

		Tasks.update({_id: this._id}, {$set: {allocatedTo: Meteor.user().username}}, function(error){
			if (error)
				throwError(error.reason);
		});

		var group = {
			groupId: this.groupId,
			points: this.points
		}

		Meteor.call('updateExpectedPoints', group, function(error){
			if (error)
				throwError(error.reason);
		})
	}
});