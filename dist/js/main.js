import * as states from './data/states.js'

// create array containing States' names for dropdown list
const statesList = states.states;

// Populate the States dropdown list.
let options = '<option><i> choose a state to lookup...</i></option>'
statesList.forEach(element => {

        // let value = element.split(" ").join("-").toLowerCase;
        console.log(element);
        options += `<option value=${element.split(" ").join("-").toLowerCase()}>${element}</option>`

        document.getElementById('statesList').innerHTML = options;
    })
    // selected state to search for 
var searchState;

// Fetch data based on dropdown selection
document.getElementById('statesList').addEventListener('click',
    function(e) {
        e.preventDefault();
        // let statesList = document.getElementById('statesList');
        // searchState = statesList.
        searchState = document.getElementById('statesList').value;


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
                console.log(candidates)
                let output = '<th>Candidate</th><th>%</th><th>Votes</th><th>Absentee Votes</th><th>Absentee  Percent</th>';

                candidates.forEach(element => {
                        // console.log(element);
                        output += `                
                        <tr>
                            <td>${element.name_display}</td>
                            <td>${element.percent_display}%</td>   
                            <td>${element.votes}</td>   
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