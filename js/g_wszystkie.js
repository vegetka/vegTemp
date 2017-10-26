// wszystkie czujniki razem [prawie]

	
	google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var jsonData = $.ajax({
          url: "https://api.thingspeak.com/channels/72126/feeds.json?results=20",
          dataType: "json",
          async: false
		  }).responseText;
		  
		  function v(aha){ console.log(aha); }
		  
		  v("hello");
		  v(jsonData);
		  
		  
		  
		<!-- Nikodem the Nick -->
		var  channelObj = JSON.parse(jsonData);
		
		v("channelObj po zrobieniu: ");		
		v(channelObj);
		
		function feed(created, f1, f2){
			var createdAt = created;
			var field1 = f1;
			var field2 = f2;
   
		this.getCreatedAt = function(){ return createdAt; };
		this.getField1        = function(){ return field1; };
	    this.getfield2         = function(){ return field2; };
		
		var wtf = "[" + created + ", " + f1 + ", " + f2 + "]";
			
		console.log(wtf);
			
		return wtf;

		}
		
		var myFeedObj = [];

		v("feed po zrobieniu:");
		v(myFeedObj);
		
		
		function fu(c, f1, f2){
		
			v( "c: " + c + " | f1: " + f1 + " | f2: " + f2) ;
			var i = parseFloat(f1);
			var j = parseFloat(f2);
		
		
	
			var szawa = [];
			szawa[0] = c;
			szawa[1] = i;
			szawa[2] = j;
					
			return szawa;
		}
		
		for ( var i = 0; i < channelObj.feeds.length; i++){
			v(i);
			
			var c  = channelObj.feeds[i].created_at;
			if( i >=1 ){
			var f1 = channelObj.feeds[i].field1; if (f1 == null) { f1 = channelObj.feeds[ i -1 ].field1}
			var f2 = channelObj.feeds[i].field2; if (f2 == null) { f2 = channelObj.feeds[ i -1 ].field2}
			}
			
			myFeedObj[i] = fu(c, f1, f2);    
			v(myFeedObj[i]);
		}
		 
		var data = new google.visualization.DataTable();
		
		v(" full object: " ) ;
		v(myFeedObj);
		
		data.addColumn('string','created');
		data.addColumn('number','field1');
		data.addColumn('number','field2');
		data.addRows(myFeedObj);

        var options = {
          title: 'Temperatura',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('g_maly'));

        chart.draw(data, options);
      }