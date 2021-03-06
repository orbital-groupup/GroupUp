Template.allocatedTask.helpers({
	'ownsTask': function(){
		return this.allocatedTo.userId === Meteor.userId();
	},
	'niceDate': function(){
		return moment(this.deadline).format('MMMM Do YYYY, h:mm:ss a');
	}
});

Template.allocatedTask.events({
	'click button#completeTask': function(e){
		e.preventDefault();

		// update completed flag to true
		/*
		Tasks.update({_id: this._id}, {$set: {completed: true}}, function(error){
			if (error)
				throwError(error.reason);
		});
		*/

		Meteor.call('completeTask', this._id, function(err, res){
			if (err)
				console.log('completeTask has an error', err);
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
	},

	'click button.close-task': function(e,t){
		e.preventDefault();

		Tasks.update({_id: this._id}, {$set: {allocatedTo: {name: '', userId: ''}}}, function(error){
			if (error)
				throwError(error.reason);
		});

		Meteor.call('removeEmail', this._id, function(err, res){
			if (err)
				throwError(err.reason);
			else
				return res;
		})

		var group = {
			groupId: this.groupId,
			points: -1 * this.points
		}

		Meteor.call('updateExpectedPoints', group, Meteor.userId(), function(error){
			if (error)
				throwError(error.reason);
		})
	}
});

Template.allocatedTask.onRendered(function(){
	$(".allocated-accordion").accordion({ header: "h3", collapsible: true, active: false });
});