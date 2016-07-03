Template.groupEdit.created = function() {
	Session.set('groupEditErrors', {});
}

Template.groupEdit.helpers({
	errorMessage: function(field) {
		return Session.get('groupEditErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('groupEditErrors')[field] ? 'has-error': '';
	}
});

Template.groupEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		var currentGroupId = this._id;

		var groupProperties = {
			title: $(e.target).find('[name=title]').val()
		};

		var errors = validateGroup(groupProperties);
		if (errors.title)
			return Session.set('groupEditErrors', errors);

		Groups.update(currentGroupId, {$set: groupProperties}, function(error) {
			if (error)
				throwError(error.reason);
			else
				Router.go('groupPage');
		});
	},

	'click .delete': function(e) {
		e.preventDefault();

		if (confirm("Delete this group?")) {
			var currentGroupId = this._id;
			Groups.remove(currentGroupId);
			Router.go('groupsList');
		}
	}
});