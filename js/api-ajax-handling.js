/*************************************
40,000 Pictures API call and handling

Institution: The University of
Queensland

Course: DECO1800 Semester 2 - 2017

Author: Sky Design
*************************************/
/**
 * Executes when the document is ready.
 */
$(document).ready(function () {
    //console.log("js linked!");
});

// JSON resource info requirement
const resourceInfo = {
    slq: {
        data_id: '9913b881-d76d-43f5-acd6-3541a130853d',
        limit: 1
    },
    keywords: {
        api_key: 'acc_5f2b725d827949d'
    }
};

// grab variable from const resource info - allows for updatability
var slq_data_id = resourceInfo.slq.data_id,
    slq_limit = resourceInfo.slq.limit,
    keywords_api_key = resourceInfo.keywords.api_key;

/**
 * Accesses data.gov api to return an array json objects with filtered
 * attributes: '1000_pixel_jpg', 'id'.
 * @param {Number} count of images that will be returned
 * @param {Number[]} array of id's that will NOT be returned.
 * @return {Object[]} an array of json objects.
 */
function loadSLQImagesHomepage(count) {
    console.log("loadSLQ HOME");
    // if the count is under 1, return 1.
    if (count < 1) {
        count = slq_limit;
    }
    var imageData = [],
        data = {
            resource_id: slq_data_id,
            limit: count
        };

    $.ajax({
        url: 'https://data.gov.au/api/action/datastore_search',
        data: data,
        dataType: 'jsonp',
        cache: true,
        async: true,
        type: "POST",
        success: function (data) {
            function dataIsHere() {
                // Keep looping until the API has returned the specified data.
                setTimeout(function () {
                    // The number of records = the parsed limit.
                    if (data.result.records.length >= count) {
                        imageData = [];
                        for (var i = 0; i < data.result.records.length; i++) {
                            imageData.push(buildJSON(data.result.records[i]));
                        }
                        // Callback
                        homepageImagesSetup(imageData);
                        rotateImages("#photoStack ul li img");
                    } else {
                        dataIsHere();
                    }
                }, 1000);
            }
            dataIsHere();
        }
    });
}

/**
 * Accesses data.gov api to return an array json objects with filtered
 * attributes: '1000_pixel_jpg', 'id'.
 * @param {Number} count of images that will be returned
 * @param {Number[]} array of id's that will NOT be returned.
 * @return {Object[]} an array of json objects.
 */
function loadSLQImagesGame(count, rounds, exclusionData) {
    // if the count is under 1, return 1.
    console.log("loadSLQ GAME");
    if (count < 1) {
        count = slq_limit;
    }
    var imageData = [],
        data = {
            resource_id: slq_data_id,
            limit: count
        };
    if (localStorage.getItem("slqDataImages")) {
        imageData = JSON.parse(localStorage.getItem('slqDataImages'));
        setupGamePage(rounds, count, imageData);
    } else {
        $.ajax({
            url: 'https://data.gov.au/api/action/datastore_search',
            data: data,
            dataType: 'jsonp',
            cache: true,
            async: true,
            type: "POST",
            success: function (data) {
                function dataIsHere() {
                    // Keep looping until API returns the specified data.
                    setTimeout(function () {
                        // The number of records = the parsed limit.
                        if (data.result.records.length >= count) {
                            imageData = [];
                            for (var i = 0; i < data.result.records.length;
                                i++) {
                                // TODO: check for exclusionData
                                imageData.push(buildJSON(data.result.
                                    records[i]));
                            }
                            // Callback
                            data = JSON.stringify(imageData);
                            localStorage.setItem('slqDataImages', data);
                            setupGamePage(rounds, count, imageData);
                        } else {
                            dataIsHere();
                        }
                    }, 1000);
                }
                dataIsHere();
            }
        });
    }
}

/**
 * Helper method for "loadSLQImages", builds a filtered object from database
 * query.
 * @param {Object} ajax called object
 * @return {Object} refined json object
 */
function buildJSON(imageData) {
    var jsonObject = {},
        recordImage = imageData["1000_pixel_jpg"];
    //recordID = imageData["id"];
    // check if record image
    if (recordImage) {
        jsonObject = {
            image: recordImage
            //id:recordID
        }
    } else {
        jsonObject = {
            help: "an error has occured!"
        }
    }
    return jsonObject;
}

/**
 * An external API is called to generate keywords
 * based on a parsed image url.
 * @param {string} takes a string URL of an image.
 * @return {Object} returns an array of keywords in
 * referance to the image.
 */
function keywordAPICall(imageURL) {
    var keywords = [],
        data = {
            url: imageUrl,
            api_key: keywords_api_key
        }
    $.ajax({
        url: 'localhost',
        data: data,
        success: function (data) {
            keywords = data;
        }
    });
    return keywords;
}
