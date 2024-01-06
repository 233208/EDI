document.addEventListener('DOMContentLoaded', function () {
    // adres API naszych danych
    const apiUrl = 'https://my.api.mockaroo.com/players_ranking.json?key=86e5b820';
    const numberOfData = prompt('Enter the number of data to display:', '100');
    const limit = parseInt(numberOfData);
    // Fetch data z API (imię, total maps played, wiek)
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Limit data to the first ** items
            const limitedData = data.slice(0, limit);

            const names = limitedData.map(player => player.player_name);
            const scores = limitedData.map(player => player.total_maps_played);
            const age = limitedData.map(player => player.age)
            const fav_team = limitedData.map(player => player.fav_team_name);

            // Wykres typu Bar - total maps played
            createBarChart(names, scores);

            // Tabela
            drawTable(limitedData);

            // Drugi wykres - player age
            //drawPolarAreaChart(names, age)

            // Trzeci wykres - fav_team
            createBarChart2(fav_team);
                
        })
        .catch(error => console.error('Error fetching data:', error));

    function createBarChart(names, scores) {
        // Pobranie canvy o Id "myChart", getcontext - canva rysowana w 2D
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: 
                names,
                datasets: [{
                    label: 'Player total maps played',
                    data: scores,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 5,
                    color: "white"
                }]
            },
            options: {
                color: "#9c9fac",
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: "#9c9fac" // Set y-axis label color to white
                        }
                    },
                    x: {
                        ticks: {
                            color: "#9c9fac" // Set x-axis label color to white
                        }
                    }
                }
            }
        });
    }
    // Rysowanie Tabeli
    function drawTable(data) {
        const dataTableBody = $('#data-list');
        dataTableBody.empty();
        //Pętla wypełniająca
        $.each(data, function (index, item) {
            const tableRow = $('<tr>');
            tableRow.append($('<td>').text(item.player_id));
            tableRow.append($('<td>').text(item.player_name));
            tableRow.append($('<td>').text(item.nationality));
            tableRow.append($('<td>').text(item.fav_team_name));
            tableRow.append($('<td>').text(item.age));
            tableRow.append($('<td>').text(item.kills_per_round));
            tableRow.append($('<td>').text(item.headshot_percentage));
            tableRow.append($('<td>').text(item.rating));
            tableRow.append($('<td>').text(item.total_maps_played));
            tableRow.append($('<td>').text(item.total_prize_money));

            dataTableBody.append(tableRow);
        });
    }
    // drugi chart jeszcze do dopracowania
  /*function drawPolarAreaChart(names, age) {
    const ctx = document.getElementById('myChart2').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: names,
            datasets: [{
                label: 'Players age',
                data: age,
                color: "#9c9fac",
                backgroundColor: [
                "rgb(21,2,99,0.2)"

                ],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            color: "#9c9fac",
            plugins: {
                legend: {
                    position: 'bottom',
                }
            }
        }
        
    });
}*/
function createBarChart2(fav_team) {
    let teamCounts = {};

    fav_team.forEach(team => {
        teamCounts[team] = (teamCounts[team] || 0) + 1;
    });

    // Pobranie canvy o Id "myChart", getcontext - canva rysowana w 2D
    const ctx = document.getElementById('myChart3').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: Object.keys(teamCounts), // Etykiety to ulubione zespoły
            datasets: [{
                label: 'Number of Players',
                data: Object.values(teamCounts), // Wartości to ilość graczy
                backgroundColor: [
                'rgba(75, 192, 70, 0.2)',
                'rgba(80, 192, 100, 0.2)',
                'rgba(90, 192, 130, 0.2)',
                'rgba(100, 192, 160, 0.2)',],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                color: "#9c9fac"
            }]
        },
        options: {
            color: "#9c9fac",
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                }
            }
        }
    });
}
});
