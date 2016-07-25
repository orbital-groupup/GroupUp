Messages = new Mongo.Collection('messages');

Meteor.methods({
	messageInsert: function(messageAttributes) {
		check(this.userId, String);
		check(messageAttributes, {
			groupId: String,
			body: String
		});

		var user = Meteor.user();

		message = _.extend(messageAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});

		return Messages.insert(message);
	}
});