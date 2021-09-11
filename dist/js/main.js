// let promise = fetch("https://static01.nyt.com/elections-assets/2020/data/api/2020-11-03/race-page/pennsylvania/president.json")
var searchState;
// console.log(searchState);
document.getElementById('search').addEventListener('click',
        function(e) {
            e.preventDefault();
            searchState = document.getElementById('state').value;

            // setup url to search a state
            let dataSearch = `https://static01.nyt.com/elections-assets/2020/data/api/2020-11-03/race-page/${searchState}/president.json`
            console.log(dataSearch);
            let promise = fetch(dataSearch);

            promise.then(response => {
                if (response.status !== 200) {
                    let data = response.status;

                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);

                    return;
                }
                response.json().then(data => {
                    // console.log(data);
                    let candidates = data.data.races[0].candidates;
                    let output = '<th>Candidate</th><th>%</th><th>Absentee Votes</th><th>Absentee  Percent</th>';

                    candidates.forEach(element => {
                            // console.log(element);
                            output += `                
                        <tr>
                            <td>${element.name_display}</td>
                            <td>${element.percent_display}%</td>   
                            <td>${element.absentee_votes}</td> 
                            <td>${element.absentee_percent}</td>
                        </tr>
                    `
                        })
                        // console.log(output);
                    document.getElementById('main').innerHTML = output
                        // console.log(candidates)
                }).catch(error => {
                    console.log(error.message);
                })
            });
        }
    )
    // alert("HELLO" + searchState);