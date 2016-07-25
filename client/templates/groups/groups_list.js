Template.groupsList.created = function() {
	Session.set('groupSubmitErrors', {});
}

Template.groupsList.rendered = function() {
 	$('a[rel=tooltip]').tooltip() //initialize all tooltips in this template
};

Template.groupsList.helpers({
	errorMessage: function(field) {
		return Session.get('groupSubmitErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('groupSubmitErrors')[field]? 'has-error': '';
	},
	groups: function() {
		return Groups.find({ "members.userId": Meteor.userId()});
	},
	noGroups: function() {
		return Groups.find({ "members.userId": Meteor.userId()}).fetch().length === 0;
	},
	username: function() { return Meteor.user().username;}
});

Template.groupsList.events({
	'click button#groupSubmitBtn': function(e) {
		e.preventDefault();

		var group = {
			title: $("#groupSubmitModal").find('[name=title]').val()
		};

		var errors = validateGroup(group);
		
		Meteor.call('groupInsert', group, function(error, result) {
			if (error) {
				return throwError(error.reason);
			}
			$( '#groupSubmitModal' ).modal( 'hide' );
  			$( '.modal-backdrop' ).fadeOut();
		})
	}
});
