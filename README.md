
# Phaser手册

[Phaser手册](#phaser手册)

- [小技巧](#小技巧)
- [创建游戏](#创建游戏)
  - [创建游戏对象](#创建游戏对象)
  - [场景](#场景)
  - [加载资源](#加载资源)
  - [舞台场景摄像机](#舞台场景摄像机)
  - [缩放](#缩放)
- [显示对象](#显示对象)
  - [加载舞台对象](#加载舞台对象)
  - [图片对象](#图片对象)
  - [画板对象](#画板对象)
  - [图形对象](#图形对象)
  - [按钮对象](#按钮对象)
  - [精灵对象](#精灵对象)
  - [遮罩对象](#遮罩对象)
  - [瓦片精灵](#瓦片精灵)
  - [文字对象](#文字对象)
    - [在线字体工具](#在线字体工具)
  - [分组对象](#分组对象)
    - [对象池](#对象池)
  - [瓦片地图对象](#瓦片地图对象)
  - [子弹对象](#子弹对象)
- [动画](#动画)
  - [补间动画](#补间动画)
  - [逐帧动画](#逐帧动画)
  - [Atlas动画](#atlas动画)
  - [粒子动画](#粒子动画)
- [交互输入](#交互输入)
  - [事件系统](#事件系统)
  - [键盘交互](#键盘交互)
  - [鼠标点击交互](#鼠标点击交互)
  - [特定对象交互](#特定对象交互)
  - [边界检测事件](#边界检测事件)
- [音频](#音频)
  - [载入音频](#载入音频)
  - [普通音频](#普通音频)
  - [音频事件](#音频事件)
- [物理引擎](#物理引擎)
  - [开启物理引擎](#开启物理引擎)
  - [计算工具](#计算工具)
  - [碰撞检测](#碰撞检测)
- [调试相关](#调试相关)
  - [调试](#调试)

## 小技巧

```javascript
//游戏画布尺寸
var width = game.width,
var height = game.height;

//获取世界中心
game.world.centerX
game.world.centerY

//随机坐标
game.world.randomX
game.world.randomY

//判断是桌面还是手机
if(game.device.desktop){console.info('桌面');}
else{console.info('手机');}

//判断横屏还是竖屏
if(game.scale.isLandscape){ console.info('//横屏') }
else{ console.info('//竖屏') }

//设置全屏世界
var width = window.innerWidth;
var height = window.innerHeight;

//随机生成让那个 min 到 max 的数字
game.rnd.between(60,150 - 60);
```



------

## 创建游戏

### 创建游戏对象

```javascript
var game = new Phaser.Game(800,600,Phaser.CANVAS,'div_phaser');

game.paused = true;		//暂停
game.paused = false;	//暂停结束

game.add;		//对象工厂
game.sound;		//声音
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
game.load.onLoadComplete.add(function () {});

///////////////////////////////////进度条以图片方式展示实例
var boot = function() {
    this.preload = function() {
        game.load.image('loading', 'res/方块.png');
    }
    this.create = function() {
        game.state.start('preload');
    }
}
var preload = function() {
    this.preload = function() {
        var preloadSprite = game.add.sprite(game.width / 2, game.height / 2, 'loading');
        preloadSprite.anchor.setTo(0.5, 0.5);
        //用setPreloadSprite方法来实现动态进度条的效果，preloadSprite为load的精灵
        game.load.setPreloadSprite(preloadSprite);
        game.load.audio('foo','res/music.mp3');
        game.load.audio('aaa','res/music.mp3');
        game.load.audio('bbb','res/music.mp3');
    }
    this.create = function() {
    }
}
game.state.add('state1',boot);
game.state.add('preload',preload);
game.state.start('state1');
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

//	产生一个相机拍摄闪烁效果
//	color指flash效果的颜色，默认0xffffff
//	duration指效果持续时间，默认500ms
//	force默认false，值为true时，如果当前存在一个camera flash效果在运行，则新的效果代替原来的并重置持续时间
flash(color,duration,force);

//	产生一个相机拍摄抖动效果
//	intensity指抖动强度，默认0.05
//	duration指持续时间，默认500ms
//	force默认true，值为true时，如果当前存在一个camera shake效果在运行，则新的效果代替原来的并重置持续时间
//	direction指抖动方向，默认Phaser.Camera.SHAKE_BOTH，还有Phaser.Camera.SHAKE_HORIZONTAL 或 Phaser.Camera.SHAKE_VERTICAL
//	shakeBounds默认值为true，抖动效果是否超出边界
shake(intensity, duration, force, direction, shakeBounds);
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
graphics.lineTo(400,600);              //直线终点

graphics.moveTo(300,500);              				//曲线起点
graphics.bezierCurveTo(700,600,600,500,300,200);    //曲线：控制点1，控制点2，终点

//绘制大地实例
var land = game.add.graphics(0,game.height -127/2);
land.beginFill(0xce9424);
land.moveTo(0,0);
land.lineTo(game.width, 0);
land.lineTo(game.width, game.height);
land.lineTo(0,game.height);
```

### 图形对象

```javascript
//基本图形 限定范围之类的用
var line = new Phaser.Line(0,0,120,120);
var circle = new Phaser.Circle(game.world.centerX,100,64);
var rect = new Phaser.Rectangle(x,y,width,height);
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

//对组中的物体全部设置属性
redgroup.setAll('checkWorldBounds',true);
//对组中的物体全部调用函数
redgroup.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.fRemoveRedpack);
//设置组中所有物体的anchor为0.5,1.0
redgroup.callAll('anchor.setTo', 'anchor', 0.5, 1.0);
```

#### 对象池

```javascript
//总体思路就是:池子中一共有8个,没了一个.就把那个没的重置.
//在create里
group = game.add.group();
group.enableBody = true;
group.createMultiple(8,'rect2');                //池子中一共8个
group.setAll('checkWorldBounds',true);
group.setAll('outOfBoundsKill',true);           //超出边界销毁
game.time.events.loop(300,this.poolfun,this);   //定时将组中对象重置

//新建一个函数
this.poolfun = function(){
    var item = group.getFirstExists(false);				//取出第一个不存在的
    var left = game.rnd.between(60, 90);       	//随机一个出现的x坐标
    if(item){
        item.reset(left,0);         //由于有超出边界检测，所以不能设置y为负值
        item.scale.set(0.5);
        item.body.velocity.y = 300;
        item.checkWorldBounds = true;	//判断出界
        item.outOfBoundsKill = true;	//出界杀死
    }
}

//更高级的用法 实例 
//一开始不创建精灵，需要用到的时候在创建。然后复用
function state() {
    this.preload = function(){
        game.load.image('rect3','res/紫方块1.png');			//加载图片
    },
        this.create = function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        group = game.add.group();
        game.time.events.loop(100,this.pool,this);	
    },
        this.pool = function(){
        var oldItem = group.getFirstExists(false);	//取第一个不存在的
        if(oldItem){
            this.setPhysics(oldItem);		//取到设置属性复用
        }else{
            var newItem = game.add.sprite(null, null, 'rect3');	//没取到就新建加入组
            game.physics.enable(newItem, Phaser.Physics.ARCADE);
            this.setPhysics(newItem);
            group.add(newItem);
        }
    },
        this.setPhysics = function (obj) {
        var left = game.rnd.between(60, 90);
        obj.reset(left, 0);
        obj.scale.set(0.5);
        obj.body.velocity.y = 300;
        obj.checkWorldBounds = true;
        obj.outOfBoundsKill = true;
    }
}
```

### 瓦片地图对象

```javascript
//使用 tiled 软件
//preload
game.load.tilemap('mario_map','res/mario.json',null,Phaser.Tilemap.TILED_JSON);
game.load.image('mario','res/mario.png');

//create
var map = game.add.tilemap('mario_map');
map.addTilesetImage('mario', 'mario');		//1去掉扩展名的文件名 2加载图片名称key
var layer = map.createLayer('world');		//tiled 图层名 必须定义

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

map.setCollisionBetween(15,16,true,'world'); //设置碰撞的图范围 资源图索引
map.setCollisionBetween(20,25,true,'world');
map.setCollisionBetween(27,29,true,'world');
map.setCollision(40,true,'world');   //设置碰撞的图 资源图索引

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

### 子弹对象

```javascript
//	返回一个Phaser.Weapon对象，weapon提供了一个创造子弹库的能力;
weapon(quantity, key, frame, group);
//	quantity默认为1,weapon产生子弹的数量，值为-1时可自动扩展；
//	key指子弹的图像；
//	frame指被用作子弹图像的帧ID或frame name；
//	group指weapon添加至哪个组

//	Phaser.Weapon 
//	bulletAngleOffset：返回一个number类型，发射子弹的角度偏移
//	bulletAngleVariance：返回一个number类型，子弹发射角度的偏差
//	bulletSpeed：返回一个number类型，子弹发射的速度，pixels/s
//	fire(from,x,y)：返回Phaser.Bullet对象，尝试发射单颗子弹，如果子弹库中没有子弹且子弹库不可扩展，则返回false，如果距离上一次发射子弹时间过短也返回false
//	fireAngle：返回一个integer类型，子弹发射角度

//	返回一个Phaser.Weapon对象，使weapon追踪给定的sprite或world中的对象，
trackSprite(sprite, offsetX, offsetY, trackRotation);
//	sprite指给定的追踪对象，即发射子弹的对象;
//	offsetX指sprite与weapon间的水平偏移，默认为0;
//	offsetY指sprite与weapon间的垂直偏移，默认为0;
//	trackRotation默认为false，指是否应该追踪sprite的旋转;
//	调用该函数时会重置Weapon.trackedPointer为null;
```



------

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
//最后两个参数(true,true):	1.粒子间碰撞 2.粒子与世界碰撞
emitter.makeParticles('cat','',1000,true,true);
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

//定时器
game.time.events.loop(300,callback,this);
```



### 键盘交互

```javascript
//方法一
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

//方法二
keyboard.createCursorKeys();//创建一个包含上下左右方向键的对象
var keys = game.input.keyboard.createCursorKeys();	//监听键盘对象
if(keys.right.isDown){}；						//如果键盘右按下，执行函数

//键盘移动 实例（方法一）
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

var mouse = game.input.mouse;	//鼠标对象
mouse.mouseWheelCallback;		//设置鼠标滚动
mouse.wheelDelta;				//1上上滚 -1向下滚

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

### 特定对象交互

```javascript
var sprite = game.add.sprite(10,10,'sprite');
sprite.inputEnabled = true;				//开启输入事件
sprite.input.useHandCursor = true;		//鼠标放上去变成手的形状
var events = sprite.events;				//获取events对象
events.onInputDown.add(function () {});		//点击
events.onInputUp.add(function () {});		//释放
events.onInputOver.add(function () {});		//进入
events.onInputOut.add(function () {});		//离开

var sprite = game.add.sprite(10,10,'sprite');
sprite.inputEnabled = true;			//开启输入事件
var inputHandler = sprite.input;
inputHandler.enableDrag();  //能拖动
inputHandler.disableDrag(); //禁止拖动
inputHandler.pointerOver(); //判断指针是否在内
inputHandler.pointerX();    //判断指针相对对象x位置
inputHandler.pointerY();    //判断指针相对对象y位置
inputHandler.bringToTop;    //拖动时自动放置最顶层

//拖动实例
player.inputEnabled = true;
player.input.allowVerticalDrag = false;					//只能水平方向上拖动
var dragRect = new Phaser.Rectangle(0,0,gWidth,gHeight);
player.input.enableDrag(false,false,false,255,dragRect);	//不能超出范围
```

### 边界检测事件

```javascript
sprite.checkWorldBounds = true;						//设置超出边界检测
sprite.events.onEnterOfBounds.add(callback,this);	//对精灵进入边界进行处理
sprite.events.onOutOfBounds.add(callback,this);		//对精灵离开边界进行处理

sprite.checkWorldBounds = true;		//必须开启checkWorldBound为true
sprite.outOfBoundsKill = true;		//超出边界后自动kill，包括上下左右任意边界
```



------

## 音频

### 载入音频

```javascript
game.load.audio('foo','res/music.mp3');								//加载音频
game.load.audio('foo', ['res/music.mp3', 'res/music.wav']);			//加载数组
game.load.audiosprite(key, urls, jsonURL?, jsonData?, autoDecode?);		//片段
```

### 普通音频

```javascript
var sound = game.add.audio('foo');
//播放 播放标注的那段,标注位置,音量(0~1),循环,强制重新开始
sound.play(marker, position, volume, loop, forceRestart);
sound.pause();//暂停
sound.resume();//恢复
sound.stop();//停止
  
//淡入淡出效果
sound.fadeIn(duration, loop, marker);	//淡入淡出时间,循环,标记那段
sound.fadeOut(duration);				//时间
sound.fadeTo(duration, volume);			//时间,制定音量(0~1)
```

### 音频事件

```javascript
sound.onPlay.add(function () {});			//播放时
sound.onPause.add(function () {});			//暂停
sound.onResume.add(function () {});			//恢复
sound.onStop.add(function () {});			//停止
sound.onFadeComplete.add(function () {});	//淡入淡出完成
sound.onMarkerComplete.add(function () {});	//标记播放完
sound.onLoop.add(function () {});			//循环时
sound.onMute.add(function () {});			//静音时
```



------

## 物理引擎

### 开启物理引擎

```javascript
//开启物理引擎
game.physics.startSystem(Phaser.Physics.ARCADE);

//组开启物理引擎
var group = game.add.group();
group.enableBody = true;
group.physicsBodyType = Phaser.Physics.ARCADE;
group.setAll('body.bounce', new Phaser.Point(0.5, 0.5));//每个元素设置

//在精灵对象上开启物理引擎
game.physics.enable(sprite, Phaser.Physics.ARCADE);
//设置速度属性
sprite.body.velocity = new Phaser.Point(100, 100);
sprite.body.velocity.set(100);
sprite.body.velocity.x = 100;
sprite.body.velocity.y = 100;
//设置加速度属性
sprite.body.acceleration = new Phaser.Point(100, 100);
sprite.body.acceleration.set(100);
sprite.body.acceleration.x = 100;
sprite.body.acceleration.y = 100;
//设置角速度属性
sprite.body.angularVelocity = 90;
//设置角加速度
sprite.body.angularAcceleration = 45;
//设置阻力
sprite.body.drag = new Phaser.Point(-100, -100);
sprite.body.drag.set(100);
sprite.body.drag.x = 100;
sprite.body.drag.y = 100;
//设置重力
sprite.body.gravity = new Phaser.Point(100, 100);
sprite.body.gravity.set(100);
sprite.body.gravity.x = 100;
sprite.body.gravity.y = 100;
//设置弹力
sprite.body.bounce = new Phaser.Point(0.5, 0.5);
sprite.body.bounce.set(0.5);
sprite.body.bounce.x = 0.5;
sprite.body.bounce.y = 0.5;

//其他重要属性
sprite.body.friction.set(100);							//摩擦力
sprite.body.rotation = Math.PI;							//设置角度
sprite.body.immovable = true;							//固定不动
sprite.body.mass = 10;									//质量
sprite.body.maxVelocity.set(100, 100);					//最大速度
sprite.body.maxAngular = 1000;							//最大角速度
sprite.body.setSize(width, height, offsetX, offsetY);	//设置body大小
this.dragon.body.setCircle(this.dragon.width / 2);		//设置圆形物理轮廓
this.dragon.body.offset.set(0, 0);						//恢复一下偏移为0
sprite.body.reset(x, y);								//重置所有物理属性

//追踪效果
game.physics.arcade.moveToXY(sprite, x, y, speed);					//精灵移动到坐标值
game.physics.arcade.moveToObject(sprite, destination, speed);		//精灵移动到对象
game.physics.arcade.moveToPointer(sprite, speed, pointer);			//精灵移动到指针
game.physics.arcade.accelerateToXY(sprite, x, y, speed);			//精灵移动到坐标值
game.physics.arcade.accelerateToObject(sprite, destination, speed);	//精灵移动到对象
game.physics.arcade.accelerateToPointer(sprite, speed, pointer);	//精灵移动到指针

sprite.body.touching.down;	//判断有没有踩到东西上
sprite.body.allowGravity = false;		//有没有重力
sprite.body.collideWorldBounds = true;	//不出边界
```

### 计算工具

```javascript
//计算角度
game.physics.arcade.angleBetween(source, target);
game.physics.arcade.angleToPointer(displayObject, pointer);
game.physics.arcade.angleToXY(displayObject, x, y);
//计算距离
game.physics.arcade.distanceBetween(source, target);
game.physics.arcade.distanceToPointer(displayObject, pointer);
//计算速度
game.physics.arcade.computeVelocity(axis, body, velocity, acceleration, drag);
game.physics.arcade.velocityFromAngle(angle, speed, point);
```

### 碰撞检测

```javascript
//碰撞不产生物理效果
game.physics.arcade.overlap(sprite, sprite2, function () {});
//碰撞有真实效果 update里面调用
game.physics.arcade.collide(sprite, sprite2, function () {});

game.physics.arcade.collide(group1, group2);	//组与组的碰撞检测
game.physics.arcade.collide(group1);			//本组开启碰撞检测
```



------

## 调试相关

### 调试

```javascript
//game.debug.body 显示物体轮廓
this.render = function(){
    //对组中的每个物体开启物理轮廓
    group.forEach(function(item){
        game.debug.body(item);
    });
    game.debug.body(sprite);//对单个物体开启物理轮廓
    game.debug.text('debugText', 10, 30);//屏幕上显示一些调试文字
}
```
