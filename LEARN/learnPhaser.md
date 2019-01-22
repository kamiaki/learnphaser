# Phaser手册

## 小技巧

```javascript
game.world.centerX	game.world.centerY//获取世界中心
```



## 创建游戏

### 创建游戏对象

```javascript
var game = new Phaser.Game(800,600,Phaser.CANVAS,'div_phaser');

game.paused = true;//暂停
game.paused = false;//暂停结束

game.add;//对象工厂
game .sound;//声音
game.camera;//摄像机
game.input;//交互
game.load;//资源加载
game.scale;//缩放
game.stage;//舞台
game.world;//世界
game.particles;//粒子
game.physics;//物理引擎
game.state;//场景管理
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
    var progress = game.load.progress;//1表示1% 100表示
})
//所有资源加载完成事件
game.load.onLoadComplete.add(function () {
})

 //加载图片
game.load.image('loading','res/preload.png');

```

