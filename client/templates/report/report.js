Template.report.events({
	'click #generate-report': function(){
		var membersInfo = _.map(this.group.members, function(member){return member.name + ': ' + member.actualPoints + ' points'});
		var groupTasks = Tasks.find({groupId: this.group._id, completed: true}).fetch();
		//var groupTasks = Tasks.find({groupId: this.group._id, completed: true}, {sort: {"allocatedTo.name": -1}}).fetch();

		function compare(a,b){
			if (a.allocatedTo.name.toLowerCase() < b.allocatedTo.name.toLowerCase())
				return -1;
			if (a.allocatedTo.name.toLowerCase() > b.allocatedTo.name.toLowerCase())
				return 1;
			return 0;
		};


		groupTasks = groupTasks.sort(compare);
		groupTasks = _.map(groupTasks, function(task){
			return task.allocatedTo.name + ' completed task: ' + task.title + '.' 
				+ '\nDescription: ' + task.description 
				+ '\nPoints awarded: ' + task.points
				+ '\n\n';
		});


		// Define the pdf-document 
		var docDefinition = { 
			content: [
				{
					// Report title
					text: 'Group Report for ' + this.group.title,
					style: 'header'
				},
				{
					// Group Member List Title
					text: '\nGroup Members',
					style: 'contentTitle'
				},
				{	
					// Group Member Name List
					ul: membersInfo
				},
				{
					// Task for Members
					text: '\nTasks',
					style: 'contentTitle'
				},
				{
					ul: groupTasks
				}
			],
			footer: {
				text: 'Generated by GroupUp',
				style: 'small',
				// margin: [left, top, right, bottom]
				margin: [0,15,265,0],
				alignment: 'right'
			},
			styles: {
				header: {
					fontSize: 18,
					bold: true
				},
				contentTitle: {
					fontSize: 15,
					bold: true
				},
				small: {
					fontSize: 8
				}
			}
		};
		
		// Start the pdf-generation process 
		pdfMake.createPdf(docDefinition).open();
	}
});