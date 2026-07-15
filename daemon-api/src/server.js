require("dotenv").config();

const app = require("./app");
const connectDatabase = require("./config/database");

const PORT = process.env.PORT || 5000;

async function start() {

    await connectDatabase();

    app.listen(PORT, () => {

        console.log("");
        console.log("=================================");
        console.log("🚀 Daemon API Started");
        console.log(`🌍 http://localhost:${PORT}`);
        console.log("=================================");

    });

}

start();