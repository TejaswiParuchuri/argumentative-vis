var sports_donations_data;

var democrats_dictionary={"2016":{},"2018":{},"2020":{}}
var republicans_dictionary={"2016":{},"2018":{},"2020":{}}
var keys=[]
total_amount={"2016":0,"2018":0,"2020":0};
total_count={"2016":0,"2018":0,"2020":0};
dem_don={"2016":{},"2018":{},"2020":{}}
rep_don={"2016":{},"2018":{},"2020":{}}
total_don={"2016":[],"2018":[],"2020":[]};
groupDataDem=[]
groupDataRep=[]
x0_domain_demo=[]
x1_domain_demo=[]
z_domain_demo=[]

x0_domain_rep=[]
x1_domain_rep=[]
z_domain_rep=[]

var colors={"NBA":"#f6ccb7","NFL":"#a05d56","NASCAR":"#c7f6b7","WNBA":"#6b486b","MLB":"#8a89a6","NHL":"#d0743c"}

	

function create_dict_teamWise()
{
	for(i=0;i<sports_donations_data.length;i++)
	{
		teams=[]
		money=+sports_donations_data[i]['Amount'].replaceAll("$","").replaceAll(",","");
		year=sports_donations_data[i]['Election Year']
		total_amount[year]+=money
		total_count[year]+=1
		if(!total_don[year].includes(sports_donations_data[i]['Owner']))
		{
			total_don[year].push(sports_donations_data[i]['Owner'])
		}
		if(sports_donations_data[i]['League'].includes(","))
		{
			teams=sports_donations_data[i]['League'].split(", ")
			money=money/teams.length;
		}
		else{
			teams=[sports_donations_data[i]['League']]
		}
		if(sports_donations_data[i]['Party']=='Democrat')
		{
			
			
			for(var tm=0;tm<teams.length;tm++)
			{
				if(!keys.includes(teams[tm]))
				{
					keys.push(teams[tm])
				}
				if(dem_don[year][teams[tm]]===undefined)
				{
					dem_don[year][teams[tm]]=[sports_donations_data[i]['Owner']]
				}
				if(!dem_don[year][teams[tm]].includes(sports_donations_data[i]['Owner']))
				{
					dem_don[year][teams[tm]].push(sports_donations_data[i]['Owner'])
				}
				if(democrats_dictionary[year][teams[tm]]===undefined)
				{
					democrats_dictionary[year][teams[tm]]=money;
					democrats_dictionary[year][teams[tm]+" count"]=1/teams.length;;
					x0_domain_demo.push(year);
					x0_domain_demo.push(year);
					x0_domain_demo.push(year);
					x1_domain_demo.push('Donations')
					x1_domain_demo.push('Count')
					x1_domain_demo.push('Sponsors')
				}
				else{
					
					democrats_dictionary[year][teams[tm]]+=money;
					democrats_dictionary[year][teams[tm]+" count"]+=1/teams.length;;
					x0_domain_demo.push(year);
					x0_domain_demo.push(year);
					x0_domain_demo.push(year);
					x1_domain_demo.push('Donations')
					x1_domain_demo.push('Count')
					x1_domain_demo.push('Sponsors')
				}
			}
			
		}
		
		if(sports_donations_data[i]['Party']=='Republican')
		{

			for(var tm=0;tm<teams.length;tm++)
			{
				if(!keys.includes(teams[tm]))
				{
					keys.push(teams[tm])
				}
				if(rep_don[year][teams[tm]]===undefined)
				{
					rep_don[year][teams[tm]]=[sports_donations_data[i]['Owner']]
				}
				if(!rep_don[year][teams[tm]].includes(sports_donations_data[i]['Owner']))
				{
					rep_don[year][teams[tm]].push(sports_donations_data[i]['Owner'])
				}
				if(republicans_dictionary[year][teams[tm]]===undefined)
				{
					republicans_dictionary[year][teams[tm]]=money;
					republicans_dictionary[year][teams[tm]+" count"]=1/teams.length;
					x0_domain_rep.push(year);
					x0_domain_rep.push(year);
					x0_domain_rep.push(year);
					x1_domain_rep.push('Donations')
					x1_domain_rep.push('Count')
					x1_domain_rep.push('Sponsors')
				}
				else{
					
					republicans_dictionary[year][teams[tm]]+=money;
					republicans_dictionary[year][teams[tm]+" count"]+=1/teams.length;
					x0_domain_rep.push(year);
					x0_domain_rep.push(year);
					x0_domain_rep.push(year);
					x1_domain_rep.push('Donations')
					x1_domain_rep.push('Count')
					x1_domain_rep.push('Sponsors')
				}
			}
		}
	}
	
}

