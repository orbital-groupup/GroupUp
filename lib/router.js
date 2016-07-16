Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() { return [Meteor.subscribe('groups'), Meteor.subscribe('notifications')] }
});

// home page only renders if user is not logged in
Router.route('/', function() {
	if (Meteor.user()) {
   		 Router.go('groupsList');
   	}
	this.layout('home');
	this.render();
});
Router.route('/edit', {
	name: 'userEdit',
	waitOn: function() {return Meteor.subscribe('userData', Meteor.userId());},
	data: function(){ return Meteor.users.findOne();}
});
Router.route('/groups', {
	name: 'groupsList',
});
Router.route('/groups/:_id', {
	name: 'groupPage',
	layoutTemplate: 'group_layout',
	waitOn: function() { return Meteor.subscribe('tasks', this.params._id)},
	data: function() { return Groups.findOne(this.params._id); }
});
Router.route('/groups/:_id/edit', {
	name: 'groupEdit',
	layoutTemplate: 'group_layout',
	data: function() { return Groups.findOne(this.params._id); }
});

Router.route('/groups/:_id/tasksubmit', {
	layoutTemplate: 'group_layout',
	name: 'taskSubmit'
});

Router.route('/groups/:_id/upload', {
	name: 'fileUpload',
	layoutTemplate: 'group_layout',
	waitOn: function() {
      return [
        Meteor.subscribe('items'),
        Meteor.subscribe('uploads', this.params._id)
      ];
    },
    data: function() {
      return {
        item: Items.findOne(),
        uploads: Uploads.find(),
        group:  Groups.findOne(this.params._id)
      }
    }
});

Router.route('/groups/:_id/report', {
	name: 'report',
	waitOn: function(){
		return Meteor.subscribe('tasks', this.params._id)
	},
	data: function(){
		return {
			group: Groups.findOne(this.params._id)
		}
	}
});

Router.route('/groups/:_id/invite', {
	layoutTemplate: 'group_layout',
	name: 'inviteToGroup'
});

Router.route('/groups/:_id/events', {
	name: 'events',
	layoutTemplate: 'group_layout',
	waitOn: function() { return Meteor.subscribe('events', this.params._id)},
	data: function() { return Groups.findOne(this.params._id); }
});

Router.route('/groups/:_id/chat', {
	name: 'chat',
	layoutTemplate: 'group_layout',
	waitOn: function() { return Meteor.subscribe('messages', this.params._id)},
	data: function() { return Groups.findOne(this.params._id); }
});

Router.route('/join', {
	name: 'joinGroup',
});
Router.route('/groupsubmit', {
	name: 'groupSubmit',
});


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
	if(_.find(Groups.findOne(this.params._id).members, function(m){ return m.userId === Meteor.userId(); } ) ){
			this.next();
		}
		else{
		 	this.render('groupAccessDenied');
		}
}

Router.onBeforeAction('dataNotFound', {only: 'groupPage'});
Router.onBeforeAction(requireLogin, {only: ['userEdit', 'groupsList', 'groupPage', 'groupSubmit', 'joinGroup', 'taskSubmit'] });
Router.onBeforeAction(requireMember, {only: ['groupPage', 'taskSubmit', 'events']});