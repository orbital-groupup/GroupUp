Template.groupItem.helpers({
	ownGroup: function() {
		return this.userId === Meteor.userId();
	}
});