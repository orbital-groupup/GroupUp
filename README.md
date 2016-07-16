# GroupUp
GroupUp is created as part of NUS Orbital 2016.

## Live Preview
```
https://orbitalgroup-up.herokuapp.com/
```

## Description
GroupUp is a group project management web application which aims to solve the problems faced by group individuals and facilitate smooth project completion.

## Motivation
Group projects are very common in many areas of life, yet people struggle with group projects since they are difficult to manage. We wish to empower people with such a project management application so that the projects can be executed successfully and smoothly.

## Milestone 2 User Stories
- [x] As a leader of a group, I need to distribute tasks appropriately to other group members. To do this, the system should allow me to input the task and randomly or manually allocate it to members in the group based on difficulty.

- [x] As a member of a group, I need to be able to keep track of deadlines. To do this, the system should remind me of deadlines that have been inputted to me (if my task deadline is approaching) or the entire group (if a group level deadline is approaching).

- [x] As a leader of a group, I need to be able to keep track of the group’s schedule so that I can find an appropriate time slot to conduct a group meeting. To do this, the system should allow me to view the entire group’s calendar and identify time slots where all members are available.

## Milestone 3 User Stories
- [ ] As a member of a group, I need to communicate easily with other members of the group. To do this, the system should allow me to chat directly to other members in the group.

- [ ] As a member of a group, I need to know if my group is on pace to completing the project. To do this, the system should allow me to visualize the progress of the project through graph and analytics.

- [ ] As a project grader, I am interested in knowing the different contributions of group members in the project in order to determine whether all members of the group deserve to be graded equally. To do this, the system should be able to generate a summary of the work done by each individual in the group.

## Project Log
```
https://docs.google.com/spreadsheets/d/1uSpCxnMvNcP7-RXX3IFkLeBh8X5B8Y5paSeKdsY0TFU
```

## Run on your system
### To run
```
meteor --settings settings.json
```

### Setting up settings.json
```
{
	"private": {
		"smtp": {
			"username" : "your_email_username",
			"password": "your_email_password",
			"server": "your_smtp_server",
			"port": your_smtp_port
		},
		"oauth-fb": {
			"appId": "your_app_id",
			"secret": "your_app_secret"
		},
		"oauth-github":{
			"clientId": "your_app_id",
			"secret": "your_app_secret"
		},
		"oauth-google":{
			"clientId": "your_app_id",
       		"secret": "your_app_secret"
		},
		"oauth-twitter":{
			"consumerKey": "your_app_id",
      	    "secret": "your_app_secret"
		}
	}
}
```

## Creators
GroupUp is a product of team 0xDEADBEEF, as part of NUS Orbital 2016.

