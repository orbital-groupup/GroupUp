Template.groupsList.helpers({
	groups: function() {
		return Groups.find({ "members.userId": Meteor.userId()});
	}
});