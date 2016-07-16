Template.unallocatedTask.events({
	'click button#takeTask': function(e){
		e.preventDefault();

		Tasks.update({_id: this._id}, {$set: {allocatedTo: {name: Meteor.user().profile.name, userId: Meteor.userId()}}}, function(error){
			if (error)
				throwError(error.reason);
		});

		Meteor.call('insertEmail', Meteor.userId(), this.reminder, this._id, function(err, res){
			if (err)
				throwError(err.reason);
			else
				return res;
		})

		var group = {
			groupId: this.groupId,
			points: this.points
		}
		var allocatedTo = Meteor.userId();

		Meteor.call('updateExpectedPoints', group, allocatedTo, function(error){
			if (error)
				throwError(error.reason);
		})
	},

	'click button.close-task': function(evt,tpl){
		console.log('x clicked');
		evt.stopPropagation();
		evt.preventDefault();

		
		if (Meteor.userId() !== this.userId){
			throwError ('Error: You are not the author of this task.')
		}
		else{
			var that = this;
			bootbox.confirm('Remove task '+ this.title +' from group?', function(res){
				if (res){
					Meteor.call('taskRemove', that._id);
				}
			});
		}
	},

	'click button#allocateToBtn': function(e,t){
		e.preventDefault();
		// check if that user is in group at all
		let allocateTo = $("#myModal-"+this._id).find('[name=allocateTo]').val();
		var found = _.find(Groups.findOne(this.groupId).members, function(m){ return m.name === allocateTo; });
		if(!found){
		 	throwError ('Member not found')
		 	return;
		}

		$('.modal-backdrop').remove();
		$('body').removeClass('modal-open');

		// let allocateTo = $(e.target).find('[name=allocateTo]').val();
		
		Tasks.update({_id: this._id}, {$set: {allocatedTo: {name: found.name, userId: found.userId}}}, function(error){
			if (error){
				throwError(error.reason);
				console.log(error.reason);
			}
		});

		Meteor.call('createUserTaskNotification', this, found.userId, function(err, res){
			if (err){
				console.log(err.reason);
			}
		});
		// let email = Meteor.users.findOne({_id: found.userId}).emails[0].address;

		Meteor.call('insertEmail', found.userId, this.reminder, this._id, function(err, res){
			if (err)
				throwError(err.reason);
			else
				return res;
		})

		var group = {
			groupId: this.groupId,
			points: this.points
		}

		Meteor.call('updateExpectedPoints', group, found.userId, function(error){
			if (error)
				throwError(error.reason);
		});
		
	}
});

Template.unallocatedTask.helpers({
	'isGroupOwner': function(){
		return Meteor.userId() == Groups.findOne({_id: this.groupId}).userId;
	},
	'niceDate': function(){
		return moment(this.deadline).format('MMMM Do YYYY, h:mm:ss a');
	},
	'niceDateAdded': function(){
		return moment(this.submitted).format('MMMM Do YYYY, h:mm:ss a');
	}
});

Template.unallocatedTask.onRendered(function(){
	$(".unallocated-accordion").accordion({collapsible: true, active: false });
	$(".unallocated-accordion > h3").click(function(){
		console.log('header clicked');
	});

});