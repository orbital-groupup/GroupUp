let isPast = ( date ) => {
  // Disabling this
  
  let today = moment().format();
  return moment( today ).isAfter( date );
  
  // return true;
};

Template.events.onCreated( () => {
  let template = Template.instance();
  template.subscribe( 'events' );
});


Template.events.onRendered( () => {
  var groupId = Router.current().params._id;
  $( '#events-calendar' ).fullCalendar({

    header: {
        left: 'prev,next',
        center: 'title',
        right: 'agendaDay,agendaWeek,month'
    },
    defaultView: 'agendaWeek',
    contentHeight:'auto',
    minTime: '08:00:00',
    maxTime:'22:00:00',
    
    events( start, end, timezone, callback ) {
      
      var eventView = Session.get('eventView');
      if (eventView === 'odd'){
        var options = {weekType: {$not: 'Even Week'}, groupId: groupId};
      }
      else if (eventView === 'even'){
        var options = {weekType: {$not: 'Odd Week'}, groupId: groupId};
      }
      else{
        var options = {groupId: groupId};
      }

      let data = Events.find(options).fetch().map( ( event ) => {
        if (event.auto === false){
          event.editable = !isPast( event.start );
        }
        else 
          event.editable = true;
        return event;
      });

      if ( data ) {
        callback( data );
      }
    },

    eventRender( event, element ) {
      element.find( '.fc-content' ).html(
        `<h4>${ event.title }</h4>
         <p class="guest-count">${ event.owner }</p>
         <p class="type-${ event.type }">#${ event.type }</p>
        `

      );
    },

    eventResize(event, delta, revert){
      let date=event.start.format();
      if (!isPast(date) && !event.auto){
        let update={
          _id: event._id,
          start: date,
          owner: event.owner,
          auto: false,
          end: event.end.format()
        };
        Meteor.call('editEvent', update, (error) => {
          if (error){
            Bert.alert(error.reason, 'danger');
          }
          else{
            Bert.alert('Event edit success!', 'success');
          }
        });
      }
      else revert();
    },

    eventDrop( event, delta, revert ) {
      let date = event.start.format();
      if ( !isPast( date ) && !event.auto) {
        let update = {
          _id: event._id,
          start: date,
          owner: event.owner,
          auto: false,
          end: event.end.format()
        };

        Meteor.call( 'editEvent', update, ( error ) => {
          if ( error ) {
            Bert.alert( error.reason, 'danger' );
          }
          else{
            Bert.alert('Event edit success!', 'success');
          }
        });
      } else {
        revert();
        if (event.auto){
          Bert.alert('Unable to edit data added automatically by the parser!', 'danger');
        }
        else
          Bert.alert( 'Sorry, you can\'t move items to the past!', 'danger' );
      }
    },

    dayClick( date ) {
      Session.set( 'eventModal', { type: 'add', date: date.format() } );
      $( '#add-edit-event-modal' ).modal( 'show' );
    },

    eventClick( event ) {
      Session.set( 'eventModal', { type: 'edit', event: event._id } );
      $( '#add-edit-event-modal' ).modal( 'show' );
    }




  });

  Tracker.autorun( () => {

    var eventView = Session.get('eventView');
    if (eventView === 'odd'){
      var options = {weekType: {$not: 'Even Week'}, groupId: groupId};
    }
    else if (eventView === 'even'){
      var options = {weekType: {$not: 'Odd Week'}}, groupId: groupId;
    }
    else{
      var options = {groupId: groupId};
    }
    Events.find(options).fetch();
    $( '#events-calendar' ).fullCalendar( 'refetchEvents' );
  });
});
