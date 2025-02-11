<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crypto Dashboard</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin: 20px;
        }
        table {
            width: 80%;
            margin: 20px auto;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
        }
        th {
            background-color: #f4f4f4;
        }
        canvas {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>Top 10 Cryptocurrencies</h1>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price (USD)</th>
                <th>24h Change</th>
            </tr>
        </thead>
        <tbody id="crypto-table-body"></tbody>
    </table>
    <canvas id="crypto-chart" width="400" height="200"></canvas>
    
    <script>
        async function fetchCryptoData() {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true');
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error fetching cryptocurrency data:', error);
            }
        }

        function generateTable(data) {
            const tableBody = document.getElementById('crypto-table-body');
            tableBody.innerHTML = '';
            
            data.forEach((coin, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td><img src="${coin.image}" width="25" alt="${coin.name}"> ${coin.name} (${coin.symbol.toUpperCase()})</td>
                    <td>$${coin.current_price.toLocaleString()}</td>
                    <td>${coin.price_change_percentage_24h.toFixed(2)}%</td>
                `;
                tableBody.appendChild(row);
            });
        }

        function generateChart(data) {
            const ctx = document.getElementById('crypto-chart').getContext('2d');
            const labels = data.map(coin => coin.name);
            const prices = data.map(coin => coin.current_price);
            
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Current Price (USD)',
                        data: prices,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });
        }

        async function initDashboard() {
            const cryptoData = await fetchCryptoData();
            generateTable(cryptoData);
            generateChart(cryptoData);
        }

        document.addEventListener('DOMContentLoaded', initDashboard);
    </script>
</body>
</html>