function process_series_Data()
{
	
	for(let year in democrats_dictionary)
	{
		temp_dict_don={}
		temp_dict_count={}
		temp_dict_spon={}
		for(var ind in keys)
		{
			key=keys[ind]
			if(democrats_dictionary[year][key]!==undefined)
			{
				temp_dict_don[key]=(democrats_dictionary[year][key]/total_amount[year])*100
				temp_dict_count[key]=(democrats_dictionary[year][key+" count"]/total_count[year])*100
				temp_dict_spon[key]=(dem_don[year][key].length/total_don[year].length)*100
			}
			else{
				temp_dict_don[key]=0
				temp_dict_count[key]=0
				temp_dict_spon[key]=0
			}
		}
		temp_dict_don['diff']='Donations'
		temp_dict_count['diff']='Count'
		temp_dict_spon['diff']='Sponsors'
		temp_dict_count['year']=+year
		temp_dict_don['year']=+year
		temp_dict_spon['year']=+year
		groupDataDem.push(temp_dict_don)
		groupDataDem.push(temp_dict_count)
		groupDataDem.push(temp_dict_spon)
	}
	for(let year in republicans_dictionary)
	{
		temp_dict_don={}
		temp_dict_count={}
		temp_dict_spon={}
		for(var ind in keys)
		{
			key=keys[ind]
			if(republicans_dictionary[year][key]!==undefined)
			{
				temp_dict_don[key]=(republicans_dictionary[year][key]/total_amount[year])*100
				temp_dict_count[key]=(republicans_dictionary[year][key+" count"]/total_count[year])*100
				temp_dict_spon[key]=(rep_don[year][key].length/total_don[year].length)*100
			}
			else{
				temp_dict_don[key]=0
				temp_dict_count[key]=0
				temp_dict_spon[key]=0
			}
		}
		temp_dict_don['diff']='Donations'
		temp_dict_count['diff']='Count'
		temp_dict_spon['diff']='Sponsors'
		temp_dict_count['year']=+year
		temp_dict_don['year']=+year
		temp_dict_spon['year']=+year
		groupDataRep.push(temp_dict_don)
		groupDataRep.push(temp_dict_count)
		groupDataRep.push(temp_dict_spon)
	}
	
}

// This runs when the page is loaded
document.addEventListener('DOMContentLoaded', function() {

		
  
  // Load all the files before doing anything else
  
  Promise.all([d3.csv('data/sports-political-donations.csv')])
          .then(function(values){
	
    
    sports_donations_data = values[0];
	
	sports_donations_data=sports_donations_data.slice().sort((a, b) => d3.ascending(a['Election Year'], b['Election Year']))
	
	create_dict_teamWise();
	console.log(democrats_dictionary);
	console.log(republicans_dictionary);
	process_series_Data();
	console.log(total_amount,total_count)
	console.log(groupDataDem)
	console.log(groupDataRep)
	//console.log(dem_don)
	graph_democrats();
	graph_republicans();
	legend();	
});
});

function graph_democrats()
{
	var stack = d3.stack()
    //.offset(d3.stackOffsetExpand);
	
	var stackData = stack
  	.keys(keys)(groupDataDem).map(d => (d.forEach(v => v.key = d.key), d))
	
	console.log(stackData);
	
	var svg = d3.select(".graph1");
    margin = {top: 90, right: 50, bottom: 60, left: 40};
    width = +svg.attr("width") - margin.left - margin.right;
    height = +svg.attr("height") - margin.top - margin.bottom;
	svg.append("text").attr("transform", "translate(" + ((width/2)+45) + "," + (margin.top-40) + ")").style("text-anchor", "middle")
	 .style("font-size", "30px") 
	 .style("font-family","sans-serif").attr("fill", "red").text("Democrats");
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x0 = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.1);

var x1 = d3.scaleBand()
    .padding(0.05);

var y = d3.scaleLinear().domain([0,100]).nice()
    .rangeRound([height, 0]);

