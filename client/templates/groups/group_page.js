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