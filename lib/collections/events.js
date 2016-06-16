Events = new Mongo.Collection( 'events' );

Events.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Events.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let EventsSchema = new SimpleSchema({
  'title': {
    type: String,
    label: 'The title of this event.'
  },
  'start': {
    type: String,
    label: 'When this event will start.'
  },
  'end': {
    type: String,
    label: 'When this event will end.'
  },
  'type': {
    type: String,
    label: 'What type of event is this?',
    allowedValues: [ 'Group Meeting', 'Internal Deadline', 'Deadline', 'Miscellaneous' ]
  },
  'guests': {
    type: Number,
    label: 'The number of guests expected at this event.'
  }
});

Events.attachSchema( EventsSchema );

Meteor.methods({
  addEvent( event ) {
    check( event, {
      title: String,
      start: String,
      end: String,
      type: String,
      guests: Number
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
      guests: Match.Optional( Number )
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