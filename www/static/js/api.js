function obtain_initial_map_population()
{
	$('#spinner').modal('show');
	
    options = {
    type:       "GET",
    url:        api_url, 
    data:       { "populate" : "True"},
    cache:      true,
    dataType:   "json",
               }; 

    $.ajax( options)
    .done( function(result)
    {
        //alert(JSON.stringify(result));
        $("#map").trigger("place_markers_and_clusters_on_map", {'location_data': result});
    }).fail(function()
	{
		$("#error_message").text("Error: Failed To Populate Map");
		$('#alertModal').modal('show');
		
	}).always(function(){
		$('#spinner').modal('hide');
	});


}


function obtain_specific_crop_map_population(crop_type)
{
	$('#spinner').modal('show');
	
    options = {
    type:       "GET",
    url:        api_url,
    data:       { "crop_type" : crop_type},
    cache:      true,
    dataType:   "json",
               }; 
	
    $.ajax( options)
    .done( function(result)
    {
        $("#map").trigger("place_markers_and_clusters_on_map", {'location_data': result});
    }).fail(function()
	{
		$("#error_message").text("Error: Search Operation Has Failed");
		$('#alertModal').modal('show');
		
	}).always(function(){
		$('#spinner').modal('hide');
	});

}


function retrieve_data(crop_type, geohashes, eid_count)
{

    max_eids = 50;
    if( eid_count > max_eids)
    {   
		$("#error_message").html("Data Size Is Too Large. More Than Data Points "+max_eids+" Selected. <br>Please Specify Data By Using Filter Or By Zooming In.");
		$('#alertModal').modal('show');		
    }
    else
    {
	
		$('#spinner').modal('show');
	
        geohashes = JSON.stringify(geohashes);

        options = {
        type:       "POST",
        url:        api_url,
        data:       { "crop_type": crop_type, "geohashes": geohashes},
        cache:      true,
        dataType:   "json",
                   }; 
				   
        $.ajax( options )
        .done( function(result)
        {
            $("#map").trigger("build_current_data", {'data': result });
        }).fail(function()
		{
			$("#error_message").text("Error: Failed to Obtain Data");
			$('#alertModal').modal('show');
			
		}).always(function(){
			$('#spinner').modal('hide');
			vm.selectedAllChecked(false);	//deselect the select all checkmark
		});
    }


}


function retrieve_database(database_types, eids)
{
	$('#spinner').modal('show');
	
    eids           = JSON.stringify(eids);
    database_types = JSON.stringify(database_types);

    options = {
    type:       "POST",
    url:        api_url,
    data:       { "database_types": database_types, "eids": eids},
    cache:      true,
    dataType:   "json",
               }; 
 
    $.ajax( options )
    .done( function(result)
    {
        $("#map").trigger("prompt_user_for_download", result );
    }).fail(function()
	{
		$("#error_message").text("Error: Failed to Download Database");
		$('#alertModal').modal('show');
		
	}).always(function(){
		$('#spinner').modal('hide');
	});

}



//For testing js code and api
//place the server url here. make sure to append "http://" to the beginning of url 
var api_url = "http://199.231.188.53:60000/api/";  //"http://api.agmip.org/cropdb/1/cache/location",//api_url,

//obtain_initial_map_population();
//obtain_specific_crop_map_population("COT");
//retrieve_data("RIC", ['w4x4mf4','wdw2b1p','wdvcr4h']);
//retrieve_database(["AMCO", "DOME"], ['w4x4mf4','wdw2b1p','wdvcr4h']);







