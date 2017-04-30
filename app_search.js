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

var obj = [];
for (i = 1; i < 10; i++) {
   obj.push(require("./item_class_v2/class0"+i+".v2.json"))
}

for (i = 10; i <= 45; i++) {
   obj.push(require("./item_class_v2/class"+i+".v2.json"))
}
console.log(obj);
/*var obj =[];
for (i=1;i<10;i++){
	 obj[i]=require("./item_class_v2/class0"+i+".v2.json");
}
console.log(obj);*/

//app.get('/', function(req, res) {
//    res.sendFile(path.join(__dirname + '/recommendcopy.html'));
//});
var numbers=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];


app.get('/recommendcopy',function(req,res){
	res.render('recommendcopy');
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
