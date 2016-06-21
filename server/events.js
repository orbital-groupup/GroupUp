Meteor.methods({
  addEvent( event ) {
    check( event, {
      title: String,
      start: String,
      end: String,
      type: String,
      dow: Match.Optional(Array),
      auto: Boolean,
      weekType: Match.Optional(String),
      owner: String
    });

    try {
      return Events.insert( event );
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});

Meteor.methods({
  editEvent( event ) {
    check( event, {
      _id: String,
      title: Match.Optional( String ),
      start: String,
      end: String,
      type: Match.Optional( String ),
      dow: Match.Optional(Array),
      weekType: Match.Optional(String),
      auto: Boolean,
      owner: String
    });

    try {
      return Events.update( event._id, {
        $set: event
      });
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});

Meteor.methods({
  removeEvent( event ) {
    check( event, String );

    try {
      return Events.remove( event );
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});

Meteor.methods({
  'clearAllEvents': function(){
    Events.remove({});
  },

  'clearMyEvents': function(){
    Events.remove({owner: Meteor.user().username});
  }
})