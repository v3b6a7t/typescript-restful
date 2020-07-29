import cluster from 'cluster';
import DEBUG from 'debug'

const debug = DEBUG('api:cluster:handlers');

type WorkerType = cluster.Worker;


function isWorkerType(w: WorkerType | undefined): w is WorkerType {
    return !!(w as WorkerType).exitedAfterDisconnect;
}


// CLUSTER exit handler

function exitHandler(worker: WorkerType, code: number): void {

    if (code !== 0 && !isWorkerType(worker)) {

        cluster.fork();
    }
}


// MAIN PROCESS stop handler

function sigusr2Handler(): void {

    const workers: (WorkerType | undefined)[] = Object.values(cluster.workers) || [];

    const restartWorker = (workerIndex: number): void => {

        const worker = workers[workerIndex];

        if (!isWorkerType(worker)) return;

        worker.on('exit', () => {

            debug(`Exited process #${worker.process.pid}`);

            if (!worker.exitedAfterDisconnect) return;

            debug(`Restart worker #${workerIndex}`);

            cluster.fork().on('listening', () => {

                restartWorker(workerIndex + 1);

            });

        });

        worker.disconnect();
    };

    restartWorker(0);
}



export { exitHandler, sigusr2Handler }
