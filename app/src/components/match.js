import React from 'react';
import '../css/match.css';
import UserProp from './userprops';
import {get_auth_cookies} from '../cookies';


const axios = require("axios");

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
	componentDidMount() {
		var cookies = get_auth_cookies();
		this.setState({'userid':cookies[2]})

		var self = this;
		axios({
			method: 'get',
			url: 'http://localhost:8081/match/' + this.props.match.params['id']
		}).then(function(response){
			console.log(response['data']['matches'])
			var users = {}
			// create an object of the users mapped with their userid as the key
			for(let i in response['data']['users']){
				users[response['data']['users'][i]['userid']] = response['data']['users'][i]
			}
			console.log(users)
			for(let i in response['data']['matches']){
				response['data']['matches'][i]['status'] = JSON.parse(response['data']['matches'][i]['status'])
			}
			// save the info returned in the state
			self.setState({'matches': response['data']['matches'],'users':users})
		})
	}
    render(){
		var match_item = -1;
		// create a match card for each match
		for(let i in this.state['matches']){
			// count the people's statuses
			var status_counts = {'pending':0,'accepted':0,'rejected':0}
			var keys = Object.keys(this.state['matches'][i]['status'])
			for(let j in keys){
				var stat = this.state['matches'][i]['status'][keys[j]]
				status_counts[stat] += 1
			}

			// make an array of user html objects
			var place_int = parseInt(this.state['matches'][i]['place'])
			var users = this.state['matches'][i]['people'].split(',')
			var participants = []
			for(let j in users){
				var status = this.state['matches'][i]['status'][users[parseInt(j)]]
				var name = this.state.users[users[parseInt(j)]]['name']
				var picture = this.state.users[users[parseInt(j)]]['picture_path']
				var email = this.state.users[users[parseInt(j)]]['email']
				var contact = ''
				if(status_counts['accepted'] === keys.length){
					contact = (
						<p class="m_person__email">{email}</p>
					)
				}
				participants.push(
					<a class="m_person" href={"http://localhost:3000/user/" + this.state.users[users[parseInt(j)]]['userid']}>
						<div class="m_person__image_wrapper">
							<img src={"http://localhost:8082/" + picture} alt="" />
						</div>
						<p class={"m_person__status " + status}>{status}</p>
						<p class="m_person__name">{name}</p>
						{contact}
					</a>
				)
			}

			// create buttons to approve or reject a match
			var pending_buttons = (<div></div>)
			if(status_counts['rejected'] === 0 && status_counts['accepted'] !== keys.length){
				var match_id = this.state['matches'][i]['match_id']
				var userid = this.state['userid']
				pending_buttons = (
					<div class="m_pending_buttons">
						<div class="m_accept_button" onClick={this.accept_or_reject.bind(this,match_id,userid,'accepted')}>Accept</div>
						<div class="m_reject_button" onClick={this.accept_or_reject.bind(this,match_id,userid,'rejected')}>Reject</div>
					</div>
				)
			}

			// create the match HTML
			match_item = (
				<div>
					<UserProp user_id={this.state['matches'][0]['place']} />
					<div class="m_match">
						<a class="m_match__title" href={"/match/" + this.state['matches'][i]['match_id']}>
								<span class="m_match__title_activity">{this.state['matches'][i]['activity']} at</span>
								<span class="m_match__title_place">{this.state['users'][place_int]['name']}</span>
						</a>
						{participants}
						{pending_buttons}
					</div>
				</div>
			)
		}
        return(
			<div>
				{match_item}
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
		var self = this;
		axios({
			method: 'patch',
			url: 'http://localhost:8081/matches',
			data: data
		}).then(function(rep){
			window.location.replace("/match/"+self.props.match.params['id']);
		})
	}
}

export default User;
