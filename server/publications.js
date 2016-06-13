Meteor.publish('groups', function() {
	return Groups.find();
});

Meteor.publish('tasks', function(groupId){
	return Tasks.find({groupId: groupId});
});