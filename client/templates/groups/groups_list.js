Template.groupsList.helpers({
	groups: function() {
		return Groups.find({ "members.name": Meteor.userId()});
	}
});