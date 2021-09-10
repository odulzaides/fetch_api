let promise = fetch("https://static01.nyt.com/elections-assets/2020/data/api/2020-11-03/race-page/pennsylvania/president.json")

promise.then(response => {
    if (response.status !== 200) {
        let data = response.status;

        console.log('Looks like there was a problem. Status Code: ' +
            response.status);

        return;
    }
    response.json().then(data => {
        let candidates = data.data.races[0].candidates;
        console.log(candidates);
        // console.log(data.data.races[0].candidates, typeof data);
    }).catch(error => {
        console.log(error.message);
    })
});