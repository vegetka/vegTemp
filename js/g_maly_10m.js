

      //google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var jsonData = $.ajax({
          url: "https://api.thingspeak.com/channels/72126/feeds.json?results=20",
          dataType: "json", async:false }).responseText;
		
        console.log("maly 10m: ");
        console.log(jsonData);
        var channelObj = JSON.parse(jsonData);
        
	
		var myFeedObj = [];

		function fu(c, f1){ var j = parseFloat(f1); var i = c.substring(11,16); var szawa = []; szawa[0] = i; szawa[1] = j;	return szawa; }
		
		for ( var i = 0; i < channelObj.feeds.length; i++){
			
			var c  = channelObj.feeds[i].created_at;
			if( i >=1 ){ var f1 = channelObj.feeds[i].field1; if (f1 == null) { f1 = channelObj.feeds[ i - 1 ].field1} }
			
			myFeedObj[i] = fu(c, f1);    
		
		}
		 
		var data = new google.visualization.DataTable();
		
		data.addColumn('string','created');
		data.addColumn('number','*C');
		data.addRows(myFeedObj);

        var options = {
          title: 'Temperatura w pokoju (10m)',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('g_maly_10m'));

        chart.draw(data, options);
      }