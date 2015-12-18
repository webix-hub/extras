
webix.ui.datafilter.sumColumn = {
	getValue:function(node){ return node.firstChild.innerHTML; },
	setValue: function(){},
	getResult:function(master, config){
		var result = 0;
		master.mapCells(null, config.columnId, null, 1, function(value){
			if(value && typeof value !== "boolean"){
				value = value*1;
				if (!isNaN(value))
					result+=value;
			}
		}, true);
		return result;
	},
	refresh:function(master, node, config){
		var result = this.getResult(master, config);

		if (config.format)
			result = config.format(result);
		if (config.template)
			result = config.template({config:result});

		node.firstChild.innerHTML = result;
	},
	trackCells:true,
	render:function(master, config){
		if (config.template)
			config.template = webix.template(config.template);
		return "";
	}
};

webix.ui.datafilter.avgColumn = webix.extend({
	getResult:function(master, config, raw){
		var sum = 0, count = 0;
		master.mapCells(null, config.columnId, null, 1, function(value){
			if((value || value ===0) && typeof value !== "boolean"){
				value = value*1;
				if(!isNaN(value)){
					sum+=value;
					count++;
				}
			}
		}, true);
		return raw?{sum:sum, count:count}:parseFloat(sum/count).toFixed(5);
	}
}, webix.ui.datafilter.sumColumn);

webix.ui.datafilter.countColumn = webix.extend({
	getResult:function(master, config){
		var result = 0;
		master.mapCells(null, config.columnId, null, 1, function(value){
			if((value || value ===0) && typeof value !== "boolean" && !isNaN(value*1))
				result++;
		}, true);
		return result;
	}
}, webix.ui.datafilter.sumColumn);

webix.ui.datafilter.dCountColumn = webix.extend({
	getResult:function(master, config){
		var hash = {}, result = 0;
		master.mapCells(null, config.columnId, null, 1, function(value){
			if((value || value === 0) && typeof value !== "boolean"){
				value = value*1;
				if(!isNaN(value*1)){
					if(!hash[value])
						result++;
					hash[value] = 1;
				}
			}
		}, true);
		return result;
	}
}, webix.ui.datafilter.sumColumn);

webix.ui.datafilter.maxColumn = webix.extend({
	getResult:function(master, config){
		var max = "";
		master.mapCells(null, config.columnId, null, 1, function(value){
			if((value || value === 0) && typeof value !== "boolean"){
				value = value*1;
				if(!isNaN(value) && (value>max || max ===""))
					max = value;
			}
		}, true);
		return max || 0;
	}
}, webix.ui.datafilter.sumColumn);

webix.ui.datafilter.minColumn = webix.extend({
	getResult:function(master, config){
		var min = "";
		master.mapCells(null, config.columnId, null, 1, function(value){
			if((value || value === 0) && typeof value !== "boolean"){
				value = value*1;
				if(!isNaN(value) && (value<min || min ===""))
					min = value;
			}
		}, true);
		return min || 0;
	}
}, webix.ui.datafilter.sumColumn);

webix.ui.datafilter.prodColumn = webix.extend({
	getResult:function(master, config){
		var result = 0;
		master.mapCells(null, config.columnId, null, 1, function(value){
			value = value*1;
			if((value || value === 0) && !isNaN(value))
				result = result?result*value:value;
		}, true);
		return result;
	}
}, webix.ui.datafilter.sumColumn);

webix.ui.datafilter.sumProdColumn = webix.extend({
	isValid:function(value){
		var res = false;
		if((value || value ===0) && typeof value !=="boolean")
			value = value*1;
			if(!isNaN(value))
				res = value;
		return res;
	},
	getResult:function(master, config){
		var result = 0;
		
		var cols = [config.columnId];
		if(config.columns && config.columns.length)
			cols = config.columns;
		
		master.data.each(function(obj){
			var product;
			for(var i in cols){
				var value = this.isValid(obj[cols[i]]);
				if(typeof value == "number")
					product = webix.isUndefined(product)?value:product*value;
				else{
					product = 0;
					break;
				}
			}
			if(!webix.isUndefined(product)) result+=product;
		}, this);
		return parseFloat(result).toFixed(5);
	}
}, webix.ui.datafilter.sumColumn);

webix.ui.datafilter.varPColumn = webix.extend({
	getResult:function(master, config, raw){
		var res = webix.ui.datafilter.avgColumn.getResult(master, config, true);
		var avg = res.sum/res.count;
		var count = res.count;
		
		var sum = 0;
		master.mapCells(null, config.columnId, null, 1, function(value){
			if((value || value ===0) && typeof value !== "boolean")
				if(!isNaN(value*1))
					sum += Math.pow(value - avg, 2);
		}, true);

		var result = sum/count;
		return raw?result:parseFloat(result).toFixed(5);
	}
}, webix.ui.datafilter.avgColumn);

webix.ui.datafilter.stDevPColumn = webix.extend({
	getResult:function(master, config){
		var ratio = parseFloat(webix.ui.datafilter.varPColumn.getResult(master, config, true));
		return parseFloat(Math.sqrt(ratio)).toFixed(5);
	}
}, webix.ui.datafilter.varPColumn);