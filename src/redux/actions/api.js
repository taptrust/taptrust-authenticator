export const POLL_SERVER = 'POLL_SERVER';

export const pollServer = (serverPoll) => ({
    type: POLL_SERVER,
    serverPoll
});