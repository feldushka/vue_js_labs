const axios = require('axios');

async function makeRequest() {
    try {
        const response = await axios.get('https://json.geoiplookup.io');
        console.log('Статус ответа:', response.status);
    } catch (error) {
        console.error('Ошибка запроса:', error.message);
    }
}

makeRequest();
