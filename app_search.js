var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname+'/public')));

//Build item classes from files
var class_list = [];
for (i = 1; i < 10; i++) {
   class_list.push(require("./item_class_v2/class0"+i+".v2.json"))
}
for (i = 10; i <= 45; i++) {
   class_list.push(require("./item_class_v2/class"+i+".v2.json"))
}

//construct item index map
numItem = 0;
item2ind = {};
class_list.forEach(function(c){ 
		c.subclasses.forEach(function(sc){
				sc.items.forEach(function(item){
						item2ind[item] = numItem;
						numItem += 1;
				});
		});
});


attr_list = require("./list_attr.json");
EN_NAME_KEY = attr_list['en_name'];
EN_OWN_NAME_KEY = attr_list['en_own_name'];
CH_NAME_KEY = attr_list['ch_name'];
CH_OWN_NAME_KEY = attr_list['ch_own_name'];
ITEMS1_KEY = attr_list['items1'];


var client = require('./connection.js');

app.get('/recommendcopy*',function(req,res){
	
	/*			[
					{en_name:"NIKE", ch_name:"CH1", items:["1","2","3"]},
					{en_name:"NIKE2", ch_name:"CH2", items:["1","2","3"]}
					];*/
	
	
	//Construct selected_class
	class_query = req.query.class_query;
	subclass_is_active = {};
	item_is_active = {};
	
	selected_classes = [];
	if( class_query ){
			class_list.forEach(function(c){ 
					var c_chosen = false;
					c.subclasses.forEach(function(sc){
								var sc_chosen = false;
								sc.items.forEach(function(item){
										if( item.indexOf(class_query) > -1 ){
												item_is_active[item] = true;
												sc_chosen = true;
										}
								});
								if( sc_chosen ){
										subclass_is_active[sc.name] = true;
										c_chosen = true;
								}
					});
					if( c_chosen ){
							selected_classes.push(c);
					}
			});
	}

	//retrieve profile list
	profile_list = [];
	profile_query = req.query.profile_query;
	if( !profile_query ){
			res.render('recommendcopy', {'profile_list':profile_list, 
																		'class_list':selected_classes,
																		'subclass_is_active':subclass_is_active,
																		'item_is_active': item_is_active,
																		'item2ind': item2ind,
		 																'numItem': numItem 	} );
			return;
	}
	
	client.search({
					index: 'trademark',
					type: 'profile',
					body: {
									'query': {
													'match': {
																	searchField : profile_query
													}
									}
					}
	}).then(function (resp) {
					var hits = resp.hits.hits;
					console.log('#hits = '+hits.length);
					for(var i=0;i<hits.length;i++){
									hit = hits[i];
									//console.log('score='+hit._score+', id='+hit._id+', NAME='+hit._source.searchField);
									src = hit._source;
									if( src[CH_NAME_KEY]!="" || src[EN_NAME_KEY]!="" ){
											profile_list.push({ch_name: src[CH_NAME_KEY],
																		en_name: src[EN_NAME_KEY],
																		items: src[ITEMS1_KEY]})
									}
									itemlist = src[ITEMS1_KEY];
									for(var j=0;j<itemlist.length;j++){
											var item = itemlist[j];
											if( !(item in item2ind) ){
													item2ind[item] = numItem;
													numItem += 1;
											}
									}
					}
					
					res.render('recommendcopy', {'profile_list':profile_list, 
																				'class_list':selected_classes,
																				'subclass_is_active':subclass_is_active,
																				'item_is_active': item_is_active,
																				'item2ind': item2ind,
		 																		'numItem': numItem 	} );

	}, function (err) {
					console.trace('Error');
	});
	
	

});

app.get('/information*',function(req,res){
		  itemlist_str = req.query.itemlist;
			itemlist = itemlist_str.split(',');
			res.render('information',{"itemlist":itemlist});
});


