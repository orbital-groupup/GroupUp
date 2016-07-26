Template.userEdit.events({
	'click .link-fb': function(){
		Meteor.linkWithFacebook()
	},
	'click .unlink-fb': function(){
		Meteor.call('_accounts/unlink/service', Meteor.userId(), 'facebook');
	},
	'click .link-github': function(){
		Meteor.linkWithGithub();
	},
	'click .unlink-github': function () {
      Meteor.call('_accounts/unlink/service', Meteor.userId(), 'github');
    },
    'click .link-google': function(){
		Meteor.linkWithGoogle();
	},
	'click .unlink-google': function () {
      Meteor.call('_accounts/unlink/service', Meteor.userId(), 'google');
    },
    'click .link-twitter': function(){
		Meteor.linkWithTwitter();
	},
	'click .unlink-twitter': function () {
      Meteor.call('_accounts/unlink/service', Meteor.userId(), 'twitter');
    }
});

Template.userEdit.helpers({
	services: function () {
      var user = Meteor.user(); 
      if (user) {
        return _.keys(user.services);
      } else {
        return;
      }
    },

  unwantedService: function(service){
  	return service === 'password' || service === 'resume' || service === 'email';
  }
});