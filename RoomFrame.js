/**
 * Created by Administrator on 2016/10/1.
 */




//微信登陆页面
var RoomFrame = cc.Layer.extend({

    jsonNode : null,
    ctor:function () {
        this._super();
        //不知道位什么INIT
        this.init();
    },
    onEnterTransitionDidFinish:function() {
        this.jsonNode = ccs.load(res.RoomFrameJson).node;
        this.addChild(this.jsonNode);

        var content = this.jsonNode.getChildByName("content");
        content.setVisible(true);

        var btnCreate = content.getChildByName("btn_create");
        btnCreate.setVisible(true);

        var btnJoin = content.getChildByName("btn_join");
        btnJoin.setVisible(true);
        if (btnJoin == null) {
            cc.log("tn join == null");
        }




        // Make btnCreate touchable
        var Listen_btnCreate = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    target.opacity = 180;
                    return true;
                }
                return false;
            },
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
                var delta = touch.getDelta();
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                target.setOpacity(255);
                if (target == btnCreate) {
                    //创建新场景
                    //           var loginToSceneT2=new LoginToSceneT2();
                    //         //替换场景
                    //       cc.director.runScene(loginToSceneT2);
                    cc.log("sd");



                    // Create a new game Room
                    var settings = new SFS2X.Requests.RoomSettings("My Game Room");
                    settings.maxUsers = 4;
                    settings.groupId = GAME_ROOMS_GROUP_NAME;
                    sfs.send(new SFS2X.Requests.System.CreateRoomRequest(settings));


                }
                else if (target == btnJoin)
                {
                    cc.log("sd22");

//                    if (sfs.lastJoinedRoom == null || sfs.lastJoinedRoom.name != "My Game Room")
  //                      sfs.send(new SFS2X.Requests.System.JoinRoomRequest("My Game Room"));

                    //创建新场景
                    var gameScene=new GameScene();
                    //替换场景
                    cc.director.runScene(gameScene);





                }
            }
        });
        cc.eventManager.addListener(Listen_btnCreate, btnCreate);
        cc.eventManager.addListener(Listen_btnCreate.clone(), btnJoin);














    },







});


function onRoomJoinError(event)
{
    cc.log("Room join error: " + event.errorMessage + " (code: " + event.errorCode + ")", true);

    // Reset roomlist selection
//    onRoomSelected(null);
}

function onRoomJoin(event)
{
    cc.log("Room joined: " + event.room);

    //创建新场景
    var gameScene=new GameScene();
    //替换场景
    cc.director.runScene(gameScene);



    // Switch view
    //   if (event.room.name == LOBBY_ROOM_NAME)
//    {
//        inGame = false;

    //       $("#roomLb").html(event.room.name);
//        setView("lobby", true);

//        writeToLobbyChatArea("<em>You entered the '"+event.room.name+"'</em>");

    // Remove Game Popup
    //       removeGamePopUp();
    //  }
    //  else
    //  {
    //     inGame = true;

    //    setView("game", true);

    //   writeToGameChatArea("<em>You entered the '"+event.room.name+"'</em>");

    // Initialize the game
    //     initGame();

    // Reset roomlist selection
    //   onRoomSelected(null);
    // }
}




function onRoomCreated(evtParams)
{
    cc.log("Room created: " + evtParams.room);
}

function onRoomCreationError(evtParams)
{
    cc.log("Room creation failed: " + evtParams.errorMessage);
}




