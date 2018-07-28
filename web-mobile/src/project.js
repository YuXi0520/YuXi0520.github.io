require=function s(c,a,h){function r(e,t){if(!a[e]){if(!c[e]){var i="function"==typeof require&&require;if(!t&&i)return i(e,!0);if(p)return p(e,!0);var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}var o=a[e]={exports:{}};c[e][0].call(o.exports,function(t){return r(c[e][1][t]||t)},o,o.exports,s,c,a,h)}return a[e].exports}for(var p="function"==typeof require&&require,t=0;t<h.length;t++)r(h[t]);return r}({Common:[function(t,e,i){"use strict";cc._RF.push(e,"3fd44wptZxLv50e3r1ysDwT","Common"),e.exports={data:0,mostdata:0},cc._RF.pop()},{}],JoystickBG:[function(t,e,i){"use strict";cc._RF.push(e,"3ef7bqFNXZK6J2fQJpZ8PKp","JoystickBG");var n=t("JoystickBar");cc.Class({extends:cc.Component,properties:{dot:{default:null,type:cc.Node,displayName:"摇杆节点"},_joyCom:{default:null,displayName:"joy Node"},_playerNode:{default:null,displayName:"被操作的目标Node"},_angle:{default:null,displayName:"当前触摸的角度"},_radian:{default:null,displayName:"弧度"},_speed:0,_speed1:1,_speed2:2,_opacity:0},onLoad:function(){this._joyCom=this.node.parent.getComponent("Joystick"),this._playerNode=this._joyCom.sprite,this._joyCom.touchType==n.TouchType.DEFAULT&&this._initTouchEvent()},_initTouchEvent:function(){var t=this;t.node.on(cc.Node.EventType.TOUCH_START,this._touchStartEvent,t),t.node.on(cc.Node.EventType.TOUCH_MOVE,this._touchMoveEvent,t),t.node.on(cc.Node.EventType.TOUCH_END,this._touchEndEvent,t),t.node.on(cc.Node.EventType.TOUCH_CANCEL,this._touchEndEvent,t)},update:function(t){switch(this._joyCom.directionType){case n.DirectionType.FOUR:this._fourDirectionsMove();break;case n.DirectionType.EIGHT:this._eightDirectionsMove();break;case n.DirectionType.ALL:this._allDirectionsMove()}},_fourDirectionsMove:function(){45<this._angle&&this._angle<135?this._playerNode.y+=this._speed:-135<this._angle&&this._angle<-45?this._playerNode.y-=this._speed:this._angle<-135&&-180<this._angle||135<this._angle&&this._angle<180?this._playerNode.x-=this._speed:(this._angle<0&&-45<this._angle||0<this._angle&&this._angle<45)&&(this._playerNode.x+=this._speed)},_eightDirectionsMove:function(){67.5<this._angle&&this._angle<112.5?this._playerNode.y+=this._speed:-112.5<this._angle&&this._angle<-67.5?this._playerNode.y-=this._speed:this._angle<-157.5&&-180<this._angle||157.5<this._angle&&this._angle<180?this._playerNode.x-=this._speed:this._angle<0&&-22.5<this._angle||0<this._angle&&this._angle<22.5?this._playerNode.x+=this._speed:112.5<this._angle&&this._angle<157.5?(this._playerNode.x-=this._speed/1.414,this._playerNode.y+=this._speed/1.414):22.5<this._angle&&this._angle<67.5?(this._playerNode.x+=this._speed/1.414,this._playerNode.y+=this._speed/1.414):-157.5<this._angle&&this._angle<-112.5?(this._playerNode.x-=this._speed/1.414,this._playerNode.y-=this._speed/1.414):-67.5<this._angle&&this._angle<-22.5&&(this._playerNode.x+=this._speed/1.414,this._playerNode.y-=this._speed/1.414)},_allDirectionsMove:function(){this._playerNode.x+=Math.cos(this._angle*(Math.PI/180))*this._speed*2.5,this._playerNode.y+=Math.sin(this._angle*(Math.PI/180))*this._speed*2.5},_getDistance:function(t,e){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))},_getRadian:function(t){return this._radian=Math.PI/180*this._getAngle(t),this._radian},_getAngle:function(t){var e=this.node.getPosition();return this._angle=Math.atan2(t.y-e.y,t.x-e.x)*(180/Math.PI),this._angle},_setSpeed:function(t){this._getDistance(t,this.node.getPosition())<this._radius?this._speed=this._speed1:this._speed=this._speed2},_touchStartEvent:function(t){var e=this.node.convertToNodeSpaceAR(t.getLocation()),i=this._getDistance(e,cc.p(0,0)),n=this.node.width/2;this._stickPos=e;var o=this.node.getPosition().x+e.x,s=this.node.getPosition().y+e.y;return i<n&&(this.dot.setPosition(cc.p(o,s)),!0)},_touchMoveEvent:function(t){var e=this.node.convertToNodeSpaceAR(t.getLocation()),i=this._getDistance(e,cc.p(0,0)),n=this.node.width/2,o=this.node.getPosition().x+e.x,s=this.node.getPosition().y+e.y;if(i<n)this.dot.setPosition(cc.p(o,s));else{var c=this.node.getPosition().x+Math.cos(this._getRadian(cc.p(o,s)))*n,a=this.node.getPosition().y+Math.sin(this._getRadian(cc.p(o,s)))*n;this.dot.setPosition(cc.p(c,a))}this._getAngle(cc.p(o,s)),this._setSpeed(cc.p(o,s))},_touchEndEvent:function(){this.dot.setPosition(this.node.getPosition()),this._speed=0}}),cc._RF.pop()},{JoystickBar:"JoystickBar"}],JoystickBar:[function(t,e,i){"use strict";cc._RF.push(e,"2186aWU3xpOyKhRUQhqj5qU","JoystickBar"),e.exports={TouchType:cc.Enum({DEFAULT:0,FOLLOW:1}),DirectionType:cc.Enum({FOUR:4,EIGHT:8,ALL:0})},cc._RF.pop()},{}],Joystick:[function(t,e,i){"use strict";cc._RF.push(e,"36aa5e7xdRBh4OA13/mQtIs","Joystick");var n=t("JoystickBar"),o=t("JoystickBG");cc.Class({extends:cc.Component,properties:{dot:{default:null,type:cc.Node,displayName:"摇杆节点"},ring:{default:null,type:o,displayName:"摇杆背景节点"},stickX:{default:0,displayName:"摇杆X位置"},stickY:{default:0,displayName:"摇杆Y位置"},touchType:{default:n.TouchType.DEFAULT,type:n.TouchType,displayName:"触摸类型"},directionType:{default:n.DirectionType.ALL,type:n.DirectionType,displayName:"方向类型"},sprite:{default:null,type:cc.Node,displayName:"操控的目标"},_stickPos:{default:null,type:cc.Node,displayName:"摇杆当前位置"},_touchLocation:{default:null,type:cc.Node,displayName:"摇杆当前位置"}},onLoad:function(){this._createStickSprite(),this.touchType==n.TouchType.FOLLOW&&this._initTouchEvent()},_createStickSprite:function(){this.ring.node.setPosition(this.stickX,this.stickY),this.dot.setPosition(this.stickX,this.stickY)},_initTouchEvent:function(){var t=this;t.node.on(cc.Node.EventType.TOUCH_START,t._touchStartEvent,t),t.node.on(cc.Node.EventType.TOUCH_MOVE,t._touchMoveEvent,t),t.node.on(cc.Node.EventType.TOUCH_END,t._touchEndEvent,t),t.node.on(cc.Node.EventType.TOUCH_CANCEL,t._touchEndEvent,t)},_touchStartEvent:function(t){this._touchLocation=t.getLocation();var e=this.node.convertToNodeSpaceAR(t.getLocation());this.ring.node.setPosition(e),this.dot.setPosition(e),this._stickPos=e},_touchMoveEvent:function(t){if(this._touchLocation.x==t.getLocation().x&&this._touchLocation.y==t.getLocation().y)return!1;var e=this.ring.node.convertToNodeSpaceAR(t.getLocation()),i=this.ring._getDistance(e,cc.p(0,0)),n=this.ring.node.width/2,o=this._stickPos.x+e.x,s=this._stickPos.y+e.y;if(i<n)this.dot.setPosition(cc.p(o,s));else{var c=this._stickPos.x+Math.cos(this.ring._getRadian(cc.p(o,s)))*n,a=this._stickPos.y+Math.sin(this.ring._getRadian(cc.p(o,s)))*n;this.dot.setPosition(cc.p(c,a))}this.ring._getAngle(cc.p(o,s)),this.ring._setSpeed(cc.p(o,s))},_touchEndEvent:function(){this.dot.setPosition(this.ring.node.getPosition()),this.ring._speed=0}}),cc._RF.pop()},{JoystickBG:"JoystickBG",JoystickBar:"JoystickBar"}],"attack-script":[function(t,e,i){"use strict";cc._RF.push(e,"1dfd2kZ1YdMe74wgjaPT2cY","attack-script"),cc.Class({extends:cc.Component,properties:{_equip:{get:function(){return this.node.getChildByName("equip")}},_canvas:null},onLoad:function(){this._canvas=cc.find("Canvas"),this._canvas.on("touchstart",this.onTouchStart,this)},onTouchStart:function(t){var e=this.node.convertToNodeSpaceAR(t.getLocation()),i=cc.v2(e.y,-e.x);cc.pToAngle(i),Math.PI}}),cc._RF.pop()},{}],"enemy-1":[function(t,e,i){"use strict";cc._RF.push(e,"6e79az0VIZDBJCyXz+7j6in","enemy-1"),cc.Class({extends:cc.Component,properties:{_fsm:null,_player:cc.Node,_entityData:{get:function(){return this.getComponent("entity-data")}}},onLoad:function(){this._player=cc.find("Canvas/enemy-generator/player")},update:function(){},lateUpdate:function(){var t=this._player.position,e=cc.pSub(t,this.node.position),i=cc.pMult(cc.pNormalize(e),this._entityData.speed);e.mag()<=this._entityData.speed||(this.node.position=cc.pAdd(i,this.node.position))}}),cc._RF.pop()},{}],"enemy-generator":[function(t,e,i){"use strict";cc._RF.push(e,"7d8a90P6+FDspLMZDsIikeW","enemy-generator");var n=t("Common");cc.Class({extends:cc.Component,properties:{enemyPrefabArray:[cc.Prefab],deltaNum:0,totalTime:0,deltaDuration:0,canvas:cc.Node,currentTimLabel:cc.Label,_currentTime:0,_canvas:null,_sceneLoading:!1},onLoad:function(){this._canvas=this.canvas,this.generate(),this.schedule(this.generate.bind(this),this.deltaDuration)},generate:function(){if(1==this._canvas.childrenCount&&"player"==this._canvas.children[0].name){if(this._currentTime==this.totalTime&&!this._sceneLoading)return this._sceneLoading=!0,void cc.director.loadScene("win-scene");var t=this.deltaNum*this._currentTime;this.schedule(function(){var t=Math.floor(Math.random()*this.enemyPrefabArray.length),e=cc.instantiate(this.enemyPrefabArray[t]),i=null;i=.5<=Math.random()?cc.v2(480*cc.randomMinus1To1(),320*Math.sign(cc.randomMinus1To1())):cc.v2(480*Math.sign(cc.randomMinus1To1()),320*cc.randomMinus1To1()),this._canvas.addChild(e),e.position=i},1,t,.1),this._currentTime++,this.currentTimLabel.string=this._currentTime,n.data=this._currentTime}}}),cc._RF.pop()},{Common:"Common"}],"enemy-test-script":[function(t,e,i){"use strict";cc._RF.push(e,"c17bbapoSZB+pFTFGcjPK6t","enemy-test-script"),cc.Class({extends:cc.Component,editor:{requireComponent:"entity-data"},properties:{_entityData:{get:function(){return this.getComponent("entity-data")}},_hurting:!1,_hurtTimeStamp:null,_hurtValue:null,_firstTimeHurt:!1,hurtDeltaTime:.3},onLoad:function(){cc.director.getCollisionManager().enabled=!0},onCollisionEnter:function(t,e){"equip"==t.node.group&&(this._hurtTimeStamp=Date.now(),this._hurtValue=t.getComponent("entity-data").attackValue,this._hurting=!0,this._firstTimeHurt=!0)},onCollisionExit:function(t,e){"equip"==t.node.group&&(this._hurting=!1)},update:function(t){this._hurting&&(this._hurtTimeStamp+1e3*this.hurtDeltaTime<=Date.now()||this._firstTimeHurt)&&(this._firstTimeHurt=!1,this._hurtTimeStamp=Date.now(),this._entityData.hp-=this._hurtValue,this.node.emit("update-hp"),this._entityData.hp<=0&&this.node.parent&&this.node.removeFromParent())}}),cc._RF.pop()},{}],"entity-data":[function(t,e,i){"use strict";cc._RF.push(e,"8ef3f33Nm5Chpn08HAw5bed","entity-data"),cc.Class({extends:cc.Component,properties:{speed:0,hp:0,attackValue:0,maxHp:0}}),cc._RF.pop()},{}],"equip-2":[function(t,e,i){"use strict";cc._RF.push(e,"bb084v+/slPjbU9BzkfSz+l","equip-2"),cc.Class({extends:cc.Component,properties:{root:cc.Node,player:cc.Animation,Animation_da:cc.Node,Animation_fei:cc.Node,Animation_hui:cc.Node},onLoad:function(){this.Animation_fei.opacity=0,this.root.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this)},onTouchEnd:function(t){this.Animation_da.getComponent(cc.Animation).play("player-da")},onStop:function(){this.Animation_fei.opacity=255,this.Animation_fei.getComponent(cc.Animation).play("equip2")}}),cc._RF.pop()},{}],"equip-test":[function(t,e,i){"use strict";cc._RF.push(e,"54099qXdCZA34ZF02i6B2rx","equip-test"),cc.Class({extends:cc.Component,properties:{root:cc.Node,moveSprite:cc.Sprite},onLoad:function(){this.startPos=cc.p(0,0),this.endPos=cc.p(0,0),this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this,!0)},onTouchEnd:function(t){this.moveSprite.node.stopAllActions(),this.removeTrackSprites(),this.startPos=this.moveSprite.node.getPosition(),this.endPos=cc.p(t.getLocation().x,t.getLocation().y),cc.log("getLocation = ",this.endPos.x,this.endPos.y,t.getLocation().x,t.getLocation().y),this.spriteMoveAction(),this.drawTrack(t.getLocation())},spriteMoveAction:function(){var t=cc.pDistance(this.startPos,this.endPos)/400;cc.log("move = ",this.endPos.x,this.endPos.y);var e=cc.moveTo(t,this.endPos).easing(cc.easeInOut(3));this.moveSprite.node.runAction(cc.sequence(e,callfunc))}}),cc._RF.pop()},{}],"hp-tips-script":[function(t,e,i){"use strict";cc._RF.push(e,"035474QajNDi5Je+lXxkM31","hp-tips-script"),cc.Class({extends:cc.Component,properties:{_entityData:{get:function(){return this.node.parent.getComponent("entity-data")}},_hpLabel:{get:function(){return this.getComponent(cc.Label)}}},onLoad:function(){this.onUpdateHp(),this.node.parent.on("update-hp",this.onUpdateHp,this)},onUpdateHp:function(){this._hpLabel.string=this._entityData.hp}}),cc._RF.pop()},{}],"player--test-script":[function(t,e,i){"use strict";cc._RF.push(e,"7f68cPbofBIhLb8OVhraL9a","player--test-script"),cc.Class({extends:cc.Component,editor:{requireComponent:"entity-data"},properties:{_entityData:{get:function(){return this.getComponent("entity-data")}},_hurting:!1,_hurtTimeStamp:null,_hurtValue:null,_firstTimeHurt:!1,hurtDeltaTime:.3,_sceneLoading:!1},onLoad:function(){cc.director.getCollisionManager().enabled=!0},onCollisionEnter:function(t,e){"enemy"==t.node.group&&(this._hurtTimeStamp=Date.now(),this._hurtValue=t.getComponent("entity-data").attackValue,this._hurting=!0,this._firstTimeHurt=!0)},onCollisionExit:function(t,e){"enemy"==t.node.group&&(this._hurting=!1)},update:function(t){this._hurting&&(this._hurtTimeStamp+1e3*this.hurtDeltaTime<=Date.now()||this._firstTimeHurt)&&(this._firstTimeHurt=!1,this._hurtTimeStamp=Date.now(),this._entityData.hp-=this._hurtValue,this.node.emit("update-hp"),this._entityData.hp<=0&&(this._sceneLoading||(this._sceneLoading=!0,cc.director.loadScene("game-over-scene"))))}}),cc._RF.pop()},{}],"player-zhuanxiang":[function(t,e,i){"use strict";cc._RF.push(e,"5761aX/IiVCFq6E8yllQa71","player-zhuanxiang"),cc.Class({extends:cc.Component,properties:{playerScale:0,_player:cc.Node,_canvas:null},onLoad:function(){this._player=this.node,this._canvas=cc.find("Canvas"),this._canvas.on("touchstart",this.onTouchStart,this)},onTouchStart:function(t){var e=this._canvas.convertToNodeSpaceAR(t.getLocation());console.log(e.x);var i=e.x-this._player.x,n=e.y-this._player.y,o=180*Math.atan(i/n)/Math.PI;if(n<0&&(o=i<0?180+Math.abs(o):180-Math.abs(o)),0<e.x){this._player.setScaleX(-.23);var s=cc.rotateTo(.2,o-120)}else{this._player.setScaleX(.23);s=cc.rotateTo(.2,o+120)}this._player.runAction(s)},update:function(t){}}),cc._RF.pop()},{}],"restart-script":[function(t,e,i){"use strict";cc._RF.push(e,"8f02apxiT5AaZP7x+xRE64n","restart-script");var n=t("Common");cc.Class({extends:cc.Component,properties:{restart_btn:cc.Node,currentTimLabel:cc.Label,mostCurrentTimLabel:cc.Label,longshuo1:cc.Node,longshuo2:cc.Node,longshuo3:cc.Node,longshuo4:cc.Node},onLoad:function(){cc.director.preloadScene("main-scene",function(){cc.log("Next scene preloaded")}),this.longshuo1.opacity=0,this.longshuo2.opacity=0,this.longshuo3.opacity=0,this.longshuo4.opacity=0,n.data>n.mostdata&&(n.mostdata=n.data),this.mostCurrentTimLabel.string=n.mostdata,this.currentTimLabel.string=n.data,n.data<5?this.longshuo1.opacity=255:n.data<10?this.longshuo2.opacity=255:n.data<15?this.longshuo3.opacity=255:this.longshuo4.opacity=255,this.restart_btn.on("touchstart",this.restart,this)},restart:function(t){cc.director.loadScene("main-scene")}}),cc._RF.pop()},{Common:"Common"}],root:[function(t,e,i){"use strict";cc._RF.push(e,"43f9cDKZ9NC35wlMakUEAFm","root"),cc.Class({extends:cc.Component,properties:{root:cc.Node,moveSprite:cc.Sprite,player:cc.Node,Animation_da:cc.Animation},onLoad:function(){this.startPos=cc.p(0,0),this.endPos=cc.p(0,0),this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this)},onTouchEnd:function(t){this.moveSprite.runAction(cc.fadeOut(.1)),this.Animation_da.getComponent(cc.Animation).play("player-da"),this.startPos=this.moveSprite.node.getPosition(),this.player.scaleX<0&&(this.endPos.x=-this.endPos.x,this.endPos.y=-this.endPos.y),this.endPos=cc.p(-t.getLocation().x,-t.getLocation().y),this.spriteMoveAction()},spriteMoveAction:function(){var t=cc.pDistance(this.startPos,this.endPos)/2e3,e=cc.moveTo(t,this.endPos),i=cc.moveTo(t,this.startPos);this.moveSprite.node.runAction(cc.sequence(e,i))}}),cc._RF.pop()},{}],shou:[function(t,e,i){"use strict";cc._RF.push(e,"038daBnQqpGYLHbUmhvehFv","shou"),cc.Class({extends:cc.Component,properties:{},onStop_equip:function(){this.node.opacity=0}}),cc._RF.pop()},{}],"start-Script":[function(t,e,i){"use strict";cc._RF.push(e,"61243lbcTxMBL1XhF9FdeZY","start-Script"),cc.Class({extends:cc.Component,properties:{start_zi:cc.Node,start_long:cc.Node,start_ren:cc.Node,start_btn:cc.Node},onLoad:function(){cc.director.preloadScene("main-scene",function(){cc.log("Next scene preloaded")}),this.start_zi.opacity=0,this.start_long.opacity=0,this.start_ren.opacity=0,this.start_btn.opacity=0},start:function(){var t=cc.sequence(cc.delayTime(.5),cc.fadeIn(1.5),cc.fadeOut(1)),e=cc.sequence(cc.delayTime(3),cc.fadeIn(1.5)),i=cc.sequence(cc.delayTime(5),cc.fadeIn(1.5)),n=cc.sequence(cc.delayTime(6),cc.fadeIn(1));this.start_zi.runAction(t),this.start_long.runAction(e),this.start_ren.runAction(i),this.start_btn.runAction(n)},update:function(){this.start_btn.on("touchstart",this.playGame,this)},playGame:function(){cc.director.loadScene("main-scene")}}),cc._RF.pop()},{}]},{},["Common","Joystick","JoystickBG","JoystickBar","attack-script","enemy-1","enemy-generator","enemy-test-script","entity-data","equip-2","equip-test","hp-tips-script","player--test-script","player-zhuanxiang","restart-script","root","shou","start-Script"]);