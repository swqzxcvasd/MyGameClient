





var LoginScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new LoginFrame();
        this.addChild(layer);
    }
});

var RoomScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new RoomFrame();
        this.addChild(layer);
    }
});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameFrame();
        this.addChild(layer);
    }
});

