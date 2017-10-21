<?php
    $data_id = '9913b881-d76d-43f5-acd6-3541a130853d';
    // NOTE: on line 5 is the API key, swap the comment to line 6 for testing
    // NOTE: PLEASE BE AWARE OF USAGE
    // $api_key = 'e2c49cf4bd8f4280a237edc9b86f91b7';
    $api_key = 'NaNaNaNaNa';
?>
<script type="text/javascript">
    "use strict";
    // Global variables
    var slq_data_id = "",
        slq_limit = "",
        keywords_api_key = "";
    // JSON resource info requirement
    {
        const resourceInfo =
        {
            slq: {
                data_id: <?php echo json_encode(base64_encode($data_id)) ?>,
                limit: 1
            },
            keywords: {
                api_key: <?php echo json_encode(base64_encode($api_key)) ?>
            }
        };
        // grab variable from const resource info - allows for updatability
        slq_data_id = resourceInfo.slq.data_id;
        slq_limit = resourceInfo.slq.limit;
        keywords_api_key = resourceInfo.keywords.api_key;
    }
</script>
