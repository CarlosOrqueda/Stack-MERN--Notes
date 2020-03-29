import 'dotenv/config';

import app from './server';
import './database';

(async () => {
    try {
        await app.listen(app.get('port'));
        console.log(`Server on port ${app.get('port')}`);
    } catch (e) {
        console.log(e);
    }
})();