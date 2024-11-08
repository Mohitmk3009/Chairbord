import io from 'socket.io-client'

let socket;
export const serverURL = 'http://192.168.0.65:3001'

export const initializeSocket = (serverUrl, userId) => {
    console.log(serverURL, userId)
    socket = io(serverUrl, {
        query: {
            userId: userId
        }
    })
    return socket;
}

export const getSocket = () => {
    if (!socket) {
        console.warn('Socket has not been initialized. Call initialize first.')
    }
    return socket;
}

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
}