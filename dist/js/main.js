let promise = fetch("https://static01.nyt.com/elections-assets/2020/data/api/2020-11-03/race-page/pennsylvania/president.json")

promise.then(response => {
    if (response.status !== 200) {
        let data = response.status;

        console.log('Looks like there was a problem. Status Code: ' +
            response.status);

        return;
    }
    response.json().then(data => {
        console.log(data);
        let candidates = data.data.races[0].candidates;
        let output = '<h2 class="candidate-title>Candidates"></h2>';

        candidates.forEach(element => {
            console.log(element);
            output += `
            <ul>
                <li>${element.name_display + element.percent_display + "%" + element.absentee_votes + element.absentee_percent}</li>

            </ul>
            `
        })
        console.log(output);
        document.getElementById('main').innerHTML = output
        console.log(candidates)
    }).catch(error => {
        console.log(error.message);
    })
});