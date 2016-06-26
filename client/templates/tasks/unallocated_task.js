Template.unallocatedTask.events({
	'click button#takeTask': function(e){
		e.preventDefault();

		Tasks.update({_id: this._id}, {$set: {allocatedTo: Meteor.user().username}}, function(error){
			if (error)
				throwError(error.reason);
		});

		Meteor.call('insertEmail', Meteor.user().emails[0].address, this.reminder, function(err, res){
			if (err)
				throwError(err.reason);
			else
				return res;
		})

		var group = {
			groupId: this.groupId,
			points: this.points
		}

		Meteor.call('updateExpectedPoints', group, function(error){
			if (error)
				throwError(error.reason);
		})
	},

	'click button.close-task': function(evt,tpl){
		evt.preventDefault();
		
		if (Meteor.user().username !== this.author){
			throwError ('Error: You are not the author of this task.')
		}
		else{
			if (confirm('Remove task from group?')){
				Meteor.call('taskRemove', this._id);
			}
		}

	}
});