var height_scale = d3.scaleLinear()
			.rangeRound([height,0])
  
	
	
	
	
	x0.domain(x0_domain_demo);
  x1.domain(x1_domain_demo)
    .rangeRound([0, x0.bandwidth()])
  	.padding(0.1);
	
  
  var serie = g.selectAll(".serie")
    .data(stackData)
    .enter().append("g")
      .attr("class", function(d,i){return "serie"+i;})
      .attr("fill", function(d) { return colors[d.key]; });
  
  serie.selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
  		.attr("class", function(d,i) {return "serie-rect"+i;})
  		.attr("transform", function(d) { return "translate(" + x0(d.data.year) + ",0)"; })
      .attr("x", function(d) { return x1(d.data.diff); })
      .attr("y", function(d) { return y(d[1]); })
      .attr("height", function(d) { return y(d[0]) - y(d[1]); })
	  .style("stroke","white")
	  .style("stroke-width","1px")
      .attr("width", x1.bandwidth())
  		.on("click", function(d, i){ compare(d); })
		.on("mouseover", function(d, i){ compare(d); 
		d3.select(this).transition()
               .duration('50')
               .attr('opacity', '.85')
			   .style("stroke","red")
			   .style("stroke-width","2px");
			   
		d3.selectAll(".graph2").selectAll(".serie"+keys.indexOf(d.key)).selectAll("."+d3.select(this).attr('class')).transition()
               .duration('50')
               .attr('opacity', '.85')
			   .style("stroke","red")
			   .style("stroke-width","2px");
			   
		})
		.on("mouseout",function(d,i){
			d3.select(".compare").selectAll(".comp").remove();
			   d3.select(this).transition()
               .duration('50')
               .attr('opacity', '1')
			   .style("stroke","white")
			   .style("stroke-width","1px");
			   
			d3.selectAll(".graph2").selectAll(".serie"+keys.indexOf(d.key)).selectAll("."+d3.select(this).attr('class')).transition()
               .duration('50')
               .attr('opacity', '.85')
			   .style("stroke","white")
			   .style("stroke-width","1px");
		});
		
	g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0));
	  
	g.append("g")
		.attr("class","axis")
		.attr("transform", "translate("+width+", 0)")
		.call(d3.axisRight(y))
	  
	  //console.log(stackData[5])
	  for(var t=0;t<stackData[5].length;t++)
	  {
		  last=stackData[5][t]
		  //console.log(last,x0(last.data.year),x1(last.data.diff),x1.bandwidth());
		  var result=0;
		  var percentage=0
		  if(last.data.diff.includes("Sponsors"))
		  {
			for(var count in dem_don[last.data.year])
			{
				result+=dem_don[last.data.year][count].length
				percentage+=(dem_don[last.data.year][count].length/total_don[last.data.year].length)*100
				//console.log(percentage)
			}
			result=result+" Sponsors("+Math.round(percentage)+"%)";
		  }
		  else if(last.data.diff.includes("Count"))
		  {
			for(var co in democrats_dictionary[last.data.year])
			{
				if(co.includes("count"))
				{
				result+=democrats_dictionary[last.data.year][co]
				percentage+=(democrats_dictionary[last.data.year][co]/total_count[last.data.year])*100
				}
			}
			result=Math.round(result)+" Donations("+Math.round(percentage)+"%)";
		  }
		  else
		  {
			 for(var co in democrats_dictionary[last.data.year])
			{
				if(!co.includes("count"))
				{
				result+=democrats_dictionary[last.data.year][co]
				percentage+=(democrats_dictionary[last.data.year][co]/total_amount[last.data.year])*100
				}
			}
			result="$"+Math.round(result)+"("+Math.round(percentage)+"%)";
		  }
		  //console.log(result)
		  var legend = g.append("g")
		  .data(last)
		  .attr("class", "legend")
		  .attr("transform", "translate(" + (x0(last.data.year)+x1(last.data.diff)+x1.bandwidth()/2) + ","+y(last[1]+2)+")" )
		  .append("text")
		  .attr("fill", "#000")
		  .style("font", "12px sans-serif")
		  .attr("transform", "rotate(-90)")
		 .text(result);
	  }
	    g.append("g").append("text")
		.attr("transform", "translate("+ width/2+","+(+height+32) +")")
		  .attr("fill", "red")
		  .style("font", "18px sans-serif")
		.text("Years");
		
		 g.append("g").append("text")
		.attr("transform", "translate("+ (margin.left-30)+","+(+height+50) +")")
		  .attr("fill", "#000")
		  .style("font", "18px sans-serif")
		.text("Total Funds Democrats received from sports teams over years");
		
		g.append("g").append("text")
		  .attr("fill", "red")
		  .attr("transform", "rotate(-90)")
		  .attr("y", width+35)
		  .attr("x", (-height/2)-10)
		  .style("font", "18px sans-serif")
		.text("Percentage");
}

