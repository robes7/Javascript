// Cryptocurrency Dashboard using JavaScript, CoinGecko API & Chart.js

// Fetch cryptocurrency data from CoinGecko API
async function fetchCryptoData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
    }
}

// Generate cryptocurrency table
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

// Generate chart for cryptocurrency trends
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

// Initialize the dashboard
async function initDashboard() {
    const cryptoData = await fetchCryptoData();
    generateTable(cryptoData);
    generateChart(cryptoData);
}

document.addEventListener('DOMContentLoaded', initDashboard);
