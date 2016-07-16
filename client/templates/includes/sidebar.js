Template.sidebar.rendered = function() {

	$("#menu-toggle").click(function(e) {
	   e.preventDefault();
	   $("#wrapper").toggleClass("toggled");
	 });
};

Template.sidebar.helpers({
	ownGroup: function() {
		return this.userId === Meteor.userId() || this.group.userId === Meteor.userId();
	},
	myData: function(){
		if (this.title)
			return this;
		else return this.group;	// group data from router
	},
	title: function(){
		return this.title || this.group.title;
	},
});