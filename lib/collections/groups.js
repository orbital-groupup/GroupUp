Groups = new Mongo.Collection('groups');

Groups.allow({
	update: function(userId, group) { return ownsDocument(userId, group); },
	remove: function(userId, group) { return ownsDocument(userId, group); },
});

Groups.deny({
	update: function(userId, group, fieldNames) {
		//may only edit the following field:
		return (_.without(fieldNames, 'title').length > 0);
	}
});

// second deny callback so update succeeds if title is not empty
Groups.deny({
	update: function(userId, group, fieldNames, modifier) {
		var errors = validateGroup(modifier.$set);
		return errors.title;
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

		var errors = validateGroup(groupAttributes);
		if (errors.title)
			throw new Meteor.Error('invalid-group', "You must set a title for your group");

		var user = Meteor.user();
		var group = _.extend(groupAttributes, {
			userId: user._id,
			author: user.profile.name,
			members: [{
				userId: Meteor.userId(),
				name: Meteor.user().profile.name,
				expectedPoints: 0,
				actualPoints: 0
			}],
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

		var groupId = Groups.update({_id: groupAttributes.groupId}, {$push: {members: {userId: Meteor.userId(), name: Meteor.user().profile.name, expectedPoints: 0, actualPoints: 0}} });

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

		var userToAdd = Meteor.users.findOne({username: groupAttributes.username});

		var groupId = Groups.update({_id: groupAttributes.groupId}, {$push: {members: {userId: userToAdd._id, name: userToAdd.profile.name, expectedPoints: 0, actualPoints: 0}}});

		return {
			_id: groupAttributes.groupId
		}
	},

	updateActualPoints: function(groupAttributes){
		check(Meteor.userId(), String);
		check(groupAttributes, {
			groupId: String,
			allocatedTo: {
				name: String,
				userId: String
			},
			points: Number,
			completed: Boolean
		});

		Groups.update({_id: groupAttributes.groupId, "members.userId": Meteor.userId() }, {$inc: {"members.$.actualPoints": groupAttributes.points} });
	},

	updateExpectedPoints: function(groupAttributes, allocatedTo){
		check(Meteor.userId(), String);
		check(groupAttributes, {
			groupId: String,
			points: Number
		});
		
		Groups.update({_id: groupAttributes.groupId, "members.userId": allocatedTo}, {$inc: {"members.$.expectedPoints": groupAttributes.points}});

	}
});