function graph_republicans()
{
	var stack = d3.stack()
    //.offset(d3.stackOffsetExpand);
	
	var stackData = stack
  	.keys(keys)(groupDataRep).map(d => (d.forEach(v => v.key = d.key), d))
	
	console.log(stackData);
	
	var svg = d3.select(".graph2"),
    margin = {top: 90, right: 50, bottom: 60, left: 60},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;
	svg.append("text").attr("transform", "translate(" + ((width/2)+45) + "," + (margin.top-40) + ")").style("text-anchor", "middle")
	.style("font-size", "30px") 
	 .style("font-family","sans-serif").attr("fill", "red").text("Republicans");
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var x0 = d3.scaleBand()
		.rangeRound([0, width])
		.paddingInner(0.1);

	var x1 = d3.scaleBand()
		.padding(0.05);

	var y = d3.scaleLinear().domain([0,100])
		.rangeRound([height, 0]);

	var height_scale = d3.scaleLinear()
				.rangeRound([height,0])
	
	x0.domain(x0_domain_demo);
	x1.domain(x1_domain_demo)
    .rangeRound([0, x0.bandwidth()])
  	.padding(0.1);
	
  
  var serie = g.selectAll(".serie")
    .data(stackData)
    .enter().append("g")
      .attr("class", function(d,i){return "serie"+i;})
      .attr("fill", function(d) { return colors[d.key]; });
  
  serie.selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
  		.attr("class", function(d,i) {return "serie-rect"+i;})
  		.attr("transform", function(d) { return "translate(" + x0(d.data.year) + ",0)"; })
      .attr("x", function(d) { return x1(d.data.diff); })
      .attr("y", function(d) { return y(d[1]); })
      .attr("height", function(d) { return y(d[0]) - y(d[1]); })
      .attr("width", x1.bandwidth())
	  .style("stroke","white")
	  .style("stroke-width","1px")
  		.on("click", function(d, i){ compare(d); })
		.on("mouseover", function(d, i){ compare(d); 
		d3.select(this).transition()
               .duration('50')
               .attr('opacity', '.85')
			   .style("stroke","red")
			   .style("stroke-width","2px");
			   
		d3.selectAll(".graph1").selectAll(".serie"+keys.indexOf(d.key)).selectAll("."+d3.select(this).attr('class')).transition()
               .duration('50')
               .attr('opacity', '.85')
			   .style("stroke","red")
			   .style("stroke-width","2px");
			   
			   //console.log(d3.select(this).attr('class'),keys.indexOf(d.key));
			   })
		.on("mouseout",function(d,i){
			d3.select(".compare").selectAll(".comp").remove();
			d3.select(this).transition()
               .duration('50')
               .attr('opacity', '1')
			   .style("stroke","white")
			   .style("stroke-width","1px");
			   
			d3.selectAll(".graph1").selectAll(".serie"+keys.indexOf(d.key)).selectAll("."+d3.select(this).attr('class')).transition()
               .duration('50')
               .attr('opacity', '.85')
			   .style("stroke","white")
			   .style("stroke-width","1px");
			   
			  
		});
		
	g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0));
	  
	g.append("g")
		.attr("class","axis")
		.call(d3.axisLeft(y))	
		
	for(var t=0;t<stackData[5].length;t++)
	  {
		  last=stackData[5][t]
		  //console.log(last,x0(last.data.year),x1(last.data.diff),x1.bandwidth());
		  var result=0;
		  var percentage=0;
		  //console.log(republicans_dictionary[last.data.year],last.data.diff,last.data.year,total_amount[year])
		  if(last.data.diff.includes("Sponsors"))
		  {
			for(var count in rep_don[last.data.year])
			{
				result+=rep_don[last.data.year][count].length
				percentage+=(rep_don[last.data.year][count].length/total_don[last.data.year].length)*100
			}
			result=result+" Sponsors("+Math.round(percentage)+"%)";
		  }
		  else if(last.data.diff.includes("Count"))
		  {
			for(var co in republicans_dictionary[last.data.year])
			{
				if(co.includes("count"))
				{
				result+=republicans_dictionary[last.data.year][co]
				percentage+=(republicans_dictionary[last.data.year][co]/total_count[last.data.year])*100
				}
			}
			result=Math.round(result)+" Donations("+Math.round(percentage)+"%)";
		  }
		  else
		  {
			 //console.log(republicans_dictionary[last.data.year],last.data.diff,last.data.year,total_amount[year])
			 for(var ind in keys)
			{
				key=keys[ind]
				//console.log(republicans_dictionary[last.data.year][key])
				result+=republicans_dictionary[last.data.year][key]
				//percentage+=republicans_dictionary[last.data.year][key]
				//console.log(republicans_dictionary[last.data.year][co],total_amount[year],(republicans_dictionary[last.data.year][co]/total_amount[year])*100)
				
			}
			result="$"+Math.round(result)+"("+Math.round((result/total_amount[last.data.year])*100)+"%)";
		  }
		  //console.log(result)
		  var legend = g.append("g")
		  .data(last)
		  .attr("class", "legend")
		  .attr("transform", "translate(" + (x0(last.data.year)+x1(last.data.diff)+x1.bandwidth()/2) + ","+y(last[1]+2)+")" )
		  .append("text")
		  .attr("fill", "#000")
		  .style("font", "12px sans-serif")
		  .attr("transform", "rotate(-90)")
		 .text(result);
	  }
	  
	  g.append("g").append("text")
		.attr("transform", "translate("+ width/2+","+(+height+32) +")")
		  .attr("fill", "red")
		  .style("font", "18px sans-serif")
		.text("Years");
		
		 g.append("g").append("text")
		.attr("transform", "translate("+ (margin.left-60)+","+(+height+50) +")")
		  .attr("fill", "#000")
		  .style("font", "18px sans-serif")
		.text("Total Funds Republicans received from sports teams over years");
		
		g.append("g").append("text")
		  .attr("fill", "red")
		  .attr("transform", "rotate(-90)")
		  .attr("y", -margin.left+25)
		  .attr("x", (-height/2)-10)
		  .style("font", "18px sans-serif")
		.text("Percentage");
}

