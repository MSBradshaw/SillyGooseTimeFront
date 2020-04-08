
export function set_cookies(email,auth,id){
	var date = new Date();
	date.setDate(date.getDate() + 1);

	var cookie_string_email = "sillygoose_email=EMAIL; expires=DATE";
	cookie_string_email = cookie_string_email.replace('EMAIL',email);
	cookie_string_email = cookie_string_email.replace('DATE',date);

	var cookie_string_auth = "sillygoose_auth=AUTH; expires=DATE";
	cookie_string_auth = cookie_string_auth.replace('AUTH',auth);
	cookie_string_auth = cookie_string_auth.replace('DATE',date);

	var cookie_string_id = "sillygoose_id=ID; expires=DATE";
	cookie_string_id = cookie_string_id.replace('ID',id);
	cookie_string_id = cookie_string_id.replace('DATE',date);

	document.cookie = cookie_string_auth;
	document.cookie = cookie_string_email;
	document.cookie = cookie_string_id;
}

export function delete_cookies(){
	document.cookie = "sillygoose_email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	document.cookie = "sillygoose_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	document.cookie = "sillygoose_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export function get_auth_cookies(){
	var cookies = document.cookie
	if(cookies === ''){
		return -1;
	}
	var email = cookies.match(/sillygoose_email=[^\s]*;/g)[0].replace('sillygoose_email=','').replace(';','');
	var auth = cookies.match(/sillygoose_auth=[^\s]*/g)[0].replace('sillygoose_auth=','').replace(';','');
	var id = cookies.match(/sillygoose_id=[^\s]*/g)[0].replace('sillygoose_id=','').replace(';','');
	return([email,auth,id]);
}
