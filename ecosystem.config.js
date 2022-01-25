module.exports = {
    apps: [
        {
            name: "ANPH-XYZ",
            script: "./server.js",
            error_file: `./logs/error-.log`,
            out_file: `./logs/combined-.log`,
            watch: ['controllers', 'routes', 'utils', 'server.js'],
            max_restarts: 5,
            min_uptime: 5000,
            //instances: "4",
            env: {//pm2 start ecosystem.config.js
                "PORT": 3000,
                "NODE_ENV": "development"
            },
            env_production: {
                //pm2 start ecosystem.config.js --env production
                "PORT": 8000,
                "NODE_ENV": "production"
            }
        }
    ]
}
