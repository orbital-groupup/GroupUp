Template.groupSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var group = {
			title: $(e.target).find('[name=title]').val()
		};

		Meteor.call('groupInsert', group, function(error, result) {
			if (error) {
				return alert(error.reason);
			}

			Router.go('groupPage', {_id: result._id});
		})
	}
});