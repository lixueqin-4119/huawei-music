class Swiper {
    constructor(node) {
        if (!node) throw new Error('需要传递需要绑定的DOM元素')
        let root = typeof node === 'string' ? document.querySelector(node) : node
        let eventHub = { 'swipLeft': [], 'swipRight': [] }

        let initX
        let newX
        let clock
        root.ontouchstart = function (e) {
            initX = e.changedTouches[0].pageX
        }
        root.ontouchmove = function (e) {
            if (clock) clearInterval(clock)
            clock = setTimeout(() => {
                newX = e.changedTouches[0].pageX
                if (newX - initX > 5) {
                    eventHub['swipRight'].forEach(fn => fn.bind(root)())
                } else if (initX - newX > 5) {
                    eventHub['swipLeft'].forEach(fn => fn.bind(root)())
                }
            }, 100)
        }
        this.on = function (type, fn) { //this是将创建的swiper对象
            if (eventHub[type]) {
                eventHub[type].push(fn)
            }
        }
        this.off = function (type, fn) {
            let index = eventHub[type].indexOf(fn)
            if (index != -1) {
                eventHub[type].slice(index, 1)
            }
        }
    }
}

/*
使用封装的库
let swiper = new Swiper('panels') //传参
swiper.on('swipLeft', () => {
    console.log('left')
})
swiper.on('swipRight', () => {
    console.log('right')
})
let onLeft = () => console.log('left2')
swiper.onLeft('swipLeft', onLeft)
*/

export default Swiper