function legend()
{
	//console.log(data);
	var svg = d3.select(".compare");
	//svg.selectAll("g").remove();
    margin = {top: 225, right: 50, bottom: 20, left: 30};
    width = +svg.attr("width") - margin.left - margin.right;
    height = +svg.attr("height") - margin.top - margin.bottom;
	
	//console.log("I am here")
	var legend = svg.selectAll(".legend")
     .data(keys)
	 .enter().append("g")
     .attr("class", "legend")
     .attr("transform", function(d, i) { return "translate(0," + (i+4) * 20 + ")"; });
	 
	 legend.append("rect")
     .attr("x", margin.left)
     .attr("width", 16)
     .attr("height", 16)
     .style("fill", function(d){return colors[d]; });
	 
	legend.append("text")
     .attr("x", margin.left+25)
	 .attr("y",11)
     .style("text-anchor", "left")
	 .attr("fill","red")
	 .style("font-size", "12px") 
	 .style("font-family","sans-serif")
     .text(function(d) { return d;});
	 
    //g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
}

function compare(data)
{
	var svg = d3.select(".compare");
	svg.selectAll(".comp").remove();
    margin = {top: 225, right: 20, bottom: 20, left: 30};
    width = +svg.attr("width") - margin.left - margin.right;
    height = +svg.attr("height") - margin.top - margin.bottom;
	
	g = svg.append("g").attr("class","comp").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	
	
	//console.log(data)
	
	
		g.append("text")
		.style("text-anchor", "left")
		.style("font-size", "16px") 
		.style("font-family","sans-serif")
		.attr("transform","translate(0,0)")
		.attr("fill","red")
		.text("Comparision Chart for "+data.key+" during "+data.data.year+" :")
	
		g.append("text")
		.style("text-anchor", "left")
		.style("font-size", "14px") 
		.style("font-family","sans-serif")
		.attr("transform","translate(0,20)")
		.text("Democrats received "+Math.round(democrats_dictionary[data.data.year][data.key+" count"])+" donations with total amount ")
		
		g.append("text")
		.style("text-anchor", "left")
		.style("font-size", "14px") 
		.style("font-family","sans-serif")
		.attr("transform","translate(0,40)")
		.text("of $"+Math.round(democrats_dictionary[data.data.year][data.key])+" from "+dem_don[data.data.year][data.key].length +" Sponsors")
	
		g.append("text")
		.style("text-anchor", "left")
		.style("font-size", "14px") 
		.style("font-family","sans-serif")
		.attr("transform","translate(0,60)")
		.text("Republicans received "+Math.round(republicans_dictionary[data.data.year][data.key+" count"])+" donations with total amount")
		
		g.append("text")
		.style("text-anchor", "left")
		.style("font-size", "14px") 
		.style("font-family","sans-serif")
		.attr("transform","translate(0,80)")
		.text("of $"+Math.round(republicans_dictionary[data.data.year][data.key])+" from "+rep_don[data.data.year][data.key].length +" Sponsors")
	
}

