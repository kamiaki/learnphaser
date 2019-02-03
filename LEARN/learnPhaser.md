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

### 瓦片地图对象

```javascript
//使用 tiled 软件
//preload
game.load.tilemap('mario_map','res/mario.json',null,Phaser.Tilemap.TILED_JSON);
game.load.image('mario','res/mario.png');

//create
var map = game.add.tilemap('mario_map');
map.addTilesetImage('mario', 'mario');		//1 合集图片名称 2加载图片名称
var layer = map.createLayer('world');		//tiled 图层名

var tile = map.getTile(0, 24);			//指定位置获取瓦片
map.putTile(tile, 0, 0);				//指定位置填充
map.fill(12,0,0,20,20);					//指定位置填充 1瓦片资源上索引
var tiles = map.copy(0,19,5,5);			//复制和粘贴
map.paste(0,0, tiles);					//复制和粘贴
map.replace(1,12,0,0,10,10);	//替换不填替所有 1替换的瓦片 2用哪个瓦片替换

////////碰撞//////////////////
var player;
var cursors;
var layer;
//preload
game.load.tilemap('mario_map', 'res/mario.json',null,Phaser.Tilemap.TILED_JSON);
game.load.image('mario','res/mario.png');
game.load.image('player','res/player.png');//玩家
//create
var map = game.add.tilemap('mario_map');
map.addTilesetImage('mario', 'mario');//1 合集图片名称 2加载图片名称
layer = map.createLayer('world');//tiled 图层名
layer.resizeWorld();//调整世界大小为地图大小

map.setCollisionBetween(15,16); //设置碰撞的图范围 资源图索引
map.setCollisionBetween(20,25);
map.setCollisionBetween(27,29);
map.setCollision(40);   //设置碰撞的图 资源图索引

game.physics.startSystem(Phaser.Physics.ARCADE);//系统开启物理引擎
player = game.add.sprite(32, 32, 'player');
game.physics.enable(player);//对象开启物理引擎
game.physics.arcade.gravity.y = 250;//添加重力
player.body.bounce.y = 0.2;//添加弹性
game.camera.follow(player);//镜头跟随

cursors = game.input.keyboard.createCursorKeys();//键盘交互
//update
game.physics.arcade.collide(player, layer);//碰撞检测
player.body.velocity.x = 0;//x轴速度0
if(cursors.up.isDown){
    if(player.body.onFloor()){
        player.body.velocity.y = -250;
    }
}
if(cursors.right.isDown){
    player.body.velocity.x = 250;
}
if(cursors.left.isDown){
    player.body.velocity.x = -250;
}
```



## 动画

### 补间动画

```javascript
//补间动画: 改变的属性 动画时间 动画模式 是否已开始就开始 延时 重复次数 反向
tween.to({y:300}, 2000, Phaser.Easing.Bounce.Out,true,0,100,true);
tween.start();//开始
tween.stop();//停止
tween.pause();//暂停
tween.resume();//恢复
```

### 逐帧动画

```javascript
game.load.spritesheet('sprite', 'res/a1.png', 32, 32);		//加载精灵图
var sprite = game.add.sprite(110,110,'sprite');				//添加精灵图
sprite.animations.add('animation1',[0,1,2]);				//添加动画
sprite.play('animation1',10,true);							//播放动画
sprite.stop('animation1');									//停止动画
```

### Atlas动画

```javascript
//shoebox下载网址
http://renderhjs.net/shoebox/
game.load.atlasXML('man','res/r.png','res/r.xml');		//加载精灵图
var man = game.add.sprite(10,10,'man');					//添加精灵图
man.animations.add('animation1',[0,1]);					//添加动画
man.animations.add('animation1',['r1.png','r2.png']);	 //添加动画
man.play('animation1' , 30, true);						//播放动画
man.stop('animation1');									//停止动画
```

### 粒子动画

