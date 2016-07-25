Template.module.helpers({

	moduleInfo: function(){
		if (Session.get('mod'+this.index) !== undefined){
			var allTimings = Session.get('mod'+ this.index);
			var that = this;
			var myTiming = _.find(allTimings, function(e){
				return e.ClassNo == that.query.moduleSessionNumber && e.LessonType.toLowerCase().startsWith(that.query.moduleSessionType.toLowerCase());
			});

			var dayNum = 1;
			switch(myTiming.DayText){
				case 'Monday':
					dayNum=1;
					break;
				case 'Tuesday':
					dayNum=2;
					break;
				case 'Wednesday':
					dayNum=3;
					break;
				case 'Thursday':
					dayNum=4;
					break;
				case 'Friday':
					dayNum=5;
					break;
				case 'Satuday':
					dayNum=6;
					break;
				case 'Sunday':
					dayNum=7;
					break;
			}


			var event = {
				title: this.query.moduleCode + this.query.moduleSessionType,
				start: myTiming.StartTime.substr(0,2) + ':' + myTiming.StartTime.substr(2,2) + ':00',
				end: myTiming.EndTime.substr(0,2) + ':' + myTiming.EndTime.substr(2,2) + ':00',
				type: 'School',
				dow: [dayNum],
				weekType: myTiming.WeekText,
				groupId: this.groupId,
				auto: true,
				owner: Meteor.user().profile.name,
				userId: Meteor.userId()
			};

			Meteor.call('addEvent', event, function(err,res){
				if (err)
					console.log(err);
				else{
					//console.log('success adding');
					return res;
				}
			});

			Session.set('mod'+this.index, undefined);
	
			return myTiming.DayText + ' ' + myTiming.StartTime + '-' + myTiming.EndTime + ' ' + myTiming.Venue + ' ' + myTiming.WeekText;
		}
	}

});
