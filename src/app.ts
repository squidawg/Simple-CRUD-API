import 'dotenv/config';

const env = process.env.NODE_ENV;

const init = async () => {
    try {
        return env === 'multi'
            ? await import('./cluster.js')
            : await import('./index.js');
    } catch (e) {
        console.log(e)
    }
};

void init();
