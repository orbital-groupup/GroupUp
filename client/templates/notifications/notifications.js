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
	},

	isEvent: function(){
		return this.type==="event";
	},

	isTask: function(){
		return this.type==="task";
	},

	formattedDate: function(){
		return moment(this.start).format('MMMM Do YYYY, h:mm:ss a');
	}
});

Template.notificationItem.events({
	'click a': function(){
		Notifications.remove(this._id);
	}
});