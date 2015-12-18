Math in Webix Datatable
=================

Common mathematical methods for Webix Datatable. Used for calculating the sum of column values, searching the maximum and minimum value, etc. 

Are included into the column footer:

~~~js
webix.ui({
	view:"datatable", 
	columns:[
		{ id:"id",  header:"",    width:50, sort:"int", footer:{text:"Avg, Max, SumProdColumn:", colspan:3}},
		{ id:"name", header:"Name", width:250, sort:"string"},
		{ id:"code",  header:"Code", sort:"string"},
		{ id:"rating", header:"Rating", sort:"int", footer:{ content:"avgColumn" }},
		{ id:"price", header:"Price", sort:"int", footer:{ content:"maxColumn" }},
		{ id:"count",  header:"Quantity", sort:"int", footer:{ content:"sumProdColumn", columns:["price", "count"]}},
	],
	data:products_data
});
~~~

##sumColumn

Sums column values.

Only numeric values can be added. Empty cells, logical values like TRUE, or text are ignored.
Text values that can be converted into number are added.

~~~js
{ id:"rank", footer:{ content:"sumColumn" }}
~~~

##avgColumn

Calculates the average value from column values.

Logical values, or empty cells, those values are ignored. Cells with the zero value are included.
Cells with text values that can be converted into number are included.

~~~js
{ id:"rank", footer:{ content:"avgColumn" }}
~~~

##countColumn

Counts column values.

Only numbers are counted. Empty cells, logical values or text are not counted. 
Text values that can be converted into number are counted.

~~~js
{ id:"rank", footer:{ content:"countColumn" }}
~~~

##dCountColumn

Counts distinct column values.

Only numbers are counted. Empty cells, logical values or text are not counted. 
Text values that can be converted into number are counted.

~~~js
{ id:"rank", footer:{ content:"dCountColumn" }}
~~~

##maxColumn

Searches for the maximum value among column values.

Only numbers are used. Empty cells, logical values, or text are ignored.
Text values that can be converted into number are used.
If the column contains no numbers, *maxColumn* returns 0.

~~~js
{ id:"rank", footer:{ content:"maxColumn" }}
~~~

##minColumn

Searches for the minimum value among column values.

Only numbers are used. Empty cells, logical values, or text are ignored.
Text values that can be converted into number are used.
If the column contains no numbers, *minColumn* returns 0.

~~~js
{ id:"rank", footer:{ content:"minColumn" }}
~~~

##prodColumn

Multiplies column values.

Only numbers are multiplied. Empty cells, logical values, and text in the array or reference are ignored.
Text values that can be converted into number are multiplied.

~~~js
{ id:"rank", footer:{ content:"prodColumn" }}
~~~

##sumProdColumn

Calculates the sum of valid products of the given columns. 
For valid products only numbers are multiplied. Empty cells, logical values, and text  are ignored.
Text values that can be converted into number are also multiplied.

~~~js
{ id:"rank", {footer:"sumProductColumn", columns:["votes", "rank"]}}
~~~

If columns are not specified, the values from the current column are miltiplied by 1 and summed. In the snippet above, current column is *rank*.

##varPColumn

Calculates variance based on the entire population.

Only numbers are counted. Empty cells, logical values or text are ignored. 
Cells with the zero value are included (as in *avgColumn* filter).
Cells with text values that can be converted into number are included.

~~~js
{ id:"rank", footer:{ content:"varPColumn" }}
~~~

##stDevColumn

Calculates standard deviation based on the entire population.

Only numbers are counted. Empty cells, logical values or text are ignored.
Cells with the zero value  are included  (as in *avgColumn* filter).
Cells with text values that can be converted into number are included.

~~~js
{ id:"rank", footer:{ content:"stdevPColumn" }}
~~~

*The desciptions of methods are taken from support.office.com with little deviations.*
