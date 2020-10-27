const path = require('path');
const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const ssr = require('./SSR');
// const App = props => <div>Вывооод</div>
/* config values start*/
const PORT = config.get('port') || 5000;
/* config values end*/

const app = express();
app.use(express.json({ extended: true }));
app.use('/api/posts', require('./routes/post.routes'));
app.use('/static/', express.static(path.join(__dirname, 'frontend', 'build', 'static')));
app.use(ssr);

async function start(){
    try {
        await mongoose.connect(config.get('databaseUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log('app has been started!'))
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start();