Template.notifications.helpers({
	notifications: function(){
		return Notifications.find({userId: Meteor.user().username, read:false})
	},
	notificationCount: function(){
		return Notifications.find({userId: Meteor.user().username, read:false}).count();
	}
});

Template.notificationItem.helpers({
	notificationPath: function(){
		return Router.routes.groupPage.path({_id: this.groupId});
	}
});

Template.notificationItem.events({
	'click a': function(){
		Notifications.remove(this._id);
	}
});