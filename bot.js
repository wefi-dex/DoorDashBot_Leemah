// bot.js
const axios = require('axios');
const config = require('./config');
const { login, checkOrders, acceptOrder } = require('./utils');

async function main() {
    await login();
    
    setInterval(async () => {
        const orders = await checkOrders();
        const filteredOrders = orders.filter(order => 
            order.pay >= config.HIGH_PAY_THRESHOLD && order.distance <= config.MAX_DISTANCE
        );

        if (filteredOrders.length > 0) {
            await acceptOrder(filteredOrders[0]); // Accept the highest priority order
        }
    }, config.CHECK_INTERVAL);
}

main();
