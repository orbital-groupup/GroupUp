Template.unallocatedTask.events({
	'click button#takeTask': function(e){
		e.preventDefault();

		Tasks.update({_id: this._id}, {$set: {allocatedTo: Meteor.user().username}}, function(error){
			if (error)
				throwError(error.reason);
		});

		Meteor.call('insertEmail', Meteor.user().emails[0].address, this.reminder, this._id, function(err, res){
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
		evt.stopPropagation();
		evt.preventDefault();

		
		if (Meteor.user().username !== this.author){
			throwError ('Error: You are not the author of this task.')
		}
		else{
			bootbox.confirm('Remove task '+ this.title +' from group?', function(res){
				if (res)
					Meteor.call('taskRemove', this._id);
			});
		}
	},

	'click button#allocateToBtn': function(e,t){
		e.preventDefault();
		// check if that user is in group at all
		let allocateTo = $("#myModal-"+this._id).find('[name=allocateTo]').val();
		if(_.find(Groups.findOne(this.groupId).members, function(m){ return m.name === allocateTo; } ) ){
		}
		else{
		 	throwError ('Member not found')
		 	return;
		}

		$('.modal-backdrop').remove();
		$('body').removeClass('modal-open');

		// let allocateTo = $(e.target).find('[name=allocateTo]').val();
		
		Tasks.update({_id: this._id}, {$set: {allocatedTo: allocateTo}}, function(error){
			if (error){
				throwError(error.reason);
				console.log(error.reason);
			}
		});

		let email = Meteor.users.findOne({username: allocateTo}).emails[0].address;

		Meteor.call('insertEmail', email, this.reminder, this._id, function(err, res){
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
		});
		
	}
});

Template.unallocatedTask.helpers({
	'isGroupOwner': function(){
		return Meteor.user().username == Groups.findOne({_id: this.groupId}).author;
	}
});

Template.unallocatedTask.onRendered(function(){
	$(".unallocated-accordion").accordion({ header: "h3", collapsible: true, active: false });
});