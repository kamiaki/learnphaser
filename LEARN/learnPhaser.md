# Phaser手册

## 小技巧

```javascript
game.world.centerX	game.world.centerY	//获取世界中心
```



------

## 创建游戏

### 创建游戏对象

```javascript
var game = new Phaser.Game(800,600,Phaser.CANVAS,'div_phaser');

game.paused = true;		//暂停
game.paused = false;	//暂停结束

game.add;		//对象工厂
game .sound;	//声音
game.camera;	//摄像机
game.input;		//交互
game.load;		//资源加载
game.scale;		//缩放
game.stage;		//舞台
game.world;		//世界
game.particles;	//粒子
game.physics;	//物理引擎
game.state;		//场景管理
```

### 场景

```javascript
var state = {
    init    : function () {},
    preload : function () {},
    create  : function () {},
    update  : function () {},
    render  : function () {}
}
function state() {
    this.init = function(){},
    this.preload = function(){},
    this.create = function(){},
    this.update = function(){},
    this.render = function(){}
}
game.state.add('state1',state);
game.state.start('state1');
```

### 加载资源

```javascript
//单个资源加载完成事件
game.load.onFileComplete.add(function () {
    var progress = game.load.progress;	//1表示1% 100表示
})
//所有资源加载完成事件
game.load.onLoadComplete.add(function () {
})

 //加载图片
game.load.image('loading','res/preload.png');

```

### 舞台场景摄像机

```javascript
game.stage.setBackgroundColor(0xff0000);	//设置舞台颜色
game.world.setBounds(0, 0, 2000, 2000);		//设置世界大小

game.camera.x = 0;	//摄像机x移动
game.camera.y = 0;	//摄像机y移动
game.camera.focusOn(object);		//摄像机定位到某个对象上
game.camera.focusOnXY(1000,1000);	//摄像机定位到某个点上
game.camera.follow(object);			//摄像机跟随某个对象移动

```

### 缩放

```javascript
game.scale.pageAlignHorizontally = true;    //水平居中
game.scale.pageAlignVertically = true;      //垂直居中

game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;   //缩放到父元素大小
game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;   //保持比例,缩放到父元素大小
game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;   //自定义
game.scale.setUserScale(0.1,0.1);                       //设置自定义缩放比例

```



------

## 添加精灵

```javascript
game.add.image(0,0,'backgroud');	//加载一张图片
```



------

## 交互输入

### 键盘交互

```javascript
var keys = game.input.keyboard.createCursorKeys();	//监听键盘对象
if(keys.right.isDown){}；						//如果键盘右按下，执行函数


```

### 鼠标点击

```javascript
game.input.onDown.add(function () {});	//鼠标单击
```

