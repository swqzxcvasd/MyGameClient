/**
 * Created by Administrator on 2016/10/1.
 */




//微信登陆页面
var GameFrame = cc.Layer.extend({

    jsonNode : null,
    ctor:function () {
        this._super();
        //不知道位什么INIT
        this.init();
    },
    onEnterTransitionDidFinish:function() {
        this.jsonNode = ccs.load(res.GameFrameJson).node;
        this.addChild(this.jsonNode);

        /*
        var childCount = this.jsonNode.getChildrenCount();
        var s = this.jsonNode.getChildren();
        for (var i=0;i<childCount;i++) {
            if (s[i].getName() == "bg") {
                continue;
            }
            s[i].setVisible(false);
        }
        */





    },







});

