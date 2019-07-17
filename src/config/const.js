export default function cred() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'dev') {
        return {
            port: 9001,
            db: {
                mongodb: {
                    url: 'mongodb://localhost:27017',
                }
            },
            secret: '',
            activateAccountSecret: ''
        }
    } else if (process.env.NODE_ENV === 'prod') {
        return {
            port: 9001,
            db: {
                mongodb: {
                    url: ''
                }
            },
            secret: '',
            activateAccountSecret: ''
        }
    }
}