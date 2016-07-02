Meteor.startup(function() {
  Uploader.finished = function(index, file) {
  	file = _.extend(file, {
  		groupId: Router.current().params._id
  	});
  	Meteor.call('createNewUploadNotification', file, function(err){
  		if (err){
  			throwErr (err.reason);
  			return;
  		}
  	});
    Uploads.insert(file);
  }
});