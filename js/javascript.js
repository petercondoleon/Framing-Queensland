/*
 * Executes when the document is ready.
 */
$(document).ready(function() {
    homepageImagesSetup();
});

/*
* Sets up homepage with images.
* @param {Object[]} an array of objects containing images
*/
function homepageImagesSetup(jsonImages) {
    /*
    TODO:
        - call images from slq using:
            loadSLQImages(count, exclusionData)
                WHERE count = amount of images
                AND exclusionData is "[0]"
            access image URL like this "jsonImages[i].image"
        - use helper method to insert images into list:
            insertImage(image, htmlDOMPos)
                WHERE image is the source (URL)
                AND htmlDOMPOS is the location you want
                to insert img tag.
        I suggest something like this;
            <div>
                <ul>
                    <li>+IMAGE+</li>
                    <li>+IMAGE+</li>
                </ul>
            </div>
        for easy animation later on, unless you are comfortable
        doing it another way :)


    */
}

/*
* loads an image at a give html dom pos
* @param image source
* @param pos in the DOM that the img will be inserted to
*/
function insertImage(image, htmlDOMPos) {
    $(htmlDOMPos).append(
    '<img src='+'"'+image+'"'+'/>'
    );
}
