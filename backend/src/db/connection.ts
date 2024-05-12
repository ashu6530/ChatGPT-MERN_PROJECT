import {connect,disconnect} from 'mongoose'
 async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log(error);
       throw new Error('Cannot Connect to mongodb')
    }
}
async function disConnectFromDatabase() {
    try {
        await disconnect();
    } catch (error) {
        console.log(error);
        throw new Error('Cannot Connect to mongodb')
        
    }
}
export {connectToDatabase,disConnectFromDatabase}