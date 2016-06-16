Template.groupEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		var currentGroupId = this._id;

		var groupProperties = {
			title: $(e.target).find('[name=title]').val()
		};

		Groups.update(currentGroupId, {$set: groupProperties}, function(error) {
			if (error)
				throwError(error.reason);
			else
				Router.go('groupPage', {_id: currentGroupId});
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