app.get('/search*',function(req,res){  
  var search_query = req.query.search_query;
  res.json({"total_count": 1611,
			  "incomplete_results": false,
			  "items": [
					    {
					      "id": 7079149,
					      "name": "live555",
					      "full_name": "xanview/live555",
					      "owner": {
					        "login": "xanview",
					        "id": 578881,
					        "avatar_url": "https://avatars2.githubusercontent.com/u/578881?v=3",
					        "gravatar_id": "",
					        "url": "https://api.github.com/users/xanview",
					        "html_url": "https://github.com/xanview",
					        "followers_url": "https://api.github.com/users/xanview/followers",
					        "following_url": "https://api.github.com/users/xanview/following{/other_user}",
					        "gists_url": "https://api.github.com/users/xanview/gists{/gist_id}",
					        "starred_url": "https://api.github.com/users/xanview/starred{/owner}{/repo}",
					        "subscriptions_url": "https://api.github.com/users/xanview/subscriptions",
					        "organizations_url": "https://api.github.com/users/xanview/orgs",
					        "repos_url": "https://api.github.com/users/xanview/repos",
					        "events_url": "https://api.github.com/users/xanview/events{/privacy}",
					        "received_events_url": "https://api.github.com/users/xanview/received_events",
					        "type": "User",
					        "site_admin": false
					      },
					      "private": false,
					      "html_url": "https://github.com/xanview/live555",
					      "description": "A mirror of the live555 source code.",
					      "fork": false,
					      "url": "https://api.github.com/repos/xanview/live555",
					      "forks_url": "https://api.github.com/repos/xanview/live555/forks",
					      "keys_url": "https://api.github.com/repos/xanview/live555/keys{/key_id}",
					      "collaborators_url": "https://api.github.com/repos/xanview/live555/collaborators{/collaborator}",
					      "teams_url": "https://api.github.com/repos/xanview/live555/teams",
					      "hooks_url": "https://api.github.com/repos/xanview/live555/hooks",
					      "issue_events_url": "https://api.github.com/repos/xanview/live555/issues/events{/number}",
					      "events_url": "https://api.github.com/repos/xanview/live555/events",
					      "assignees_url": "https://api.github.com/repos/xanview/live555/assignees{/user}",
					      "branches_url": "https://api.github.com/repos/xanview/live555/branches{/branch}",
					      "tags_url": "https://api.github.com/repos/xanview/live555/tags",
					      "blobs_url": "https://api.github.com/repos/xanview/live555/git/blobs{/sha}",
					      "git_tags_url": "https://api.github.com/repos/xanview/live555/git/tags{/sha}",
					      "git_refs_url": "https://api.github.com/repos/xanview/live555/git/refs{/sha}",
					      "trees_url": "https://api.github.com/repos/xanview/live555/git/trees{/sha}",
					      "statuses_url": "https://api.github.com/repos/xanview/live555/statuses/{sha}",
					      "languages_url": "https://api.github.com/repos/xanview/live555/languages",
					      "stargazers_url": "https://api.github.com/repos/xanview/live555/stargazers",
					      "contributors_url": "https://api.github.com/repos/xanview/live555/contributors",
					      "subscribers_url": "https://api.github.com/repos/xanview/live555/subscribers",
					      "subscription_url": "https://api.github.com/repos/xanview/live555/subscription",
					      "commits_url": "https://api.github.com/repos/xanview/live555/commits{/sha}",
					      "git_commits_url": "https://api.github.com/repos/xanview/live555/git/commits{/sha}",
					      "comments_url": "https://api.github.com/repos/xanview/live555/comments{/number}",
					      "issue_comment_url": "https://api.github.com/repos/xanview/live555/issues/comments{/number}",
					      "contents_url": "https://api.github.com/repos/xanview/live555/contents/{+path}",
					      "compare_url": "https://api.github.com/repos/xanview/live555/compare/{base}...{head}",
					      "merges_url": "https://api.github.com/repos/xanview/live555/merges",
					      "archive_url": "https://api.github.com/repos/xanview/live555/{archive_format}{/ref}",
					      "downloads_url": "https://api.github.com/repos/xanview/live555/downloads",
					      "issues_url": "https://api.github.com/repos/xanview/live555/issues{/number}",
					      "pulls_url": "https://api.github.com/repos/xanview/live555/pulls{/number}",
					      "milestones_url": "https://api.github.com/repos/xanview/live555/milestones{/number}",
					      "notifications_url": "https://api.github.com/repos/xanview/live555/notifications{?since,all,participating}",
					      "labels_url": "https://api.github.com/repos/xanview/live555/labels{/name}",
					      "releases_url": "https://api.github.com/repos/xanview/live555/releases{/id}",
					      "deployments_url": "https://api.github.com/repos/xanview/live555/deployments",
					      "created_at": "2012-12-09T13:44:44Z",
					      "updated_at": "2017-04-21T06:24:05Z",
					      "pushed_at": "2017-01-31T14:27:42Z",
					      "git_url": "git://github.com/xanview/live555.git",
					      "ssh_url": "git@github.com:xanview/live555.git",
					      "clone_url": "https://github.com/xanview/live555.git",
					      "svn_url": "https://github.com/xanview/live555",
					      "homepage": "",
					      "size": 2371,
					      "stargazers_count": 145,
					      "watchers_count": 145,
					      "language": "C++",
					      "has_issues": true,
					      "has_projects": true,
					      "has_downloads": true,
					      "has_wiki": true,
					      "has_pages": false,
					      "forks_count": 99,
					      "mirror_url": null,
					      "open_issues_count": 1,
					      "forks": 99,
					      "open_issues": 1,
					      "watchers": 145,
					      "default_branch": "master",
					      "score": 38.676823
					    }]});
  });
//app.get('/', function(req, res) {
//    res.sendFile(path.join(__dirname + '/index.html'));
//});
app.listen(3000);
console.log('Server is running on port 3000...');
