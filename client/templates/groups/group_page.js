Template.groupPage.helpers({
	unallocatedTasks: function(){
		return Tasks.find({allocatedTo: ''});
	},

	hasUnallocatedTasks: function(){
		return Tasks.find({allocatedTo: ''}).count()>0;
	},

	allocatedTasks: function(){
		return Tasks.find({allocatedTo: {$ne: ''}});
	},

	userTasks: function(){
		return Tasks.find({allocatedTo: Meteor.user().username});
	}
});