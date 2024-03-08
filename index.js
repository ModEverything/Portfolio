var http = require('http');
const fs = require('fs/promises');

function error404(res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(`<!DOCTYPE html>
							 <html style="overflow-y: hidden;">
							 <head>
							 <title>Portfolio - Error 404</title>
							 <meta content="Portfolio" property="og:title" />
							 <meta content="404: Article Not Found" property="og:description" />
							 <meta content="#513d52" data-react-helmet="true" name="theme-color" />
							 </head>
							 <body style="overflow-y: hidden; padding:0%; background-color:#513d52">
							 <div style="margin-top: 35%; margin-left: 22.5%; padding:1%; width: 58%; height: 300%; background-color:#f5f2e6">
							 <h1>Sorry, it looks like we can't find what you are looking for.</h1>
							 </div>
							 </body>
							 </html>

							 `)
}

function sendArticle(index, res){

	function createTags(atags){
		var tags = [];

		for(var i = 0; i < atags.length; i++){
			var tag = `<b style="margin-right:5px;display:in-line;width:max-content; padding-left:5px; padding-right:5px; text-align:center; font-family: Arial, Helvetica, sans-serif; background-color:#513d52; color:#FFFFFF; border-radius:5px;">${atags[i]}</b>`
			tags[i] = tag
		}


		return tags.join("")
	}
	
	
	fs.readFile("./DATA/pfp.json", "utf8")
		.then((pfpdata) => {
		fs.readFile("./DATA/content.json", "utf8")
			.then((data) => {
				// Read JSON
				var json = JSON.parse(data)
				var pfpjson = JSON.parse(pfpdata)
				var article = json.Articles[index];
				if(article == undefined){
					error404(res)
					return
				}else
					res.writeHead(200, {'Content-Type': 'text/html'});

				var tagtotal = createTags(article.Tags)

				//Find other 3 articles
				var uniqueids = Array(json.Articles.length).fill().map((_, id) => {if(id != index)return id});
				uniqueids.sort(() => Math.random() - 0.5);
				var otherarticles = [json.Articles[uniqueids[0]],json.Articles[uniqueids[1]],json.Articles[uniqueids[2]]];
				//^ This will generate entirely unique numbers because if you square root n*n, you will get a whole number. If it is not a whole number you multiplied 2 unique numbers.

				res.end(`<!DOCTYPE html>
				<html>
				<head>
				<title>My Resume - ${article.Title}</title>
				<meta content="${article.Title} by ${article.Author}" property="og:title" />
				<meta content="${article.Content.split(".")[0]+".."}" property="og:description" />
				<meta content="/" property="og:url" />
				<meta content="${article.ImageURL}" property="og:image" />
				<meta content="#513d52" data-react-helmet="true" name="theme-color" />
				</head>
				<body style="padding:0%; background-color:#513d52">
				<div style="margin-top: 0%; margin-left: 22.5%; padding: 5%; width: 50%; height: 50%; background-color:#f5f2e6">
				<h1>${article.Title}</h1>
				<img style="width:32px; border-radius:32px; display: inline-block; margin-right:3px;
			vertical-align: middle;" src="${pfpjson[article.Author]}"><p 
	 style="display: inline-block;
			vertical-align: middle;">${article.Author} - ${article.Date} ${article.EditDate}</p>
				<img src="${article.ImageURL}" style="width: 100%;">
				${tagtotal}
				${article.Content}
				<hr>
				<p>Thank you for reading about this project! Click on the buttons below to share this article with your friends, read more articles, or subscribe to our mailing list to stay in the know!</p>
				<button
				onclick="window.print()"	style="padding:2%; display:inline; border-color: #000000; border-style: solid; box-shadow:none; border-radius: 0px; background-color: #000000; color: #f5f2e6;"><b>Print This Article</b></button>
				<hr>
				<h2>Subscribe (Coming Soon)</h2>
				<p>Write your email below to get notifed of new articles!</p>
				<input type="text" id="emailbox"></input>
				<button
					onclick=""	style="padding:2%; display:inline; border-color: #000000; border-style: solid; box-shadow:none; border-radius: 0px; background-color: #000000; color: #f5f2e6;"><b>Subscribe</b></button>
				<hr>
				<h2>More Projects You Might Like</h2>
				<div>

				<a style="color:#000000; text-decoration:none;" href="${"/Article/"+uniqueids[0]}">
				<div style="font-family: Arial, Helvetica, sans-serif; background-color:#FFFFFF; width:30%; border-radius: 15px; text-align:center; display:inline-block; margin-left: 2%;">
					<h3>${otherarticles[0].Title}</h3>
					<img src=${otherarticles[0].ImageURL} style="width:100%;">
					${createTags(otherarticles[0].Tags)}
					<p>${otherarticles[0].Content.substr(0,75)+"..."}</p>
					</div>
					</a>

					<a style="color:#000000; text-decoration:none;" href="${"/Article/"+uniqueids[1]}">
						<div style="font-family: Arial, Helvetica, sans-serif; background-color:#FFFFFF; width:30%; border-radius: 15px; text-align:center; display:inline-block; margin-left: 2%;">
							<h3>${otherarticles[1].Title}</h3>
							<img src=${otherarticles[1].ImageURL} style="width:100%;">
							${createTags(otherarticles[1].Tags)}
							<p>${otherarticles[1].Content.substr(0,75)+"..."}</p>
							</div>
							</a>

							<a style="color:#000000; text-decoration:none;" href="${"/Article/"+uniqueids[2]}">
								<div style="font-family: Arial, Helvetica, sans-serif; background-color:#FFFFFF; width:30%; border-radius: 15px; text-align:center; display:inline-block; margin-left: 2%;">
									<h3>${otherarticles[2].Title}</h3>
									<img src=${otherarticles[2].ImageURL} style="width:100%;">
									${createTags(otherarticles[2].Tags)}
									<p>${otherarticles[2].Content.substr(0,75)+"..."}</p>
									</div>
									</a>

</div>
				
				</div>
				</body>
				</html>

				`);
			})
			.catch((error) => {
				// Do something if error 
				console.log(error)
			});
			})
			.catch((error) => {
				// Do something if error 
				console.log(error)
			});
}

