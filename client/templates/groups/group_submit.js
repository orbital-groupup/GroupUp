Template.groupSubmit.created = function() {
	Session.set('groupSubmitErrors', {});
}

Template.groupSubmit.helpers({
	errorMessage: function(field) {
		return Session.get('groupSubmitErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('groupSubmitErrors')[field]? 'has-error': '';
	}
});

Template.groupSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var group = {
			title: $(e.target).find('[name=title]').val()
		};

		var errors = validateGroup(group);
		if (errors.title)
			return Session.set('groupSubmitErrors', errors);
		
		Meteor.call('groupInsert', group, function(error, result) {
			if (error) {
				return throwError(error.reason);
			}

			Router.go('groupsList');
		})
	}
});