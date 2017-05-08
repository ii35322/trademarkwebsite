var client = require('./connection.js'); 
keyword = process.argv[2];

client.search({
				index: 'trademark',
				type: 'class',
				body: {
								query: {
												match: {
																searchField : process.argv[2]
												}
								}
				}
}).then(function (resp) {
				var hits = resp.hits.hits;
				console.log('#hits = '+hits.length);
				for(var i=0;i<hits.length;i++){
						hit = hits[i];
						console.log('score='+hit._score+', id='+hit._id+', name='+hit._source.class_name);
				}
}, function (err) {
				console.trace('Error');
});


/*client.search({
				index: 'trademark',
				type: 'profile',
				body: {
								'query': {
												'match': {
																searchField : keyword
												}
								}
				}
}).then(function (resp) {
				var hits = resp.hits.hits;
				console.log('#hits = '+hits.length);
				for(var i=0;i<hits.length;i++){
						hit = hits[i];
						console.log('score='+hit._score+', id='+hit._id+', NAME='+hit._source.searchField);
				}
}, function (err) {
				console.trace('Error');
});
*/
