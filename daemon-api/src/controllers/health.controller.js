exports.health = (req, res) => {

    res.status(200).json({

        success: true,
        application: "Daemon API",
        version: "1.0.0",
        status: "Running 🚀",
        timestamp: new Date()

    });

};