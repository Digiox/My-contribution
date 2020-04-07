export default function makeObjectData(userName, repos) {
    return new Promise(function (resolve, reject) {
        if (!userName || !repos) reject("undefined parameters")
        resolve({
            'userName': userName,
            'repos': repos
        })
    })
}
