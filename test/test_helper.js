const mongoose  = require('mongoose');
mongoose.connect('mongodb://localhost/mongo_node_test');

mongoose.connection
    .once('open', () => console.log('Connection to MongoDB Server Successful!'))
    .on('error', (err)=>{
        console.warn(`Warning: ${err}`);
    });

// beforeEach((done)=>{
//     mongoose.connection.collections.users.drop(()=>{
//         done();
//     });
// })