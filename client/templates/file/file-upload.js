Template['fileUpload'].helpers({
  myFormData: function() {
    return { directoryName: 'images', prefix: this._id, _id: this._id }
  },
  filesToUpload: function() {
    return Uploader.info.get();
  }
});

Template['uploadedInfo'].helpers({
  src: function() {
    if (this.type.indexOf('image') >= 0) {
      return '/upload/' + this.path;
    } else return '/file_icon.png';
  }
});

Template['uploadedInfo'].events({
  'click .deleteUpload':function() {
    var that = this;
    bootbox.confirm('Delete ' + this.name +' from group?', function(res){
      if (res){
        Meteor.call('deleteFile', that._id);
      }
    });
  }
});