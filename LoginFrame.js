/**
 * Created by Administrator on 2016/10/1.
 */


var sfs = null;

var LOBBY_ROOM_NAME = "The Lobby";
var GAME_ROOMS_GROUP_NAME = "games";


// Create configuration object
var g_MyUserInfo = {};
var btn_WX_Login = null;






/*
function joinLobbyRoom()
{
    if (sfs.lastJoinedRoom == null || sfs.lastJoinedRoom.name != LOBBY_ROOM_NAME)
        sfs.send(new SFS2X.Requests.System.JoinRoomRequest(LOBBY_ROOM_NAME));
}
*/



function onConnection(event)
{


    if (event.success)
    {
        // Hide any previous error
        $("#errorLb").hide();

        var timestamp=new Date().getTime();
        var username = "user" + timestamp;
        // Perform login
        var uName = username;
        var isSent = sfs.send(new SFS2X.Requests.System.LoginRequest(uName));

        if (isSent)
        {
            if (btn_WX_Login!=null)
            {
                btn_WX_Login.setVisible(false);
            }
        }
    }
    else
    {
        var error = "Connection failed: " + (event.errorMessage ? event.errorMessage + " (code " + event.errorCode + ")" : "Is the server running at all?");
//        showError(error);
        cc.log(error);
    }
}



function onConnectionLost(event)
{


    // Show disconnection reason
    if (event.reason != SFS2X.Utils.ClientDisconnectionReason.MANUAL && event.reason != SFS2X.Utils.ClientDisconnectionReason.UNKNOWN)
    {
        var error = "You have been disconnected; reason is: " + event.reason;
        cc.log(error);
    }
    else
        cc.log("You have been disconnected; reason is: " + event.reason);
}

function onLoginError(event)
{

    // Show error
    var error = "Login error: " + event.errorMessage + " (code " + event.errorCode + ")";
    cc.log(error);

    if (btn_WX_Login!=null)
    {
        btn_WX_Login.setVisible(true);
    }



}

function onLogin(event)
{
    cc.log("Login successful!" +
        "\n\tZone: " + event.zone +
        "\n\tUser: " + event.user +
        "\n\tData: " + event.data);

    if (btn_WX_Login!=null)
    {
        btn_WX_Login.setVisible(false);
    }


    // Set user name
    // NOTE: this always a good practice, in case a custom login procedure on the server side modified the username
    $("#usernameIn").val(event.user.name);
    g_MyUserInfo.usernameIn = event.user.name;
    cc.log(g_MyUserInfo.usernameIn);



    // Check if the "game" group is already subscribed;
    // if not, subscribe it
    //包含房间
    if (!sfs.roomManager.containsGroup(GAME_ROOMS_GROUP_NAME))
    {
        cc.log("send SubscribeRoomGroupRequest");
        //订阅房间
        sfs.send(new SFS2X.Requests.System.SubscribeRoomGroupRequest(GAME_ROOMS_GROUP_NAME));
    }

//*    joinLobbyRoom();
    //创建新场景
    var roomScene=new RoomScene();
    //替换场景
    cc.director.runScene(roomScene);



    // Private Chat system
//    currentPrivateChat = -1;
//    privateChats = [];
}


function onLogout(event)
{
    cc.log("Logout from zone " + event.zone + " performed!");

//    enablePrivateChat(-1);
//    onRoomSelected(null);
}



//微信登陆页面
var LoginFrame = cc.Layer.extend({

    jsonNode : null,
    ctor:function () {
        this._super();
        //不知道位什么INIT
        this.init();
    },
    onEnterTransitionDidFinish:function() {
        this.jsonNode = ccs.load(res.LoginFrameJson).node;
        this.addChild(this.jsonNode, 1003);




        // Create configuration object
        var config = {};
        config.host = "127.0.0.1";
        config.port = 8888;
        config.zone = "BasicExamples";
        config.debug = false;

        // Create SmartFox client instance
        sfs = new SmartFox(config);
        // Add event listeners
        sfs.addEventListener(SFS2X.SFSEvent.CONNECTION, onConnection, this);
        sfs.addEventListener(SFS2X.SFSEvent.CONNECTION_LOST, onConnectionLost, this);

        sfs.addEventListener(SFS2X.SFSEvent.LOGIN_ERROR, onLoginError, this);
        sfs.addEventListener(SFS2X.SFSEvent.LOGIN, onLogin, this);
        sfs.addEventListener(SFS2X.SFSEvent.LOGOUT, onLogout, this);

        sfs.addEventListener(SFS2X.SFSEvent.ROOM_JOIN_ERROR, onRoomJoinError, this);
        sfs.addEventListener(SFS2X.SFSEvent.ROOM_JOIN, onRoomJoin, this);

        sfs.addEventListener(SFS2X.SFSEvent.ROOM_ADD, onRoomCreated, this);
        sfs.addEventListener(SFS2X.SFSEvent.ROOM_CREATION_ERROR, onRoomCreationError, this);










        //微信按钮
        btn_WX_Login = this.jsonNode.getChildByName("btn_wx_login");
        btn_WX_Login.setVisible(true);


        // Make btn_WX_Login touchable
        var Listen_btn_WX_Login = cc.EventListener.create({
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
                if (target == btn_WX_Login) {


                    //创建新场景
                    //           var loginToSceneT2=new LoginToSceneT2();
                    //         //替换场景
                    //       cc.director.runScene(loginToSceneT2);

                    sfs.connect();



                }
            }
        });
        cc.eventManager.addListener(Listen_btn_WX_Login, btn_WX_Login);

        var btn_Test = this.jsonNode.getChildByName("btn_test");
        btn_Test.setVisible(false);

        var login_Player_1 = this.jsonNode.getChildByName("login_player_1");
        login_Player_1.setVisible(false);

        var login_Player_2 = this.jsonNode.getChildByName("login_player_2");
        login_Player_2.setVisible(false);

        var login_Player_3 = this.jsonNode.getChildByName("login_player_3");
        login_Player_3.setVisible(false);

        var login_Player_4 = this.jsonNode.getChildByName("login_player_4");
        login_Player_4.setVisible(false);

        var btn_CeShiFu = this.jsonNode.getChildByName("btn_ceshifu");
        btn_CeShiFu.setVisible(false);

        var btn_Chunge = this.jsonNode.getChildByName("btn_chunge");
        btn_Chunge.setVisible(false);

        var btn_Chunge_Home = this.jsonNode.getChildByName("btn_chunge_home");
        btn_Chunge_Home.setVisible(false);





    },






});

