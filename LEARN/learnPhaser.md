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

## 显示对象

### 加载舞台对象

```javascript
game.load.image('loading','res/preload.png');			//加载图片
game.load.spritesheet('sprite', 'res/a1.png', 32, 32);	//加载精灵图
```

### 添加舞台对象

```javascript
var image = game.add.image(0,0,'backgroud');	//添加一张图片
var image = game.add.image(10,10,'sprite' , 0);	//添加精灵图的第一帧

game.add.button(100,250,'sprite',function () {
    console.info('点了按钮');
}, game, 0,3,6,9);							//添加了一个按钮
```

### 添加画板

```javascript
var graphics = game.add.graphics(100,100);  //图形对象画板

graphics.beginFill(0xff0000);   			//图形填充 2透明度
graphics.endFill();							//填充结束
graphics.lineStyle(5,0x0000ff);   			//描边
graphics.clear();  						 //清除，并重置填充和描边

graphics.drawRect(0,0,100,100);            //矩形
graphics.drawCircle(180,100,100);          //圆
graphics.drawEllipse(150,220,100,50);       //椭圆
graphics.drawPolygon(50,380,200,380,250,430,180,480,20,450); //多边形
graphics.arc(100,300,50,0,Math.PI);                 		//弧形
graphics.drawRoundedRect(500,100,40,40,30);     //圆角矩形

graphics.moveTo(800,0);              	//直线起点
graphics.lineTo(400,600);              //直线重点

graphics.moveTo(300,500);              				//曲线起点
graphics.bezierCurveTo(700,600,600,500,300,200);    //曲线：控制点1，控制点2，重点
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

