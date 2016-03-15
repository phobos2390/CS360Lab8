$(document).ready(() =>
{ 
	var getComments = () =>
	{
		$.getJSON('comment', (data) => 
		{ 
			console.log(data); 
			var everything = "<ul>"; 
			for(var comment in data) 
			{ 
				com = data[comment]; 
				everything += "<li>Name: " + com.Name + 
								" -- Comment: " + com.Comment + 
								" -- " + com.Timestamp +
								"</li>"; 
			} 
			everything += "</ul>"; 
			$("#comments").html(everything); 
		});
	};

	getComments();
	
	$("#serialize").click(() =>
	{ 
		var myobj = 
		{
			Name:$("#Name").val(),
			Comment:$("#Comment").val()
		}; 
		jobj = JSON.stringify(myobj); 
		$("#json").text(jobj);
		$.ajax(
		{
			type:"POST",
			url:"http://ec2-52-27-30-181.us-west-2.compute.amazonaws.com:3003/comment",
			data:jobj,
			contentType: "application/json; charset=utf-8" 
		});	
	});
	
	$("#getThem").click(() => 
	{
		getComments();
	});
});