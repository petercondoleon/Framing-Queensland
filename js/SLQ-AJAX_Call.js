/*****************************
SLQ AJAX 40,000 Pictures Call

Institution: The University of 
Queensland

Course: DECO1800

Author: Sky Design

Year: 2017
*****************************/

// resource-info.json requirment
// gonna ask a tute a question on JSON server loading.
const resourceInfo = {data_id: '9913b881-d76d-43f5-acd6-3541a130853d',limit: 1};

// grab const variable from resource info, allows for updatability 
var data_id = resourceInfo.data_id,
    limit = resourceInfo.limit;

// TODO: function loadSLQImages(divID, count) {
function loadSLQImages(divID) {
    
    var data = {resource_id:data_id,limit:limit};

    $.ajax({
        url: 'http://data.gov.au/api/action/datastore_search',
        data: data,
        dataType: 'jsonp',
        cache: true,
        //cache: false,
        success: function(data) {
            iterateImageData(data, divID);
            //data = JSON.stringify(data);
            //localStorage.setItem('slqData', data);
            //console.log('From API');
        }
    });

}

function iterateImageData(imageData, divID) {
    $.each(imageData.result.records, function(recordKey, recordValue) {
        var recordImage = recordValue['1000_pixel_jpg'];
            //recordDescription = recordValue['dc:description'];
            // TODO:
            //  grab id of image for later use and parse back into form.
            if(recordImage) {
                $('#'+divID+' img').attr("src",recordImage);
            }
    //jquery $.each close
    });
}

$(document).ready(function() {
    //console.log("js linked!");
});

