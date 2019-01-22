var bootState = function (game) {
    this.preload = function () {
        game.load.image('loading','res/preload.png');
    }
    this.create = function () {
        game.state.start('loader');
    }
}