```javascript
//粒子发射器 x,y,最大粒子数
var emitter = game.add.emitter(100, 100, 50);
emitter.makeParticles('cat');
emitter.setXSpeed(10,100);				//速度介于之间
emitter.setYSpeed(10,100);				//速度介于之间
emitter.setScale(0,1,0,1,3000);			//x,y缩放最小最大值,3秒过度
emitter.setAlpha(0, 1, 3000);			//最后还有缓动函数
emitter.setRotation(0,90);				//旋转
//一次性发射所有粒子,生存时间,间隔时间,多少粒子需要发射
emitter.start(false, 3000, 1000, 100);

//发射多个物体
emitter.makeParticles('man', [0,1]);
emitter.flow(3000,1000, 10, -1);//持续时间,间隔时间,每次发射多少,总共少-1无数

//粒子发射器 x,y,最大粒子数
emitter = game.add.emitter(100, 100, 50);
emitter.makeParticles('cat','',1000,true,true);//最后1粒子碰撞2粒子世界碰撞
emitter.gravity = 600;
emitter.bounce.y = 0.8;
emitter.flow(0,3000, 1, -1);//持续时间0不消失,间隔时间,每次发射多少,总共少-1无数
game.physics.arcade.collide(emitter);//update

```



------

## 交互输入

### 事件系统

```javascript
game.onBlur.add(function () {});    //失去焦点
game.onFocus.add(function () {});   //得到焦点
game.onPause.add(function () {});   //暂停事件
game.onResume.add(function () {});  //恢复事件

game.scale.onfullscreenchange       //退出全屏
game.scale.onorientationchange      //横竖屏切换
game.scale.onSizeChange             //尺寸改变

game.load.onFileComplete    //加载完成时
game.load.onFileError       //加载失败
game.load.onFileStart       //开始加载
game.load.onLoadComplete    //所有资源加载完成

var tween = game.add.tween();
tween.onStart       //补间动画开始时
tween.onComplete    //动画完成
tween.onLoop        //动画循环
tween.onRepeat      //动画重复

var animation = new Phaser.Animation();
animation.onStart       //补间动画开始时
animation.onComplete    //动画完成
animation.onLoop        //动画循环
animation.onUpdate      //动画帧变化

```



### 键盘交互

```javascript
var keyboard = game.input.keyboard;//获取键盘对象
keyboard.addCallbacks(context, onDown, onUp, onPress);//添加按键回调
var key = keyboard.addKey(keycode);//创建一个键对象 返回Phaser.Key
key.isDown      //按下判断
key.isUp        //释放判断
key.onDown      //按下signal对象
key.onUp        //释放signal对象
key.altKey      //同时alt判断
key.ctrlKey     //同时ctrl判断
key.shiftKey    //同时shift判断
keyboard.createCursorKeys();//创建一个包含上下左右方向键的对象
var keys = game.input.keyboard.createCursorKeys();	//监听键盘对象
if(keys.right.isDown){}；						//如果键盘右按下，执行函数

//键盘移动 实例
//create
sprite = game.add.sprite(300, 300, 'cat');//创建精灵
upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
//update
//这么写可以保证斜向上方移动
if(upKey.isDown){
    sprite.y--;
}
else if (downKey.isDown){
    sprite.y++;
}
if (leftKey.isDown){
    sprite.x--;
}
else if (rightKey.isDown){
    sprite.x++;
}

```

### 鼠标点击交互

```javascript
game.input.onDown   //按下事件
game.input.onUp     //离开事件
game.input.onTap    //轻击事件
game.input.onHold   //长按事件

game.input.addMoveCallback(callback, context);      //鼠标手指移动监听
game.input.deleteMoveCallback(callback, context);   //删除监听

var pointer = game.input.activePointer; //鼠标和手指 指针事件
pointer.clientX     //事件发生时指针x坐标
pointer.clientY     //事件发生时指针y坐标
pointer.isDown      //指针按下
pointer.isUp        //指针释放

var mouse = game.input.mouse;//鼠标对象
mouse.mouseWheelCallback//设置鼠标滚动
mouse.wheelDelta//1上上滚 -1向下滚

var mousePointer = game.input.mousePointer;//鼠标定制对象
mousePointer.leftButton //鼠标左键
mousePointer.middleButton//鼠标中键
mousePointer.rightButton//鼠标右键

//实例 画笔实例 create里
var graphics = game.add.graphics(0,0);
function draw() {
    var pointer = game.input.activePointer;
    graphics.drawCircle(pointer.x,pointer.y,10);
}
game.input.onDown.add(function () {
    graphics.beginFill(0xffffff);
    draw();
    game.input.addMoveCallback(draw);
});
game.input.onUp.add(function () {
    game.input.deleteMoveCallback(draw);
});
```



## 音频

### 普通音频

```javascript
game.load.audio('foo','res/music.mp3');
var sound = game.add.audio('foo');
sound.play();
```



## 物理引擎

```javascript
game.physics.startSystem(Phaser.Physics.ARCADE);//开启物理引擎

```

