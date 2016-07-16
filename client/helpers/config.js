
Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'first-name',
        fieldLabel: 'First name',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Please write your first name");
            return false;
          } else {
            return true;
          }
        }
    }, {
        fieldName: 'last-name',
        fieldLabel: 'Last name',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Please write your last name");
            return false;
          } else {
            return true;
          }
        }
    },],
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});