Template.chat.helpers({
	messages: function() {
		return Messages.find({groupId: this._id}).fetch().reverse();
	}
});

Template.chat.events({
	'submit form': function(e, template) {
		e.preventDefault();

		var $body = $(e.target).find('[name=body]');
		var message = {
			body: $body.val(),
			groupId: template.data._id
		};
		Meteor.call('messageInsert', message, function(error, messageId) {
			if (error) throwError(error.reason);
			else $body.val('');
		});
	}
});