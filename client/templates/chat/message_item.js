Template.messageItem.helpers({
	submittedText: function() {
		var str = this.submitted.toString();
		var arr = str.split(" ");
		var time = arr[4].substring(0, arr[4].length-3);
		var day = arr[2] + " " + arr[1];
		return time + ", " + day;
	}
});