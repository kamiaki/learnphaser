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
game.load.bitmapFont('font','res/font.png','res/font.fnt');	//加载文字图片
```

### 图片对象

```javascript
//添加精灵图，和第一帧的精灵图
var image = game.add.image(0,0,'backgroud');
var image = game.add.image(10,10,'sprite' , 0);	
```

### 画板对象

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

### 按钮对象

```javascript
//添加了一个按钮
game.add.button(100,250,'sprite',function () {
    console.info('点了按钮');
}, game, 0,3,6,9);		
```

### 精灵对象

```javascript
var sprite = game.add.sprite(100,100,'cat');	//添加一个精灵
//改变xy坐标的3种方法
sprite.x = 150;
sprite.y = 150;
sprite.position.x = 200;
sprite.position.y = 200;
sprite.position.set(300, 300);
//设置锚点的2种方法
sprite.anchor.x = 0.5;
sprite.anchor.y = 0.5;
sprite.anchor.set(0.5, 0.5);
//设置精灵的宽高
sprite.width = 50;
sprite.height = 150;

sprite.alpha = 0.5;		//设置透明度
sprite.angle = 90;		//旋转角度
sprite.scale.x = 2;		//x缩放
sprite.scale.y = 2;		//y缩放
sprite.visible = true;	//是否可见
sprite.exists = true;	//不可见不处理,提高性能
sprite.tint = 0x0000ff;	//染色
```

### 遮罩对象

```javascript
//遮罩
var bg = game.add.image(0,0,'backgroud');
var graphics = game.add.graphics(0,0);
graphics.beginFill(0x123456);
var circle = graphics.drawCircle(150,250,200);
bg.mask = circle;
```

### 瓦片精灵

```javascript
//瓦片精灵
var tilesprite = game.add.tileSprite(100,100,400,400,'cat');
tilesprite.autoScroll(-20,0);	//滚动
```

### 文字对象

```javascript
//添加文字
var text = game.add.text(60,60,'你好世界',{fill : '#fff'});
text.font = '宋体';						//设置样式方法1 字体
text.fontsize = 60;						//字号
text.fontWeight = 'normal';				//粗细
text.style.backgroundColor = '#0f0';	//设置样式方法2 背景色
text.stroke = '#f00';					//描边
text.strokeThickness = 10;				//描边粗细
text.wordWrap = true;					//自动换行 英文
text.wordWrapWidth = 150;				//自动换行

//添加外部字体 先引入
<style>
    @font-face {
        font-family: 'fzhyt';
        src: url("res/活一体字体.TTF");
    }
</style>
<h1 style="font-family: fzhyt">LearnPhaser</h1>	//激活字体 最好隐藏
text.font = 'fzhyt';						//添加外部字体
```

#### 在线字体工具

```javascript
http://kvazars.com/littera/
game.load.bitmapFont('font','res/font.png','res/font.fnt');		//加载资源
var text = game.add.bitmapText(10,10,'font','测字',130);		//添加资源
```

### 分组对象

```javascript
var group = game.add.group();		//创建分组
cat = game.add.image(400,400,'cat','',group);	//创建精灵时候就添加进分组
group.add(cat);								//分组中添加精灵
group.create(20,20,'cat');					//创建精灵同时添加进分组
group.create(50,90,'cat');
group.alpha = 0.5;						//设置组属性
group.x = 100;
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

