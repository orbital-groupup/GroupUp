Template.allocatedTask.helpers({
	'ownsTask': function(){
		return this.allocatedTo === Meteor.user().username;
	}
});

Template.allocatedTask.events({
	'click button#completeTask': function(e){
		e.preventDefault();

		// update completed flag to true
		Tasks.update({_id: this._id}, {$set: {completed: true}}, function(error){
			if (error)
				throwError(error.reason);
		});

		// add points to the user in group
		var group = {
			groupId: this.groupId,
			allocatedTo: this.allocatedTo,
			points: this.points,
			completed: this.completed
		};

		Meteor.call('updateActualPoints', group, function(error, result) {
			if (error) {
				return throwError(error.reason);
			}
		});

	}
});