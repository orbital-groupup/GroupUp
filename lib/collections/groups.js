Groups = new Mongo.Collection('groups');

Groups.allow({
	update: function(userId, group) { return ownsDocument(userId, group); },
	remove: function(userId, group) { return ownsDocument(userId, group); },
});

Groups.deny({
	update: function(userId, group, fieldNames) {
		//may only edit the follow field:
		return (_.without(fieldNames, 'title').length > 0);
	}
});

validateGroup = function(group) {
	var errors = {};

	if (!group.title)
		errors.title = "Please fill in a title for your group";

	return errors;
}

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
			members: [
				Meteor.userId()
			],
			submitted: new Date()
		});

		var groupId = Groups.insert(group);

		return {
			_id: groupId
		};
	},

	joinGroup: function(groupAttributes) {
		check(Meteor.userId(), String);
		check(groupAttributes, {
			groupId: String
		});

		var groupId = Groups.update({_id: groupAttributes.groupId}, {$push: {members: Meteor.userId()} });

		return {
			_id: groupAttributes.groupId
		}
	},

	inviteToGroup: function(groupAttributes){
		check(Meteor.userId(), String);
		check(groupAttributes, {
			groupId: String,
			username: String
		});

		var idToAdd = Meteor.users.findOne({username: groupAttributes.username})._id;

		var groupId = Groups.update({_id: groupAttributes.groupId}, {$push: {members: idToAdd}});

		return {
			_id: groupAttributes.groupId
		}
	}
});