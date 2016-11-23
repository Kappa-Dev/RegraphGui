define(["ressources/d3/d3.js","ressources/simpleTree.js","ressources/requestFactory.js"],function(d3,Tree,RFactory){
	return function Hierarchy(container_id,dispatch,server_url){
		if(!server_url) throw new Error("server url undefined");
		var srv_url = server_url;//the current url of the server
		var disp = dispatch;//global dispatcher for events
		var container = d3.select("#"+container_id).append("div").attr("id","tab_menu").classed("top_menu",true);//add all tabl to menu
		var hierarchy = new Tree();//a tree containing the whole hierarchy
		var h_select = container.append("select").attr("id","h_select").classed("mod_el",true);//the hierarchy selector
		var h_list = container.append("div").attr("id","scrolling_list");//the list of son of the specified node
		var current_node = null;//the current selected node
		var selected_node = null;
		var factory = new RFactory(srv_url);
		this.update = function update(root_path){
			factory.getHierarchy(root_path,function(err,req){
				hierarchy.load(req);
				current_node = hierarchy.getRoot();
				initHlist(hierarchy.getSons(current_node));
				initHselect(hierarchy.getTreePath(current_node));
			});
		};
		function initHlist(data){
			h_list.selectAll("*").remove();
			var slc =h_list.selectAll(".tab_menu_el")
				.data(data);
			slc.enter().append("div")
				.classed("tab_menu_el",true)
				.classed("unselectable",true)
				.attr("id",function(d){return d})
				.on("click",function(d){return tabChange(d)})
				.on("dblclick",function(d){return lvlChange(d)})
				.text(function(d){return hierarchy.getName(d)});
		};
		function initHselect(data){
			h_select.selectAll("*").remove();
			h_select.selectAll("option")
				.data(data)
				.enter().append("option")
					.text(function(d){return hierarchy.getName(d)})
					.attr("selected",function(d){return d==current_node});
			h_select.on("change",lvlChange);
				
		};
		function tabChange(id){
			if(selected_node!=id){
				selected_node = id;
				h_list.selectAll(".tab_menu_el")
				.style("color","rgb(251, 249, 200)")//show the correct menu element
				.style("background",function(d){
					return d==id?"linear-gradient(to bottom, #3fa4f0 0%, #0f71ba 100%)":"none";
				});
			}
			disp.call("graphUpdate",this,hierarchy.getAbsPath(id));
		};
		function lvlChange(id){
			d3.event.stopPropagation();
			var data = id;
			if(!id){
				var si   = h_select.property('selectedIndex'),
				s    = h_select.selectAll("option").filter(function (d, i) { return i === si });
				data = s.datum();
			}
			if(hierarchy.getSons(data).length==0)return;
			current_node = data;
			initHlist(hierarchy.getSons(data));
			initHselect(hierarchy.getTreePath(data));
		};
	};
});