Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() { return Meteor.subscribe('groups'); }
});


Router.route('/', {name: 'home'});
Router.route('/groups', {name: 'groupsList'});
Router.route('/groups/:_id', {
	name: 'groupPage',
	data: function() { return Groups.findOne(this.params._id); }
});
Router.route('/submit', {name: 'groupSubmit'});

var requireLogin = function() {
	if (! Meteor.user()) {
		if (Meteor.logginIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
}

Router.onBeforeAction('dataNotFound', {only: 'groupPage'});
Router.onBeforeAction(requireLogin, {only: ['groupsList', 'groupPage', 'groupSubmit'] });