Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() { return Meteor.subscribe('groups'); }
});

// home page only renders if user is not logged in
Router.route('/', function() {
	if (Meteor.user()) {
   		 Router.go('groupsList');
   	}
	this.layout('home');
	this.render();
});
Router.route('/groups', {name: 'groupsList'});
Router.route('/groups/:_id', {
	name: 'groupPage',
	waitOn: function() { return Meteor.subscribe('tasks', this.params._id)},
	data: function() { return Groups.findOne(this.params._id); }
});
Router.route('/groups/:_id/edit', {
	name: 'groupEdit',
	data: function() { return Groups.findOne(this.params._id); }
});

Router.route('/groups/:_id/tasksubmit', {
	name: 'taskSubmit'
});

Router.route('/groups/:_id/invite', {
	name: 'inviteToGroup'
});

Router.route('/groups/:_id/events', {
	name: 'events',
	waitOn: function() { return Meteor.subscribe('events', this.params._id)},
	data: function() { return Groups.findOne(this.params._id); }
});

Router.route('/join', {
	name: 'joinGroup'
});
Router.route('/groupsubmit', {name: 'groupSubmit'});


var requireLogin = function() {
	if (! Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			Router.go('/');
			//this.render('accessDenied');
		}
	} else {
		this.next();
	}
}

var requireMember = function(){
	if(_.find(Groups.findOne(this.params._id).members, function(m){ return m.name === Meteor.user().username; } ) ){
			this.next();
		}
		else{
		 	this.render('groupAccessDenied');
		}
}

Router.onBeforeAction('dataNotFound', {only: 'groupPage'});
Router.onBeforeAction(requireLogin, {only: ['groupsList', 'groupPage', 'groupSubmit', 'joinGroup', 'taskSubmit'] });
Router.onBeforeAction(requireMember, {only: ['groupPage', 'taskSubmit', 'events']});