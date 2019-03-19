const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios')

const ipc = electron.ipcRenderer

// refer DOM element in index.html
const notifyBtn = document.getElementById('notifyBtn')
var price = document.querySelector('h1')
var targetVal;
var target = document.getElementById('target')

const notification = {
    title: 'BTC Alert',
    body: 'BTC just ...??'
}


function getBTC(){
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
    .then(res => {
        const cryptos = res.data.BTC.USD
        price.innerHTML = '$' + cryptos.toLocaleString('en')
        if (target.innerHTML != '' && targetVal < res.data.BTC.USD){
            const myNotification = new window.Notification(notification.title, notification)        }
    })
}
getBTC()
setInterval(getBTC, 5000)

notifyBtn.addEventListener('click', function(event){
    const modalPath = path.join('file://', __dirname, 'add.html')
    let win = new BrowserWindow({frame:false, transparent:true, alwaysOnTop:true, width:400, height:200})
    win.on('close', function(){win = null})
    win.loadURL(modalPath)
    win.show()
})

ipc.on('targetVal', function(event, arg){
    targetVal = Number(arg)
    target.innerHTML = '$'+targetVal.toLocaleString('en')
})