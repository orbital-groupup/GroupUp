Template.taskSubmit.events({
	'submit form': function(e, template) {
		e.preventDefault();

		var task = {
			title: $(e.target).find('[name=title]').val(),
			description: $(e.target).find('[name=description]').val(),
			points: $(e.target).find('[name=points]').val(),
			deadline: $(e.target).find('[name=deadline]').val(),
			reminder: $(e.target).find('[name=reminder]').val(),
			groupId: Router.current().params._id
		};

		Meteor.call('taskInsert', task, function(error, result) {
			if (error) {
				return alert(error.reason);
			}

			Router.go('groupPage', {_id: result._id});
		})
	}
});

Template.taskSubmit.onRendered(function(){
	this.$('.datetimepicker').datetimepicker();
});