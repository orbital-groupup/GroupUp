Template.joinGroup.events({
	'submit form': function(e) {
		e.preventDefault();

		var group = {
			groupId: $(e.target).find('[name=groupId]').val()
		};

		Meteor.call('joinGroup', group, function(error, result) {
			if (error) {
				return alert(error.reason);
			}

			Router.go('groupPage', {_id: result._id});
		})
	}
});