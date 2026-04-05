import { AppDataSource } from './config/data-source';
import { PORT } from './config/envs';
import server from './server';
import "reflect-metadata"

AppDataSource.initialize()
    .then(() => {
        server.listen(3000, () => {
            console.log(`Server listen on port ${PORT}`);
        })
    
        
    })
    .catch((error) => console.log(error))


