Template.groupsList.helpers({
	groups: function() {
		return Groups.find({members: Meteor.userId()});
	}
});