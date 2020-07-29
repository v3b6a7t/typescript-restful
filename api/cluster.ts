import { exitHandler, sigusr2Handler } from './cluster/eventHandlers'

import cluster from 'cluster';
import DEBUG from 'debug';
import os from 'os';


if (cluster.isMaster) {

    const debug = DEBUG('api:cluster');
    debug(`Master PID: ${process.pid}`)

    const cpus = os.cpus().length;
    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', exitHandler)
    cluster.on('SIGUSR2', sigusr2Handler)


} else {
    require('./server')
}
