
	
	//google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var jsonData = $.ajax({
          url: "https://api.thingspeak.com/channels/72126/feeds.json?results=2888",
          dataType: "json", async: false }).responseText;
		  
		var  channelObj = JSON.parse(jsonData);
		

		var myFeedObj = [];

		function fu(c, f2){ var j = parseFloat(f2); var i = c.substring(11,16); var szawa = []; szawa[0] = i; szawa[1] = j; return szawa; }
		
		for ( var i = 0; i < channelObj.feeds.length; i++){
			
			var c  = channelObj.feeds[i].created_at;
			if( i >=1 ){ var f2 = channelObj.feeds[i].field2; if (f2 == null) { f2 = channelObj.feeds[ i -1 ].field2} }
			
			myFeedObj[i] = fu(c, f2);    
		
		}
		 
		var data = new google.visualization.DataTable();
		
		data.addColumn('string','created');
		data.addColumn('number','*C');
		data.addRows(myFeedObj);

        var options = {
		 
          title: 'Temperatura za oknem (24h)',
          curveType: 'function',
          legend: { position: 'bottom' },
		  series: { 0: {color: '#ff0000',}}
        };

        var chart = new google.visualization.LineChart(document.getElementById('g_okno'));

        chart.draw(data, options);
      }