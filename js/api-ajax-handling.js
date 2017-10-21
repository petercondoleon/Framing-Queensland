/*************************************
40,000 Pictures APIs call and handling

Institution: The University of
Queensland

Course: DECO1800 Semester 2 - 2017

Author: Sky Design
*************************************/
/**
 * Accesses data.gov api to return an array json objects with filtered
 * attributes: '1000_pixel_jpg', 'id'. specified for the homepage.
 * @param {integer} count the number of images that will be returned
 */
function loadSLQImagesHomepage(count) {
    "use strict";
    // if the count is under 1, return 1.
    if (count < 1) {
        // base64_decode resourceInfo data
        count = atob(slq_limit);
    }
    var imageData = [],
        data = {
            // base64_decode resourceInfo data
            resource_id: atob(slq_data_id),
            limit: count
        };
    // if images are already on system, load them instead of making an ajax call
    if (localStorage.getItem("slqDataImagesHomepage")) {
        console.log("Data is on local storage.");
        imageData = JSON.parse(localStorage.getItem('slqDataImagesHomepage'));
        // sync independant function calls
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
                        let dataRecords = data.result.records;
                        // The number of records = the parsed limit.
                        if (dataRecords.length >= count) {
                            imageData = [];
                            for (var i = 0; i < dataRecords.length; i++) {
                                imageData.push(buildJSON(dataRecords[i]));
                            }
                            // sync independant function calls
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
        }); // End of Ajax
    }
}

/**
 * Accesses data.gov api to return an array json objects with filtered
 * attributes: '1000_pixel_jpg', 'id'. specified for the gamepage.
 * @param {integer} count the number of images that will be returned
 * @param {integer} rounds the number of rounds the game is hosting
 * @param {integer[]} array of id's that will NOT be returned.
 */
function loadSLQImagesGame(count, rounds, exclusionData) {
    "use strict";
    // if the count is under 1, return 1.
    console.log("loadSLQ GAME");
    if (count < 1) {
        // base64_decode resourceInfo data
        count = atob(slq_limit);
    }
    var imageData = [],
        data = {
            // base64_decode resourceInfo data
            resource_id: atob(slq_data_id),
            limit: count
        };
    // if images are already on system, load them instead of making an ajax call
    if (localStorage.getItem("slqDataImages") &&
    JSON.parse(localStorage.getItem('slqDataImages')).length == count) {
        console.log("Data is on local storage.");
        imageData = JSON.parse(localStorage.getItem('slqDataImages'));
        // sync independant function calls
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
                        let dataRecords = data.result.records;
                        // The number of records = the parsed limit.
                        if (dataRecords.length >= count) {
                            imageData = [];
                            for (var i = 0; i < dataRecords.length; i++) {
                                // TODO: check for exclusionData
                                imageData.push(buildJSON(dataRecords[i]));
                            }
                            // sync independant function calls
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
        }); // End of Ajax
    }
}

/**
 * Helper method for "loadSLQImages", builds a filtered object from database
 * query.
 * @param {Object} slqJsonPictures called object
 * @return {Object} refined json object
 */
function buildJSON(slqJsonPictures) {
    "use strict";
    var jsonObject = {},
        recordImage = slqJsonPictures["1000_pixel_jpg"],
        recordId = slqJsonPictures._id;
    // check if record image and id exists
    if (recordImage && recordId) {
        jsonObject = {
            image: recordImage,
            id: recordId
        };
        // all data should have an ID and url, else incorect data was reterived.
    } else {
        jsonObject = {
            help: "Error: SLQ has not provided the correct data!"
        };
    }
    // TODO: remove this console.log after testing is done with it (@Jayden)
    return jsonObject;
}

/**
 * An external API is called to generate keywords
 * based on a parsed image url.
 * @param {string} takes a string URL of an image.
 * @return {Object} returns an array of keywords in
 * reference to the image.
 */
function keywordAPICall(image) {
    "use strict";
    // NOTE: THIS IS PURELY FOR TESTING THE RETURN VALUED WITHOUT HAVING TO
    // MAKE CALL!
    var dummyKeywordData = [{
        "id": "ai_WTrlNkqM",
        "name": "vehicle",
        "value": 0.9955914,
        "app_id": "main"
    }, {
        "id": "ai_l8TKp2h5",
        "name": "people",
        "value": 0.99399686,
        "app_id": "main"
    }, {
        "id": "ai_VPmHr5bm",
        "name": "adult",
        "value": 0.9830597,
        "app_id": "main"
    }, {
        "id": "ai_0SL2mdXt",
        "name": "military",
        "value": 0.9758798,
        "app_id": "main"
    }];
    var keywordData,
        imageURL = image.image,
        imageId = image.id,
        localStorageId = 'clarifai'+imageId;
    const keywordApp = new Clarifai.App({
        apiKey: atob(keywords_api_key)
    });
    // NOTE: normally this check would not be made as the game is designed to
    // improve as the underlying technology does, however for quota usage this
    // check is made!
    if (localStorage.getItem(localStorageId)) {
        console.log("keyword data is on local storage.");
        keywordData = JSON.parse(localStorage.getItem(localStorageId));
        // sync independant function calls
        // TODO: myfunctionName(dummyKeywordData);
        // NOTE: dummyKeywordData.name && dummyKeywordData.value
    } else {
        callClarifai(keywordApp);
    }
    function callClarifai(app) {
        console.log("keyword data isn't on local storage. Grabbing from server.");
        app.models.predict(Clarifai.GENERAL_MODEL, imageURL).then(
            function(response) {
                keywordData = response.outputs[0].data.concepts;
                response = JSON.stringify(keywordData);
                localStorage.setItem(localStorageId, response);
                // sync independant function calls
                // TODO: myfunctionName(dummyKeywordData);
                // NOTE: dummyKeywordData.name && dummyKeywordData.value
            },
            function(err) {
                console.error(err);
            }
        );
    } // End of Ajax
}
