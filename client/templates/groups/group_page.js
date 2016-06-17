Template.groupPage.helpers({
	unallocatedTasks: function(){
		return Tasks.find({allocatedTo: ''});
	},

	allocatedTasks: function(){
		return Tasks.find({allocatedTo: {$ne: ''}});
	},

	userTasks: function(){
		return Tasks.find({allocatedTo: Meteor.userId()});
	}
});