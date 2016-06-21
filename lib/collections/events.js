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

/*
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
  'hours': {
    type: Number,
    label: 'The time in hours that this event will start'
  },
  'groupId': {
    type: String,
    label: 'The id of the group this event belongs to.'
  }
});

Events.attachSchema( EventsSchema );
*/

