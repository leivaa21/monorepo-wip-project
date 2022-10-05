import { Server } from './lib/http/server';
import './router';
import './middlewares';

import logger from './lib/logger/consoleLogger';

const server = Server.bootstrap();


const port = 3000;
server.listen(port, () => {
  logger.info(`Server started on port ${port}`);
})

export default server;