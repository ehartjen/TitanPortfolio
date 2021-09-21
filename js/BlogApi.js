$(function () {
    fetch('//ehartjen-blog.herokuapp.com/GetTopXPosts/3')
        .then(response => response.json())
        .then(function (data) {
            RenderApiData("blog1", data[0]);
            RenderApiData("blog2", data[1]);
            RenderApiData("blog3", data[2]);
        });
});

function RenderApiData(id, data) {
    //Establish the link out to the BlogPost Details...
    let blogLink = `//ehartjen-blog.herokuapp.com/BlogPost/UrlFriendly/${data.slug}`;

    //Work with the text anchor
    let textAnchor = $(`#${id} > div.card-body > h3 > a`);
    //let textanchor = document.querySelector(`#${id} > div.card-body > h3 > a`)
    textAnchor.text(data.title);
    textAnchor.attr("href", blogLink);

    //Work with the image anchor
    let imageAnchor = $(`#${id} > div.card-img > a`);
    imageAnchor.attr("href", blogLink);

    //Work with the image
    let image = $(`#${id} > div.card-img > a > img`);
    let imageData = `data:${data.contentType};base64,${data.imageData}`;
    image.attr("src", imageData);

    //Work with the Abstract
    let abstract = $(`#${id} > div.card-body > p`);
    abstract.text(data.abstract);

    //Work with the created date
    let options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    let created = $(`#${id} > div.card-footer > div > span`);
    let localDate = new Date(data.created).toLocaleDateString("en-US", options);
    created.text(`Created: ${localDate}`);
}