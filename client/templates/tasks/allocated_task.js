Template.allocatedTask.helpers({
	'ownsTask': function(){
		return this.allocatedTo === Meteor.user().username;
	}
});