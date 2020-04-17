class WalkingDog {
    constructor(canvas) {
        // 宽度为浏览器的可视宽度
        canvas.width = window.innerWidth;
        canvas.height = 200;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.dogPictures = [];
        // 图片目录
        this.IMG_PATH = "./images";
        this.IMG_COUNT = 8;
        // 当前画的图片索引
        this.keyFrameIndex = -1;
        // 记录上一帧的时间
        this.lastWalkingTime = Date.now();
        this.dog = {
            // 一步10px
            stepDistance: 10,
            // 狗的速度
            speed: 0.15,
            // 鼠标的x坐标
            mouseX: -1,
            // 往前走停留的位置
            frontStopX: -1,
            // 往回走停留的位置,
            backStropX: window.innerWidth
        };
        this.currentX = 0;
    }

    /**
     * 初始化函数
     */
    async init() {
        // 等待资源加载完
        await this._loadResources();
        // 获取图片（<img>元素）的原始大小: NaturalWidth and NaturalHeight
        this.pictureWidth = this.dogPictures[0].naturalWidth / 2;
        // 
        this.recordMousePosition();
        // 画逐帧动画，给下一帧注册一个函数
        // 告诉浏览器你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。
        // 当你准备更新动画时你应该调用此方法。这将使浏览器在下一次重绘之前调用你传入给该方法的动画函数(即你的回调函数)。回调函数执行次数通常是每秒60次
        // bind(this): 让walk()函数的执行上下文还是指向当前类的实例
        window.requestAnimationFrame(this._walk.bind(this));
    }
    /**
     * 加载静态资源
     */
    _loadResources() {
        let imagePath = [];
        for (let i = 0; i <= this.IMG_COUNT; i++) {
            imagePath.push(`${this.IMG_PATH}/${i}.png`);
        }

        let works = [];
        imagePath.forEach(imgSrc => {
            works.push(
                new Promise(resolve => {
                    let img = new Image();
                    img.onload = function() {
                        resolve(img);
                    };
                    img.src = imgSrc;
                })
            );
        });
        // 这里再套一个Promise是为了让调用者能够知道处理好了
        return new Promise(resolve => {
            // 借助Promise.all知道了所有图片都加载好了
            Promise.all(works).then(dogPictures => {
                this.dogPictures = dogPictures;
                resolve();
            });
        });
    }
    /**
     * 小狗走动效果
     */
    _walk() {
        let now = Date.now();
        let interval = now - this.lastWalkingTime; // 距离上次渲染的时间间隔

        // 绘制狗的图片，每过100ms就画一张
        if (interval > 100) {
            // 清空画布

            // 获取下一张图片的索引
            this.keyFrameIndex = ++this.keyFrameIndex % this.IMG_COUNT;
            let direct = -1, // 方向，1：正，-1：负
                stopWalking = false;

            // 如果鼠标在狗的前面则往前走
            if (this.dog.frontStopX > this.dog.mouseX) {
                direct = 1;
            } else if (this.dog.backStropX < this.dog.mouseX) {
                // 如果鼠标在狗的后面则往回走
                direct = -1;
            } else {
                // 如果鼠标在狗身上
                stopWalking = true;
                // 如果鼠标在小狗图片中间的右边，则direct为正，否则为负
                direct =
                    this.dog.backStropX - this.dog.mouseX > this.pictureWidth / 2 ? 1 : -1;
                this.keyFrameIndex = -1;
            }
            // 如果小狗没有停，计算位置的时候乘以direct
            if (!stopWalking) {
                this.dog.mouseX += this.dog.stepDistance * direct;
            }

            // 清掉上一次画的内容
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.save();

            // 反方向的由于没图片，我们通过canvas的翻转flip进行绘制
            if (direct === -1) {
                // 左右翻转绘制
                this.ctx.scale(direct, 1);
            }

            let img = this.dogPictures[this.keyFrameIndex + 1];
            let drawX = 0;
            // 左右翻转绘制的位置需要计算一下
            drawX =
                this.dog.mouseX * direct - (direct === -1 ? this.pictureWidth : 0);

            // 如果移动的距离小于小狗一步的距离，则不更新下一张图片
            let distance = interval * this.dog.speed;
            if (distance < this.dog.stepDistance) {
                window.requestAnimationFrame(this._walk.bind(this));
                return;
            }

            this.ctx.drawImage(
                img,
                0,
                0,
                img.naturalWidth,
                img.naturalHeight,
                drawX,
                16,
                img.naturalWidth / 2,
                img.naturalHeight / 2
            );

            this.ctx.restore();

            this.lastWalkingTime = Date.now();
        }

        window.requestAnimationFrame(this._walk.bind(this));
    }
    /**记录鼠标当前位置的x坐标 */
    recordMousePosition() {
        window.addEventListener("mousemove", e => {
            // 如果没减掉图片的宽度，小狗就跑到鼠标后面去了，因为图片的宽度还要占去空间
            this.dog.frontStopX = e.clientX - this.pictureWidth;
            this.dog.backStropX = e.clientX;
        });
    }
}
