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
 * attributes: '1000_pixel_jpg', 'id'. specified for the homepage.
 * @param {integer} count the number of images that will be returned
 * @return {undefined}
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
    if (localStorage.getItem("slqDataImagesHomepage")) {
        console.log("Data is on local storage.");
        imageData = JSON.parse(localStorage.getItem('slqDataImagesHomepage'));
        homepageImagesSetup(imageData);
        rotateImages("#photoStack ul li img");
    } else {
        console.log("Data isn't on local storage. Grabbing from server.");
        $.ajax({
            url: 'https://data.gov.au/api/action/datastore_search',
            data: data,
            dataType: 'jsonp',
            cache: true,
            async: true,
            type: "POST",
            success: function (data) {
                function dataIsHere() {
                    // Loop until the API has returned the specified data.
                    setTimeout(function () {
                        // The number of records = the parsed limit.
                        if (data.result.records.length >= count) {
                            imageData = [];
                            for (var i = 0; i < data.result.records.length; i++) {
                                imageData.push(buildJSON(data.result.records[i]));
                            }
                            // Callback
                            data = JSON.stringify(imageData);
                            localStorage.setItem('slqDataImagesHomepage', data);
                            homepageImagesSetup(imageData);
                            rotateImages("#photoStack ul li img");
                        } else {
                            console.log(
                                "Error: SLQ database cannot provide " +
                                "the requested data. Retrying..."
                            );
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
 * Accesses data.gov api to return an array json objects with filtered
 * attributes: '1000_pixel_jpg', 'id'. specified for the gamepage.
 * @param {integer} count the number of images that will be returned
 * @param {integer} rounds the number of rounds the game is hosting
 * @param {integer[]} array of id's that will NOT be returned.
 * @return {undefined}
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
        console.log("Data is on local storage.");
        imageData = JSON.parse(localStorage.getItem('slqDataImages'));
        setupGamePage(rounds, count, imageData);
        isLoading = false;
    } else {
        console.log("Data isn't on local storage. Grabbing from server.");
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
                            for (var i = 0; i < data.result.records.length; i++) {
                                // TODO: check for exclusionData
                                imageData.push(buildJSON(data.result.records[i]));
                            }
                            // Callback
                            data = JSON.stringify(imageData);
                            localStorage.setItem('slqDataImages', data);
                            setupGamePage(rounds, count, imageData);
                            isLoading = false;
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
 * @param {Object} rawajaxObject called object
 * @return {Object} refined json object
 */
function buildJSON(rawajaxObject) {
    var jsonObject = {},
        recordImage = rawajaxObject["1000_pixel_jpg"],
        recordId = rawajaxObject["_id"];
    // check if record image and id exists
    if (recordImage && recordId) {
        jsonObject = {
            image: recordImage,
            id: recordId
        }
        // all images should have an image and id, if not something has gone wrong.
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
            url: imageURL
        };
        // The following comments won't work as an implementation fix is needed.
        // I have failed the AUTH by intent, so we don't use quota.
        // Remove "fail" and replace with following string
    var username = "Fail"//"acc_5f2b725d827949d",
        password = "Fail"//"bcb5c5c688fcb83325dca3a86d1129b9";
    // $.ajax({
    //     type: "GET",
    //     username: username,
    //     password: password,
    //     url:"localhost",
    //     //url: 'https://'+username + ":" + password+'@api.imagga.com/v1/tagging',
    //     dataType : 'jsonp',
    //     data: data,
    //     //headers: {
    //     //    "Authorization": "Basic " + btoa(username + ":" + password)
    //     //},
    //     success: function (data) {
    //         console.log("success!")
    //         function dataIsHere() {
    //             setTimeout(function () {
    //                 if (data.results){
    //                     console.log("data.results:")
    //                     console.log(results);
    //                 } else {
    //                     console.log("data:")
    //                     console.log(data);
    //                     dataIsHere();
    //                 }
    //             },1000);
    //
    //         }
    //         dataIsHere();
    //     }
    // });
}
