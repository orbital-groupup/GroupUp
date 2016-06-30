Template.groupPage.helpers({
	unallocatedTasks: function(){
		return Tasks.find({allocatedTo: ''});
	},

	hasUnallocatedTasks: function(){
		return Tasks.find({allocatedTo: ''}).count()>0;
	},

	allocatedTasks: function(){
		return Tasks.find({allocatedTo: {$ne: ''}, completed: false});
	},

	userTasks: function(){
		return Tasks.find({allocatedTo: Meteor.user().username, completed: false});
	}
});

Template.groupPage.events({
	'click button#autoAllocate': function(e){
		e.preventDefault();
		var that = this;
		bootbox.confirm('Auto allocate all available tasks to group members?', function(res){
			if (res){
				var tasks = Tasks.find({allocatedTo: ''}).fetch();
				var groupId = that._id;

				Meteor.call('autoAllocateTasks', tasks, groupId, function(error){
					if (error)
						throwError(error.reason);
				});
			}	
		});

	}
});