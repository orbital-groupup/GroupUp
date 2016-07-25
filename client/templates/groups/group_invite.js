Template.inviteToGroup.events({
	'submit form': function(e){
		e.preventDefault();

		var group = {
			groupId: Router.current().params._id,
			username: $(e.target).find('[name=username]').val()
		};

		Meteor.call('inviteToGroup', group, function(error,result){
			if (error)
				return throwError("User does not exist.");

			Router.go('groupPage', {_id: result._id});
		});
	}
});