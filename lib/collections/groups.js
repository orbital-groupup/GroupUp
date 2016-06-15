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