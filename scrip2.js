fetch("https://www.reddit.com/r/CampFireStories.json").then(function (response) {
    if (response.ok) {
        response.json().then(function (data) {
            console.log(data)
        });
    };
});