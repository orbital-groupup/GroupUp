Meteor.startup(function () {
  // init items collection
  if (Items.find().count() == 0) {
    Items.insert({name: 'My Item', uploads: []});
  }

  UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/.uploads/',
    checkCreateDirectories: true,
    getDirectory: function(fileInfo, formData) {
      if (formData && formData.directoryName != null) {
        return formData.directoryName;
      }
      return "";
    },
    getFileName: function(fileInfo, formData) {
      if (formData && formData.prefix != null) {
        return formData.prefix + '_' + fileInfo.name;
      }
      return fileInfo.name;
    },
    finished: function(fileInfo, formData) {
      if (formData && formData._id != null) {
        Items.update({_id: formData._id}, { $push: { uploads: fileInfo }});
      }
    }
  });

  ServiceConfiguration.configurations.upsert({service: 'facebook'}, {
    $set: {
      appId: Meteor.settings.private['oauth-fb'].appId,
      secret: Meteor.settings.private['oauth-fb'].secret,
      loginStyle: 'popup'
    }
  });

  ServiceConfiguration.configurations.upsert({service: 'github'}, {
    $set: {
      clientId: Meteor.settings.private['oauth-github'].clientId,
      secret: Meteor.settings.private['oauth-github'].secret,
      loginStyle: 'popup'
    }
  });

  ServiceConfiguration.configurations.upsert({service: 'google'}, {
    $set: {
      clientId: Meteor.settings.private['oauth-google'].clientId,
      secret: Meteor.settings.private['oauth-google'].secret,
      loginStyle: 'popup'
    }
  });

  ServiceConfiguration.configurations.upsert({service: 'twitter'}, {
    $set: {
      consumerKey: Meteor.settings.private['oauth-twitter'].consumerKey,
      secret: Meteor.settings.private['oauth-twitter'].secret,
      loginStyle: 'popup'
    }
  });
});