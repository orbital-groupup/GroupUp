Template.sidebar.rendered = function() {
	$("#menu-toggle").click(function(e) {
	   e.preventDefault();
	   $("#wrapper").toggleClass("toggled");
	 });
};

Template.sidebar.helpers({
	ownGroup: function() {
		return this.userId === Meteor.userId();
	}
});