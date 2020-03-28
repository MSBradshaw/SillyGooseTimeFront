import React from 'react';
import '../css/matches.css';
import {delete_cookies, get_auth_cookies, set_cookies} from '../cookies';

const axios = require("axios");

class Matches extends React.Component {

    constructor(props) {
        super(props);
		// state currently has a bunch of filler test data commented out it in
        this.state = {
			// matches:
			// [
			// 	{
			// 		match_id: 2,
			// 		people:"1,4,7",
			// 		place:6,
			// 		activity:"soccer",
			// 		status:{1:'accepted',4:'pending',7:'pending'}
			// 	},
			// 	{
			// 		match_id: 2,
			// 		people:"1,4,7",
			// 		place:6,
			// 		activity:"soccer",
			// 		status:{1:'pending',4:'pending',7:'pending'}
			// 	},
			// 	{
			// 		match_id: 2,
			// 		people:"1,4,7",
			// 		place:6,
			// 		activity:"soccer",
			// 		status:{1:'accepted',4:'accepted',7:'accepted'}
			// 	},
			// 	{
			// 		match_id: 2,
			// 		people:"1,2,4,7",
			// 		place:6,
			// 		activity:"soccer",
			// 		status:{1:'pending',2:'rejected',4:'accepted',7:'pending'}
			// 	}
			// ],
			// users:
			// {
			// 	1:{
			// 		userid: 1,
			// 		name: 'Michael B',
			// 		picture_path: "IMAGE-1585082902952.jpg",
			// 		type_of_user: 'users'
			// 	},
			// 	2:{
			// 		userid: 2,
			// 		name: 'Michael Raccoon',
			// 		picture_path: "IMAGE-1585082902952.jpg",
			// 		type_of_user: 'users'
			// 	},
			// 	4:{
			// 		userid: 4,
			// 		name: 'baby yoda and pikachu',
			// 		picture_path: "IMAGE-1585082982088.jpg",
			// 		type_of_user: 'users'
			// 	},
			// 	6:{
			// 		userid: 6,
			// 		name: 'Kitt Field',
			// 		picture_path: "IMAGE-1585083078951.jpg",
			// 		type_of_user: 'users'
			// 	},
			// 	7:{
			// 		userid: 7,
			// 		name: 'Muphens!',
			// 		picture_path: "IMAGE-1585083137898.jpg",
			// 		type_of_user: 'users'
			// 	}
			//
			// }
        }
    }

	componentDidMount() {
		// get the user's info form the back end based on the url param
		var self = this;
		var cookies = get_auth_cookies();
		self.setState({'userid':cookies[2]})
		var data = {'userid':cookies[2],'auth':cookies[1]}
		axios({
			method: 'post',
			url: 'http://localhost:8081/matches',
			data: data
		}).then(function(response){
			console.log(response['data']['matches'])
			var users = {}
			// create an object of the users mapped with their userid as the key
			for(var i in response['data']['users']){
				users[response['data']['users'][i]['userid']] = response['data']['users'][i]
			}
			console.log(users)
			for(var i in response['data']['matches']){
				response['data']['matches'][i]['status'] = JSON.parse(response['data']['matches'][i]['status'])
			}
			// save the info returned in the state
			self.setState({'matches': response['data']['matches'],'users':users})
		});
	}

    render(){
		var pending_matches = []
		var accepted_matches = []
		var rejected_matches = []
		// create a match card for each match
		for(var i in this.state['matches']){
			// count the people's statuses
			var status_counts = {'pending':0,'accepted':0,'rejected':0}
			var keys = Object.keys(this.state['matches'][i]['status'])
			for(var j in keys){
				var stat = this.state['matches'][i]['status'][keys[j]]
				status_counts[stat] += 1
			}

			// make an array of user html objects
			var place_int = parseInt(this.state['matches'][i]['place'])
			var users = this.state['matches'][i]['people'].split(',')
			var participants = []
			for(var j in users){
				var status = this.state['matches'][i]['status'][users[parseInt(j)]]
				var name = this.state.users[users[parseInt(j)]]['name']
				var picture = this.state.users[users[parseInt(j)]]['picture_path']
				participants.push(
					<a class="person" href={"http://localhost:3000/user/" + this.state.users[users[parseInt(j)]]['userid']}>
						<div class="person__image_wrapper">
							<img src={"http://localhost:8082/" + picture} />
						</div>
						<p class={"person__status " + status}>{status}</p>
						<p class="person__name">{name}</p>
					</a>
				)
			}

			// create buttons to approve or reject a match
			var pending_buttons = (<div></div>)
			if(status_counts['rejected'] === 0 && status_counts['accepted'] !== keys.length){
				var match_id = this.state['matches'][i]['match_id']
				var userid = this.state['userid']
				pending_buttons = (
					<div class="pending_buttons">
						<div class="accept_button" onClick={this.accept_or_reject.bind(this,match_id,userid,'accepted')}>Accept</div>
						<div class="reject_button" onClick={this.accept_or_reject.bind(this,match_id,userid,'rejected')}>Reject</div>
					</div>
				)
			}

			// create the match HTML
			var item = (
				<div class="match">
					<a class="match__title" href={"/match/" + this.state['matches'][i]['match_id']}>						
							<span class="match__title_activity">{this.state['matches'][i]['activity']} at</span>
							<span class="match__title_place">{this.state['users'][place_int]['name']}</span>
					</a>
					{participants}
					{pending_buttons}
				</div>
			)

			// assign the match to one of the status groups
			if(status_counts['rejected'] > 0){
				rejected_matches.push(item)
			}else if (status_counts['accepted'] == keys.length){
				accepted_matches.push(item)
			}else{
				pending_matches.push(item)
			}
		}
        return(
			<div class="all_matches">
				<h2>Pending Matches</h2>
				<div class="matches">
					{pending_matches}
				</div>
				<h2>Accepted Matches</h2>
				<div class="matches">
					{accepted_matches}
				</div>
				<h2>Rejected Matches</h2>
				<div class="matches">
					{rejected_matches}
				</div>
			</div>
        )
    }
	accept_or_reject(matchid,userid,status){
		console.log(matchid + ' ' + userid + ' ' + status)
		var data = {
			match_id: matchid,
			userid: userid,
			status: status
		}
		axios({
			method: 'patch',
			url: 'http://localhost:8081/matches',
			data: data
		}).then(function(rep){
			window.location.replace("/matches");
		})
	}
}

export default Matches;
