import { default as pino }from 'pino';

function now() {
    return new Date(Date.now()).toISOString();
}

const transports = pino.transport({
  targets: [
    {
      target: 'pino-pretty',
      options: {
        colorize: true,
        colorizeObjects: true, 
      }
    },
    {
      target: 'pino/file',
      options: { destination: `./logs/${now()}.log`, mkdir: true }
    },
  ],
  levels: { foo: 35 }
});

export default pino(transports)
