// Global variables
var slq_data_id,
    slq_limit,
    keywords_api_key,
    keywords_api_secret;
// JSON resource info requirement
{
    const resourceInfo =
    {
        slq: {
            data_id: "9913b881-d76d-43f5-acd6-3541a130853d",
            limit: 1
        },
        keywords: {
            api_key: "acc_5f2b725d827949d",
            api_secret: "bcb5c5c688fcb83325dca3a86d1129b9"
        }
    };
    // grab variable from const resource info - allows for updatability
    slq_data_id = resourceInfo.slq.data_id;
    slq_limit = resourceInfo.slq.limit;
    keywords_api_key = resourceInfo.keywords.api_key;
    keywords_api_secret = resourceInfo.keywords.api_secret;
}
