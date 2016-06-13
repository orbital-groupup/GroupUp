Groups = new Mongo.Collection('groups');

Meteor.methods({
	groupInsert: function(groupAttributes) {
		check(Meteor.userId(), String);
		check(groupAttributes, {
			title: String
		});

		var user = Meteor.user();
		var group = _.extend(groupAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});

		var groupId = Groups.insert(group);

		return {
			_id: groupId
		};
	}
});