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

Meteor.publish('items', function() {
  return Items.find();
});

Meteor.publish('uploads', function(groupId) {
  return Uploads.find({groupId: groupId});
})

Meteor.publish('userData', function(userId){
	return Meteor.users.find({_id: userId});
})

Meteor.publish('messages', function(groupId) {
	return Messages.find({groupId: groupId});
})