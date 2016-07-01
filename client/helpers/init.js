Meteor.startup(function() {
  Uploader.finished = function(index, file) {
  	file = _.extend(file, {
  		groupId: Router.current().params._id
  	});
    Uploads.insert(file);
  }
});