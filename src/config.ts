const config = require("../config.json")

const env = process.env.NODE_ENV ?? 'production';

export default {
    API_URL: config[env].API_URL
}
