Meteor.publish('groups', function() {
	return Groups.find();
});