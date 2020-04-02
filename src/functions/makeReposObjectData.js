export default function makeObjectData(userName, repos) {
    return new Promise(function (resolve, reject) {
        resolve({
            'userName': userName,
            'repos': repos
        })
    })
}
