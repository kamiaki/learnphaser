var loaderState = function (game) {
    this.init = function () {
        var sprite = game.add.image(game.world.centerX,game.world.centerY,'loading');
        sprite.anchor = {x:0.5,y:0.5};
        progressText = game.add.text(game.world.centerX,game.world.centerY+30,'0%',{fill:'#fff',fontSize:'16px'});
        progressText.anchor = {x:0.5,y:0.5 };
    };
    this.preload = function () {
        game.load.image('a1','res/a1.png');
        game.load.image('a2','res/a2.png');
        game.load.image('a3','res/a3.png');
        game.load.image('a4','res/a4.png');
        game.load.image('a5','res/a5.png');
        game.load.image('a6','res/a6.png');
        game.load.image('a7','res/a7.png');
        game.load.image('a8','res/a8.png');
        game.load.image('a9','res/a9.png');
        game.load.image('girl','res/girl.png');
        game.load.audio('sound1','res/music.mp3');

        game.load.onFileComplete.add(function () {
            var progress = game.load.progress;//1表示1% 100表示
            progressText.text = progress + '%';
            console.info(progress + "%");
        });
    }
}