function sendHomePage(res){

	function createTags(atags){
		var tags = [];

		for(var i = 0; i < atags.length; i++){
			var tag = `<b style="margin-right:5px;display:in-line;width:max-content; padding-left:5px; padding-right:5px; text-align:center; font-family: Arial, Helvetica, sans-serif; background-color:#513d52; color:#FFFFFF; border-radius:5px;">${atags[i]}</b>`
			tags[i] = tag
		}


		return tags.join("")
	}

	res.writeHead(200, {'Content-Type': 'text/html'});
	fs.readFile("./DATA/pfp.json", "utf8")
		.then((pfpdata) => {
		fs.readFile("./DATA/content.json", "utf8")
			.then((data) => {
				// Read JSON
				var json = JSON.parse(data)
				//^ This will generate entirely unique numbers because if you square root n*n, you will get a whole number. If it is not a whole number you multiplied 2 unique numbers.

				res.end(`<!DOCTYPE html>
				<html style="overflow-y: hidden;">
				<head>
				<title>WokeWire</title>
				<meta content="WokeWire" property="og:title" />
				<meta content="The best site for educating yourself!" property="og:description" />
				<meta content="/" property="og:url" />
				<meta content="#513d52" data-react-helmet="true" name="theme-color" />
				</head>
				<body style="overflow-y: hidden; padding:0%; background-color:#513d52">
				<div style="margin-top: 0%; margin-left: 22.5%; padding: 5%; width: 50%; height: 50%; background-color:#f5f2e6">
				
				<h2>Home Page Coming Soon!</h2>
				<div>

				

</div>

				</div>
				</body>
				</html>

				`);
			})
			.catch((error) => {
				// Do something if error 
				console.log(error)
			});
			})
			.catch((error) => {
				// Do something if error 
				console.log(error)
			});
}

http.createServer(function (req, res) {
	
	var splitdomain = req.url.split("/")
	if(splitdomain[1] == "Article" && parseInt(splitdomain[2]) != NaN)
		sendArticle(splitdomain[2], res)
	else if(req.url == "/")
		sendHomePage(res)
	else
		error404(res)
	
	
	
	
	
	
}).listen(8080);
