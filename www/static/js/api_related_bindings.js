//--------------------------------------------------------------------------------bindings used for api
$("#map").on("place_markers_and_clusters_on_map", function(event, event_data) 
{

    //only place markers on map if markers are present
    if(event_data['location_data'].length > 0)
    {
        markers = []; //reset the marker array
        place_markers_and_clusters_on_map(event_data['location_data']);
    }  

});

$("#map").on("build_table_with_data", function(event, event_data) 
{

    build_table_with_data(event_data['data']); 

});

$("#map").on("prompt_user_for_download", function(event, event_data) 
{
    window.open(event_data['url'] ,"","width=200,height=100");

});

function is_in_array( array, value)
{
    //this function compares strings
    for (var i=0; i < array.length; i++)
    {
        if(array[i].toString() == value.toString())
        {
            return true;
        }
        
    }
    return false
}
//--------------------------------------------------------------------------------bindings used for api





