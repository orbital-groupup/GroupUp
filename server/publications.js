Meteor.publish('groups', function() {
	return Groups.find();
});

Meteor.publish('tasks', function(groupId){
	return Tasks.find({groupId: groupId});
});

Meteor.publish( 'events', function(groupId) { return Events.find({groupId: groupId}); } );

Meteor.publish('notifications', function(){
	return Notifications.find();
});