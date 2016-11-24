/* This module add the side menu to the UI
 * This module add a div containing hierachy modification inputs
 * this module trigger hieUpdate
 * @ Author Adrien Basso blandin
 * This module is part of regraphGui project
 * this project is under AGPL Licence
*/
define([
	"ressources/d3/d3.js",
	"ressources/requestFactory.js"
],function(d3,RqFactory){
	/* Create a new side menu structure
	 * @input : container_id : the container to bind this hierarchy
	 * @input : dispatch : the dispatch event object
	 * @input : server_url : the regraph server url
	 * @return : a new SideMenu object
	 */
	return function SideMenu(container_id,dispatch,server_url){
		var request = new RqFactory(server_url);
		var container = d3.select("#"+container_id);
		var title = container.append("div")
			.attr("id","side_title");
		var side_content=container.append("div")
			.attr("id","side_content");
		container.append("div")//add a close button
			.classed("close_side_menu",true)
			.on("click",function(){return dispatch.call("tabMenu",this)})
			.html("&#x25c0;")
			.classed("unselectable",true);
		var current_obj;
		var fth;
		/* load a new content for the menu
		 * @input : g_id : the currently selected node in tab menu
		 * @input : sons_l : the list of node in tab menu
		 * @input : current : the current node father
		 * @input : aff_type : the type of things to show
		 */
		this.load = function load(g_id,sons_l,current,aff_type){
			current_obj = g_id;
			fth = current;
			side_content.selectAll("*").remove();
			title.text("Modification for "+aff_type)//add a title
				.classed("unselectable",true);
			side_content.append("div")//add the remove button
				.classed("side_el",true)
				.classed("side_button",true)
				.on("click",removeHie)
				.html("remove selected")
				.classed("unselectable",true);
			side_content.append("select")//add the merge selector
				.attr("id","sons_select")
				.selectAll("option")
					.data(sons_l)
					.enter().append("option")
						.text(function(d){return d})
						.attr("selected",function(d,i){return i==0});
			side_content.append("div")//add the merge button
				.classed("side_el",true)
				.classed("side_button",true)
				.on("click",mergeHie)
				.html("Merge with")
				.classed("unselectable",true);
		}
		/* remove the currently selected hierarchy from the server
		 * this operation remove all the sons of this hierarchy and all the graphs !
		 */
		function removeHie(){
			if(confirm("Remove : "+current_obj))
				request.delHierarchy(current_obj,function(e,r){
					if(e) return console.error(e);
					console.log(r);
					dispatch.call("hieUpdate",this);
				});
		};
		/* merge the currently selected graph with an other selected with the selector
		 * create a new graph with the merge
		 */
		function mergeHie(){
			var si   = container.select("#sons_select")
						.property('selectedIndex');
			var s    = container.select("#sons_select")
						.selectAll("option")
						.filter(function (d, i) { return i === si });
			var	data = s.datum();
			var isSlash =fth=="/"?"":"/";
			request.getGraph(fth+isSlash+data,function(e,r){
				request.getGraph(current_obj,function(e,r2){
					myMerge(r,r2);
				})
			})
		}
		/* merge two graph according to matching properties between nodes of the same type
		 */
		function myMerge(g1,g2){
			g1.nodes.forEach(function(node){
				
			})
			console.log(g1);
			console.log(g2);
		};
	}
})