require=function o(c,a,h){function r(e,t){if(!a[e]){if(!c[e]){var i="function"==typeof require&&require;if(!t&&i)return i(e,!0);if(p)return p(e,!0);var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}var s=a[e]={exports:{}};c[e][0].call(s.exports,function(t){return r(c[e][1][t]||t)},s,s.exports,o,c,a,h)}return a[e].exports}for(var p="function"==typeof require&&require,t=0;t<h.length;t++)r(h[t]);return r}({JoystickBG:[function(t,e,i){"use strict";cc._RF.push(e,"3ef7bqFNXZK6J2fQJpZ8PKp","JoystickBG");var n=t("JoystickBar");cc.Class({extends:cc.Component,properties:{dot:{default:null,type:cc.Node,displayName:"摇杆节点"},_joyCom:{default:null,displayName:"joy Node"},_playerNode:{default:null,displayName:"被操作的目标Node"},_angle:{default:null,displayName:"当前触摸的角度"},_radian:{default:null,displayName:"弧度"},_speed:0,_speed1:1,_speed2:2,_opacity:0},onLoad:function(){this._joyCom=this.node.parent.getComponent("Joystick"),this._playerNode=this._joyCom.sprite,this._joyCom.touchType==n.TouchType.DEFAULT&&this._initTouchEvent()},_initTouchEvent:function(){var t=this;t.node.on(cc.Node.EventType.TOUCH_START,this._touchStartEvent,t),t.node.on(cc.Node.EventType.TOUCH_MOVE,this._touchMoveEvent,t),t.node.on(cc.Node.EventType.TOUCH_END,this._touchEndEvent,t),t.node.on(cc.Node.EventType.TOUCH_CANCEL,this._touchEndEvent,t)},update:function(t){switch(this._joyCom.directionType){case n.DirectionType.FOUR:this._fourDirectionsMove();break;case n.DirectionType.EIGHT:this._eightDirectionsMove();break;case n.DirectionType.ALL:this._allDirectionsMove()}},_fourDirectionsMove:function(){45<this._angle&&this._angle<135?this._playerNode.y+=this._speed:-135<this._angle&&this._angle<-45?this._playerNode.y-=this._speed:this._angle<-135&&-180<this._angle||135<this._angle&&this._angle<180?this._playerNode.x-=this._speed:(this._angle<0&&-45<this._angle||0<this._angle&&this._angle<45)&&(this._playerNode.x+=this._speed)},_eightDirectionsMove:function(){67.5<this._angle&&this._angle<112.5?this._playerNode.y+=this._speed:-112.5<this._angle&&this._angle<-67.5?this._playerNode.y-=this._speed:this._angle<-157.5&&-180<this._angle||157.5<this._angle&&this._angle<180?this._playerNode.x-=this._speed:this._angle<0&&-22.5<this._angle||0<this._angle&&this._angle<22.5?this._playerNode.x+=this._speed:112.5<this._angle&&this._angle<157.5?(this._playerNode.x-=this._speed/1.414,this._playerNode.y+=this._speed/1.414):22.5<this._angle&&this._angle<67.5?(this._playerNode.x+=this._speed/1.414,this._playerNode.y+=this._speed/1.414):-157.5<this._angle&&this._angle<-112.5?(this._playerNode.x-=this._speed/1.414,this._playerNode.y-=this._speed/1.414):-67.5<this._angle&&this._angle<-22.5&&(this._playerNode.x+=this._speed/1.414,this._playerNode.y-=this._speed/1.414)},_allDirectionsMove:function(){this._playerNode.x+=Math.cos(this._angle*(Math.PI/180))*this._speed*2.5,this._playerNode.y+=Math.sin(this._angle*(Math.PI/180))*this._speed*2.5},_getDistance:function(t,e){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))},_getRadian:function(t){return this._radian=Math.PI/180*this._getAngle(t),this._radian},_getAngle:function(t){var e=this.node.getPosition();return this._angle=Math.atan2(t.y-e.y,t.x-e.x)*(180/Math.PI),this._angle},_setSpeed:function(t){this._getDistance(t,this.node.getPosition())<this._radius?this._speed=this._speed1:this._speed=this._speed2},_touchStartEvent:function(t){var e=this.node.convertToNodeSpaceAR(t.getLocation()),i=this._getDistance(e,cc.p(0,0)),n=this.node.width/2;this._stickPos=e;var s=this.node.getPosition().x+e.x,o=this.node.getPosition().y+e.y;return i<n&&(this.dot.setPosition(cc.p(s,o)),!0)},_touchMoveEvent:function(t){var e=this.node.convertToNodeSpaceAR(t.getLocation()),i=this._getDistance(e,cc.p(0,0)),n=this.node.width/2,s=this.node.getPosition().x+e.x,o=this.node.getPosition().y+e.y;if(i<n)this.dot.setPosition(cc.p(s,o));else{var c=this.node.getPosition().x+Math.cos(this._getRadian(cc.p(s,o)))*n,a=this.node.getPosition().y+Math.sin(this._getRadian(cc.p(s,o)))*n;this.dot.setPosition(cc.p(c,a))}this._getAngle(cc.p(s,o)),this._setSpeed(cc.p(s,o))},_touchEndEvent:function(){this.dot.setPosition(this.node.getPosition()),this._speed=0}}),cc._RF.pop()},{JoystickBar:"JoystickBar"}],JoystickBar:[function(t,e,i){"use strict";cc._RF.push(e,"2186aWU3xpOyKhRUQhqj5qU","JoystickBar"),e.exports={TouchType:cc.Enum({DEFAULT:0,FOLLOW:1}),DirectionType:cc.Enum({FOUR:4,EIGHT:8,ALL:0})},cc._RF.pop()},{}],Joystick:[function(t,e,i){"use strict";cc._RF.push(e,"36aa5e7xdRBh4OA13/mQtIs","Joystick");var n=t("JoystickBar"),s=t("JoystickBG");cc.Class({extends:cc.Component,properties:{dot:{default:null,type:cc.Node,displayName:"摇杆节点"},ring:{default:null,type:s,displayName:"摇杆背景节点"},stickX:{default:0,displayName:"摇杆X位置"},stickY:{default:0,displayName:"摇杆Y位置"},touchType:{default:n.TouchType.DEFAULT,type:n.TouchType,displayName:"触摸类型"},directionType:{default:n.DirectionType.ALL,type:n.DirectionType,displayName:"方向类型"},sprite:{default:null,type:cc.Node,displayName:"操控的目标"},_stickPos:{default:null,type:cc.Node,displayName:"摇杆当前位置"},_touchLocation:{default:null,type:cc.Node,displayName:"摇杆当前位置"}},onLoad:function(){this._createStickSprite(),this.touchType==n.TouchType.FOLLOW&&this._initTouchEvent()},_createStickSprite:function(){this.ring.node.setPosition(this.stickX,this.stickY),this.dot.setPosition(this.stickX,this.stickY)},_initTouchEvent:function(){var t=this;t.node.on(cc.Node.EventType.TOUCH_START,t._touchStartEvent,t),t.node.on(cc.Node.EventType.TOUCH_MOVE,t._touchMoveEvent,t),t.node.on(cc.Node.EventType.TOUCH_END,t._touchEndEvent,t),t.node.on(cc.Node.EventType.TOUCH_CANCEL,t._touchEndEvent,t)},_touchStartEvent:function(t){this._touchLocation=t.getLocation();var e=this.node.convertToNodeSpaceAR(t.getLocation());this.ring.node.setPosition(e),this.dot.setPosition(e),this._stickPos=e},_touchMoveEvent:function(t){if(this._touchLocation.x==t.getLocation().x&&this._touchLocation.y==t.getLocation().y)return!1;var e=this.ring.node.convertToNodeSpaceAR(t.getLocation()),i=this.ring._getDistance(e,cc.p(0,0)),n=this.ring.node.width/2,s=this._stickPos.x+e.x,o=this._stickPos.y+e.y;if(i<n)this.dot.setPosition(cc.p(s,o));else{var c=this._stickPos.x+Math.cos(this.ring._getRadian(cc.p(s,o)))*n,a=this._stickPos.y+Math.sin(this.ring._getRadian(cc.p(s,o)))*n;this.dot.setPosition(cc.p(c,a))}this.ring._getAngle(cc.p(s,o)),this.ring._setSpeed(cc.p(s,o))},_touchEndEvent:function(){this.dot.setPosition(this.ring.node.getPosition()),this.ring._speed=0}}),cc._RF.pop()},{JoystickBG:"JoystickBG",JoystickBar:"JoystickBar"}],"attack-script":[function(t,e,i){"use strict";cc._RF.push(e,"1dfd2kZ1YdMe74wgjaPT2cY","attack-script"),cc.Class({extends:cc.Component,properties:{_equip:{get:function(){return this.node.getChildByName("equip")}},_canvas:null},onLoad:function(){this._canvas=cc.find("Canvas"),this._canvas.on("touchstart",this.onTouchStart,this)},onTouchStart:function(t){var e=this.node.convertToNodeSpaceAR(t.getLocation()),i=cc.v2(e.y,-e.x),n=-1*cc.pToAngle(i)*180/Math.PI;this._equip.runAction(cc.rotateTo(.2,n).easing(cc.easeBackInOut(3)))}}),cc._RF.pop()},{}],"enemy-1":[function(t,e,i){"use strict";cc._RF.push(e,"6e79az0VIZDBJCyXz+7j6in","enemy-1"),cc.Class({extends:cc.Component,properties:{_fsm:null,_player:cc.Node,_entityData:{get:function(){return this.getComponent("entity-data")}}},onLoad:function(){this._player=cc.find("Canvas/enemy-generator/player")},update:function(){},lateUpdate:function(){var t=this._player.position,e=cc.pSub(t,this.node.position),i=cc.pMult(cc.pNormalize(e),this._entityData.speed);e.mag()<=this._entityData.speed||(this.node.position=cc.pAdd(i,this.node.position))}}),cc._RF.pop()},{}],"enemy-generator":[function(t,e,i){"use strict";cc._RF.push(e,"7d8a90P6+FDspLMZDsIikeW","enemy-generator"),cc.Class({extends:cc.Component,properties:{enemyPrefabArray:[cc.Prefab],deltaNum:0,totalTime:0,deltaDuration:0,canvas:cc.Node,_currentTime:0,_canvas:null,_sceneLoading:!1},onLoad:function(){this._canvas=this.canvas,this.generate(),this.schedule(this.generate.bind(this),this.deltaDuration)},generate:function(){if(1==this._canvas.childrenCount&&"player"==this._canvas.children[0].name){if(this._currentTime==this.totalTime&&!this._sceneLoading)return this._sceneLoading=!0,void cc.director.loadScene("win-scene");for(var t=this.deltaNum*this._currentTime,e=0;e<t;e++){var i=Math.floor(Math.random()*this.enemyPrefabArray.length),n=cc.instantiate(this.enemyPrefabArray[i]),s=null;s=.5<=Math.random()?cc.v2(480*cc.randomMinus1To1(),320*Math.sign(cc.randomMinus1To1())):cc.v2(480*Math.sign(cc.randomMinus1To1()),320*cc.randomMinus1To1()),this._canvas.addChild(n),n.position=s}this._currentTime++}}}),cc._RF.pop()},{}],"enemy-test-script":[function(t,e,i){"use strict";cc._RF.push(e,"c17bbapoSZB+pFTFGcjPK6t","enemy-test-script"),cc.Class({extends:cc.Component,editor:{requireComponent:"entity-data"},properties:{_entityData:{get:function(){return this.getComponent("entity-data")}},_hurting:!1,_hurtTimeStamp:null,_hurtValue:null,_firstTimeHurt:!1,hurtDeltaTime:.3},onLoad:function(){cc.director.getCollisionManager().enabled=!0},onCollisionEnter:function(t,e){"equip"==t.node.group&&(this._hurtTimeStamp=Date.now(),this._hurtValue=t.getComponent("entity-data").attackValue,this._hurting=!0,this._firstTimeHurt=!0)},onCollisionExit:function(t,e){"equip"==t.node.group&&(this._hurting=!1)},update:function(t){this._hurting&&(this._hurtTimeStamp+1e3*this.hurtDeltaTime<=Date.now()||this._firstTimeHurt)&&(this._firstTimeHurt=!1,this._hurtTimeStamp=Date.now(),this._entityData.hp-=this._hurtValue,this.node.emit("update-hp"),this._entityData.hp<=0&&this.node.parent&&this.node.removeFromParent())}}),cc._RF.pop()},{}],"entity-data":[function(t,e,i){"use strict";cc._RF.push(e,"8ef3f33Nm5Chpn08HAw5bed","entity-data"),cc.Class({extends:cc.Component,properties:{speed:0,hp:0,attackValue:0,maxHp:0}}),cc._RF.pop()},{}],"hp-tips-script":[function(t,e,i){"use strict";cc._RF.push(e,"035474QajNDi5Je+lXxkM31","hp-tips-script"),cc.Class({extends:cc.Component,properties:{_entityData:{get:function(){return this.node.parent.getComponent("entity-data")}},_hpLabel:{get:function(){return this.getComponent(cc.Label)}}},onLoad:function(){this.onUpdateHp(),this.node.parent.on("update-hp",this.onUpdateHp,this)},onUpdateHp:function(){this._hpLabel.string=this._entityData.hp}}),cc._RF.pop()},{}],"player--test-script":[function(t,e,i){"use strict";cc._RF.push(e,"7f68cPbofBIhLb8OVhraL9a","player--test-script"),cc.Class({extends:cc.Component,editor:{requireComponent:"entity-data"},properties:{_entityData:{get:function(){return this.getComponent("entity-data")}},_hurting:!1,_hurtTimeStamp:null,_hurtValue:null,_firstTimeHurt:!1,hurtDeltaTime:.3,_sceneLoading:!1},onLoad:function(){cc.director.getCollisionManager().enabled=!0},onCollisionEnter:function(t,e){"enemy"==t.node.group&&(this._hurtTimeStamp=Date.now(),this._hurtValue=t.getComponent("entity-data").attackValue,this._hurting=!0,this._firstTimeHurt=!0)},onCollisionExit:function(t,e){"enemy"==t.node.group&&(this._hurting=!1)},update:function(t){this._hurting&&(this._hurtTimeStamp+1e3*this.hurtDeltaTime<=Date.now()||this._firstTimeHurt)&&(this._firstTimeHurt=!1,this._hurtTimeStamp=Date.now(),this._entityData.hp-=this._hurtValue,this.node.emit("update-hp"),this._entityData.hp<=0&&(this._sceneLoading||(this._sceneLoading=!0,cc.director.loadScene("game-over-scene"))))}}),cc._RF.pop()},{}]},{},["Joystick","JoystickBG","JoystickBar","attack-script","enemy-1","enemy-generator","enemy-test-script","entity-data","hp-tips-script","player--test-script"]);