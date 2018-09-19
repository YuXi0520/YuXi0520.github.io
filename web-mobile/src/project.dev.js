require = function() {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }
        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function(r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }
      return n[i].exports;
    }
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o;
  }
  return r;
}()({
  Common: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3fd44wptZxLv50e3r1ysDwT", "Common");
    "use strict";
    module.exports = {
      data: 0,
      mostdata: 0
    };
    cc._RF.pop();
  }, {} ],
  JoystickBG: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3ef7bqFNXZK6J2fQJpZ8PKp", "JoystickBG");
    "use strict";
    var Common = require("JoystickBar");
    cc.Class({
      extends: cc.Component,
      properties: {
        dot: {
          default: null,
          type: cc.Node,
          displayName: "摇杆节点"
        },
        _joyCom: {
          default: null,
          displayName: "joy Node"
        },
        _playerNode: {
          default: null,
          displayName: "被操作的目标Node"
        },
        _angle: {
          default: null,
          displayName: "当前触摸的角度"
        },
        _radian: {
          default: null,
          displayName: "弧度"
        },
        _speed: 0,
        _speed1: 1,
        _speed2: 2,
        _opacity: 0
      },
      onLoad: function onLoad() {
        this._joyCom = this.node.parent.getComponent("Joystick");
        this._playerNode = this._joyCom.sprite;
        this._joyCom.touchType == Common.TouchType.DEFAULT && this._initTouchEvent();
      },
      _initTouchEvent: function _initTouchEvent() {
        var self = this;
        self.node.on(cc.Node.EventType.TOUCH_START, this._touchStartEvent, self);
        self.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, self);
        self.node.on(cc.Node.EventType.TOUCH_END, this._touchEndEvent, self);
        self.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEvent, self);
      },
      update: function update(dt) {
        switch (this._joyCom.directionType) {
         case Common.DirectionType.FOUR:
          this._fourDirectionsMove();
          break;

         case Common.DirectionType.EIGHT:
          this._eightDirectionsMove();
          break;

         case Common.DirectionType.ALL:
          this._allDirectionsMove();
        }
      },
      _fourDirectionsMove: function _fourDirectionsMove() {
        this._angle > 45 && this._angle < 135 ? this._playerNode.y += this._speed : this._angle > -135 && this._angle < -45 ? this._playerNode.y -= this._speed : this._angle < -135 && this._angle > -180 || this._angle > 135 && this._angle < 180 ? this._playerNode.x -= this._speed : (this._angle < 0 && this._angle > -45 || this._angle > 0 && this._angle < 45) && (this._playerNode.x += this._speed);
      },
      _eightDirectionsMove: function _eightDirectionsMove() {
        if (this._angle > 67.5 && this._angle < 112.5) this._playerNode.y += this._speed; else if (this._angle > -112.5 && this._angle < -67.5) this._playerNode.y -= this._speed; else if (this._angle < -157.5 && this._angle > -180 || this._angle > 157.5 && this._angle < 180) this._playerNode.x -= this._speed; else if (this._angle < 0 && this._angle > -22.5 || this._angle > 0 && this._angle < 22.5) this._playerNode.x += this._speed; else if (this._angle > 112.5 && this._angle < 157.5) {
          this._playerNode.x -= this._speed / 1.414;
          this._playerNode.y += this._speed / 1.414;
        } else if (this._angle > 22.5 && this._angle < 67.5) {
          this._playerNode.x += this._speed / 1.414;
          this._playerNode.y += this._speed / 1.414;
        } else if (this._angle > -157.5 && this._angle < -112.5) {
          this._playerNode.x -= this._speed / 1.414;
          this._playerNode.y -= this._speed / 1.414;
        } else if (this._angle > -67.5 && this._angle < -22.5) {
          this._playerNode.x += this._speed / 1.414;
          this._playerNode.y -= this._speed / 1.414;
        }
      },
      _allDirectionsMove: function _allDirectionsMove() {
        this._playerNode.x += Math.cos(this._angle * (Math.PI / 180)) * this._speed * 2.5;
        this._playerNode.y += Math.sin(this._angle * (Math.PI / 180)) * this._speed * 2.5;
      },
      _getDistance: function _getDistance(pos1, pos2) {
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
      },
      _getRadian: function _getRadian(point) {
        this._radian = Math.PI / 180 * this._getAngle(point);
        return this._radian;
      },
      _getAngle: function _getAngle(point) {
        var pos = this.node.getPosition();
        this._angle = Math.atan2(point.y - pos.y, point.x - pos.x) * (180 / Math.PI);
        return this._angle;
      },
      _setSpeed: function _setSpeed(point) {
        var distance = this._getDistance(point, this.node.getPosition());
        distance < this._radius ? this._speed = this._speed1 : this._speed = this._speed2;
      },
      _touchStartEvent: function _touchStartEvent(event) {
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());
        var distance = this._getDistance(touchPos, cc.p(0, 0));
        var radius = this.node.width / 2;
        this._stickPos = touchPos;
        var posX = this.node.getPosition().x + touchPos.x;
        var posY = this.node.getPosition().y + touchPos.y;
        if (radius > distance) {
          this.dot.setPosition(cc.p(posX, posY));
          return true;
        }
        return false;
      },
      _touchMoveEvent: function _touchMoveEvent(event) {
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());
        var distance = this._getDistance(touchPos, cc.p(0, 0));
        var radius = this.node.width / 2;
        var posX = this.node.getPosition().x + touchPos.x;
        var posY = this.node.getPosition().y + touchPos.y;
        if (radius > distance) this.dot.setPosition(cc.p(posX, posY)); else {
          var x = this.node.getPosition().x + Math.cos(this._getRadian(cc.p(posX, posY))) * radius;
          var y = this.node.getPosition().y + Math.sin(this._getRadian(cc.p(posX, posY))) * radius;
          this.dot.setPosition(cc.p(x, y));
        }
        this._getAngle(cc.p(posX, posY));
        this._setSpeed(cc.p(posX, posY));
      },
      _touchEndEvent: function _touchEndEvent() {
        this.dot.setPosition(this.node.getPosition());
        this._speed = 0;
      }
    });
    cc._RF.pop();
  }, {
    JoystickBar: "JoystickBar"
  } ],
  JoystickBar: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2186aWU3xpOyKhRUQhqj5qU", "JoystickBar");
    "use strict";
    module.exports = {
      TouchType: cc.Enum({
        DEFAULT: 0,
        FOLLOW: 1
      }),
      DirectionType: cc.Enum({
        FOUR: 4,
        EIGHT: 8,
        ALL: 0
      })
    };
    cc._RF.pop();
  }, {} ],
  Joystick: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "36aa5e7xdRBh4OA13/mQtIs", "Joystick");
    "use strict";
    var Common = require("JoystickBar");
    var JoystickBG = require("JoystickBG");
    cc.Class({
      extends: cc.Component,
      properties: {
        dot: {
          default: null,
          type: cc.Node,
          displayName: "摇杆节点"
        },
        ring: {
          default: null,
          type: JoystickBG,
          displayName: "摇杆背景节点"
        },
        stickX: {
          default: 0,
          displayName: "摇杆X位置"
        },
        stickY: {
          default: 0,
          displayName: "摇杆Y位置"
        },
        touchType: {
          default: Common.TouchType.DEFAULT,
          type: Common.TouchType,
          displayName: "触摸类型"
        },
        directionType: {
          default: Common.DirectionType.ALL,
          type: Common.DirectionType,
          displayName: "方向类型"
        },
        sprite: {
          default: null,
          type: cc.Node,
          displayName: "操控的目标"
        },
        _stickPos: {
          default: null,
          type: cc.Node,
          displayName: "摇杆当前位置"
        },
        _touchLocation: {
          default: null,
          type: cc.Node,
          displayName: "摇杆当前位置"
        }
      },
      onLoad: function onLoad() {
        this._createStickSprite();
        this.touchType == Common.TouchType.FOLLOW && this._initTouchEvent();
      },
      _createStickSprite: function _createStickSprite() {
        this.ring.node.setPosition(this.stickX, this.stickY);
        this.dot.setPosition(this.stickX, this.stickY);
      },
      _initTouchEvent: function _initTouchEvent() {
        var self = this;
        self.node.on(cc.Node.EventType.TOUCH_START, self._touchStartEvent, self);
        self.node.on(cc.Node.EventType.TOUCH_MOVE, self._touchMoveEvent, self);
        self.node.on(cc.Node.EventType.TOUCH_END, self._touchEndEvent, self);
        self.node.on(cc.Node.EventType.TOUCH_CANCEL, self._touchEndEvent, self);
      },
      _touchStartEvent: function _touchStartEvent(event) {
        this._touchLocation = event.getLocation();
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());
        this.ring.node.setPosition(touchPos);
        this.dot.setPosition(touchPos);
        this._stickPos = touchPos;
      },
      _touchMoveEvent: function _touchMoveEvent(event) {
        if (this._touchLocation.x == event.getLocation().x && this._touchLocation.y == event.getLocation().y) return false;
        var touchPos = this.ring.node.convertToNodeSpaceAR(event.getLocation());
        var distance = this.ring._getDistance(touchPos, cc.p(0, 0));
        var radius = this.ring.node.width / 2;
        var posX = this._stickPos.x + touchPos.x;
        var posY = this._stickPos.y + touchPos.y;
        if (radius > distance) this.dot.setPosition(cc.p(posX, posY)); else {
          var x = this._stickPos.x + Math.cos(this.ring._getRadian(cc.p(posX, posY))) * radius;
          var y = this._stickPos.y + Math.sin(this.ring._getRadian(cc.p(posX, posY))) * radius;
          this.dot.setPosition(cc.p(x, y));
        }
        this.ring._getAngle(cc.p(posX, posY));
        this.ring._setSpeed(cc.p(posX, posY));
      },
      _touchEndEvent: function _touchEndEvent() {
        this.dot.setPosition(this.ring.node.getPosition());
        this.ring._speed = 0;
      }
    });
    cc._RF.pop();
  }, {
    JoystickBG: "JoystickBG",
    JoystickBar: "JoystickBar"
  } ],
  "attack-script": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1dfd2kZ1YdMe74wgjaPT2cY", "attack-script");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        _equip: {
          get: function get() {
            return this.node.getChildByName("equip");
          }
        },
        _canvas: null
      },
      onLoad: function onLoad() {
        this._canvas = cc.find("Canvas");
        this._canvas.on("touchstart", this.onTouchStart, this);
      },
      onTouchStart: function onTouchStart(e) {
        var targetVector = this.node.convertToNodeSpaceAR(e.getLocation());
        var rotateVector = cc.v2(targetVector.y, -targetVector.x);
        var targetRotation = -1 * cc.pToAngle(rotateVector) * 180 / Math.PI;
      }
    });
    cc._RF.pop();
  }, {} ],
  "enemy-1": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6e79az0VIZDBJCyXz+7j6in", "enemy-1");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        _fsm: null,
        _player: cc.Node,
        _entityData: {
          get: function get() {
            return this.getComponent("entity-data");
          }
        }
      },
      onLoad: function onLoad() {
        this._player = cc.find("Canvas/enemy-generator/player");
      },
      update: function update() {},
      lateUpdate: function lateUpdate() {
        var targetPosition = this._player.position;
        var targetVector = cc.pSub(targetPosition, this.node.position);
        var targetStep = cc.pMult(cc.pNormalize(targetVector), this._entityData.speed);
        if (targetVector.mag() <= this._entityData.speed) return;
        this.node.position = cc.pAdd(targetStep, this.node.position);
      }
    });
    cc._RF.pop();
  }, {} ],
  "enemy-generator": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7d8a90P6+FDspLMZDsIikeW", "enemy-generator");
    "use strict";
    var com = require("Common");
    cc.Class({
      extends: cc.Component,
      properties: {
        enemyPrefabArray: [ cc.Prefab ],
        deltaNum: 0,
        totalTime: 0,
        deltaDuration: 0,
        canvas: cc.Node,
        currentTimLabel: cc.Label,
        _currentTime: 0,
        _canvas: null,
        _sceneLoading: false
      },
      onLoad: function onLoad() {
        this._canvas = this.canvas;
        this.generate();
        this.schedule(this.generate.bind(this), this.deltaDuration);
      },
      generate: function generate() {
        if (1 == this._canvas.childrenCount && "player" == this._canvas.children[0].name) {
          if (this._currentTime == this.totalTime && !this._sceneLoading) {
            this._sceneLoading = true;
            cc.director.loadScene("win-scene");
            return;
          }
          var enemyNum = this.deltaNum * this._currentTime;
          var interval = 1;
          var repeat = enemyNum;
          var delay = .1;
          this.schedule(function() {
            var randomIdx = Math.floor(Math.random() * this.enemyPrefabArray.length);
            var enemy = cc.instantiate(this.enemyPrefabArray[randomIdx]);
            var originPosition = null;
            originPosition = Math.random() >= .5 ? cc.v2(480 * cc.randomMinus1To1(), 320 * Math.sign(cc.randomMinus1To1())) : cc.v2(480 * Math.sign(cc.randomMinus1To1()), 320 * cc.randomMinus1To1());
            this._canvas.addChild(enemy);
            enemy.position = originPosition;
          }, interval, repeat, delay);
          this._currentTime++;
          this.currentTimLabel.string = this._currentTime;
          com.data = this._currentTime;
        }
      }
    });
    cc._RF.pop();
  }, {
    Common: "Common"
  } ],
  "enemy-test-script": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c17bbapoSZB+pFTFGcjPK6t", "enemy-test-script");
    "use strict";
    cc.Class({
      extends: cc.Component,
      editor: {
        requireComponent: "entity-data"
      },
      properties: {
        _entityData: {
          get: function get() {
            return this.getComponent("entity-data");
          }
        },
        _hurting: false,
        _hurtTimeStamp: null,
        _hurtValue: null,
        _firstTimeHurt: false,
        hurtDeltaTime: .3
      },
      onLoad: function onLoad() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
      },
      onCollisionEnter: function onCollisionEnter(other, self) {
        if ("equip" == other.node.group) {
          this._hurtTimeStamp = Date.now();
          this._hurtValue = other.getComponent("entity-data").attackValue;
          this._hurting = true;
          this._firstTimeHurt = true;
        }
      },
      onCollisionExit: function onCollisionExit(other, self) {
        "equip" == other.node.group && (this._hurting = false);
      },
      update: function update(dt) {
        if (this._hurting && (this._hurtTimeStamp + 1e3 * this.hurtDeltaTime <= Date.now() || this._firstTimeHurt)) {
          this._firstTimeHurt = false;
          this._hurtTimeStamp = Date.now();
          this._entityData.hp -= this._hurtValue;
          this.node.emit("update-hp");
          this._entityData.hp <= 0 && this.node.parent && this.node.removeFromParent();
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  "entity-data": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8ef3f33Nm5Chpn08HAw5bed", "entity-data");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        speed: 0,
        hp: 0,
        attackValue: 0,
        maxHp: 0
      }
    });
    cc._RF.pop();
  }, {} ],
  "equip-2": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bb084v+/slPjbU9BzkfSz+l", "equip-2");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        root: cc.Node,
        player: cc.Animation,
        Animation_da: cc.Node,
        Animation_fei: cc.Node,
        Animation_hui: cc.Node
      },
      onLoad: function onLoad() {
        this.Animation_fei.opacity = 0;
        this.root.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
      },
      onTouchEnd: function onTouchEnd(event) {
        var anim = this.Animation_da.getComponent(cc.Animation);
        anim.play("player-da");
      },
      onStop: function onStop() {
        this.Animation_fei.opacity = 255;
        var animequip = this.Animation_fei.getComponent(cc.Animation);
        animequip.play("equip2");
      }
    });
    cc._RF.pop();
  }, {} ],
  "equip-test": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "54099qXdCZA34ZF02i6B2rx", "equip-test");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        root: cc.Node,
        moveSprite: cc.Sprite
      },
      onLoad: function onLoad() {
        this.startPos = cc.p(0, 0);
        this.endPos = cc.p(0, 0);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this, true);
      },
      onTouchEnd: function onTouchEnd(event) {
        this.moveSprite.node.stopAllActions();
        this.removeTrackSprites();
        this.startPos = this.moveSprite.node.getPosition();
        this.endPos = cc.p(event.getLocation().x, event.getLocation().y);
        cc.log("getLocation = ", this.endPos.x, this.endPos.y, event.getLocation().x, event.getLocation().y);
        this.spriteMoveAction();
        this.drawTrack(event.getLocation());
      },
      spriteMoveAction: function spriteMoveAction() {
        var distance = cc.pDistance(this.startPos, this.endPos);
        var moveTime = distance / 400;
        cc.log("move = ", this.endPos.x, this.endPos.y);
        var moveTo = cc.moveTo(moveTime, this.endPos).easing(cc.easeInOut(3));
        this.moveSprite.node.runAction(cc.sequence(moveTo, callfunc));
      }
    });
    cc._RF.pop();
  }, {} ],
  "hp-tips-script": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "035474QajNDi5Je+lXxkM31", "hp-tips-script");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        _entityData: {
          get: function get() {
            return this.node.parent.getComponent("entity-data");
          }
        },
        _hpLabel: {
          get: function get() {
            return this.getComponent(cc.Label);
          }
        }
      },
      onLoad: function onLoad() {
        this.onUpdateHp();
        this.node.parent.on("update-hp", this.onUpdateHp, this);
      },
      onUpdateHp: function onUpdateHp() {
        this._hpLabel.string = this._entityData.hp;
      }
    });
    cc._RF.pop();
  }, {} ],
  "player--test-script": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7f68cPbofBIhLb8OVhraL9a", "player--test-script");
    "use strict";
    cc.Class({
      extends: cc.Component,
      editor: {
        requireComponent: "entity-data"
      },
      properties: {
        _entityData: {
          get: function get() {
            return this.getComponent("entity-data");
          }
        },
        _hurting: false,
        _hurtTimeStamp: null,
        _hurtValue: null,
        _firstTimeHurt: false,
        hurtDeltaTime: .3,
        _sceneLoading: false
      },
      onLoad: function onLoad() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
      },
      onCollisionEnter: function onCollisionEnter(other, self) {
        if ("enemy" == other.node.group) {
          this._hurtTimeStamp = Date.now();
          this._hurtValue = other.getComponent("entity-data").attackValue;
          this._hurting = true;
          this._firstTimeHurt = true;
        }
      },
      onCollisionExit: function onCollisionExit(other, self) {
        "enemy" == other.node.group && (this._hurting = false);
      },
      update: function update(dt) {
        if (this._hurting && (this._hurtTimeStamp + 1e3 * this.hurtDeltaTime <= Date.now() || this._firstTimeHurt)) {
          this._firstTimeHurt = false;
          this._hurtTimeStamp = Date.now();
          this._entityData.hp -= this._hurtValue;
          this.node.emit("update-hp");
          if (this._entityData.hp <= 0 && !this._sceneLoading) {
            this._sceneLoading = true;
            cc.director.loadScene("game-over-scene");
          }
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  "player-zhuanxiang": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5761aX/IiVCFq6E8yllQa71", "player-zhuanxiang");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        playerScale: 0,
        _player: cc.Node,
        _canvas: null
      },
      onLoad: function onLoad() {
        this._player = this.node;
        this._canvas = cc.find("Canvas");
        this._canvas.on("touchstart", this.onTouchStart, this);
      },
      onTouchStart: function onTouchStart(e) {
        var locationInNode = this._canvas.convertToNodeSpaceAR(e.getLocation());
        console.log(locationInNode.x);
        var o = locationInNode.x - this._player.x;
        var a = locationInNode.y - this._player.y;
        var at = 180 * Math.atan(o / a) / Math.PI;
        a < 0 && (at = o < 0 ? 180 + Math.abs(at) : 180 - Math.abs(at));
        if (locationInNode.x > 0) {
          this._player.setScaleX(-.23);
          var rotate = cc.rotateTo(.2, at - 120);
        } else {
          this._player.setScaleX(.23);
          var rotate = cc.rotateTo(.2, at + 120);
        }
        this._player.runAction(rotate);
      },
      update: function update(dt) {}
    });
    cc._RF.pop();
  }, {} ],
  "restart-script": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8f02apxiT5AaZP7x+xRE64n", "restart-script");
    "use strict";
    var com = require("Common");
    cc.Class({
      extends: cc.Component,
      properties: {
        restart_btn: cc.Node,
        currentTimLabel: cc.Label,
        mostCurrentTimLabel: cc.Label,
        longshuo1: cc.Node,
        longshuo2: cc.Node,
        longshuo3: cc.Node,
        longshuo4: cc.Node
      },
      onLoad: function onLoad() {
        cc.director.preloadScene("main-scene", function() {
          cc.log("Next scene preloaded");
        });
        this.longshuo1.opacity = 0;
        this.longshuo2.opacity = 0;
        this.longshuo3.opacity = 0;
        this.longshuo4.opacity = 0;
        com.data > com.mostdata && (com.mostdata = com.data);
        this.mostCurrentTimLabel.string = com.mostdata;
        this.currentTimLabel.string = com.data;
        com.data < 5 ? this.longshuo1.opacity = 255 : com.data < 10 ? this.longshuo2.opacity = 255 : com.data < 15 ? this.longshuo3.opacity = 255 : this.longshuo4.opacity = 255;
        this.restart_btn.on("touchstart", this.restart, this);
      },
      restart: function restart(e) {
        cc.director.loadScene("main-scene");
      }
    });
    cc._RF.pop();
  }, {
    Common: "Common"
  } ],
  root: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "43f9cDKZ9NC35wlMakUEAFm", "root");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        root: cc.Node,
        moveSprite: cc.Sprite,
        player: cc.Node,
        Animation_da: cc.Animation
      },
      onLoad: function onLoad() {
        this.startPos = cc.p(0, 0);
        this.endPos = cc.p(0, 0);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
      },
      onTouchEnd: function onTouchEnd(event) {
        this.moveSprite.runAction(cc.fadeOut(.1));
        var anim = this.Animation_da.getComponent(cc.Animation);
        anim.play("player-da");
        this.startPos = this.moveSprite.node.getPosition();
        if (this.player.scaleX < 0) {
          this.endPos.x = -this.endPos.x;
          this.endPos.y = -this.endPos.y;
        }
        this.endPos = cc.p(-event.getLocation().x, -event.getLocation().y);
        this.spriteMoveAction();
      },
      spriteMoveAction: function spriteMoveAction() {
        var distance = cc.pDistance(this.startPos, this.endPos);
        var moveTime = distance / 2e3;
        var moveTo = cc.moveTo(moveTime, this.endPos);
        var moveBack = cc.moveTo(moveTime, this.startPos);
        this.moveSprite.node.runAction(cc.sequence(moveTo, moveBack));
      }
    });
    cc._RF.pop();
  }, {} ],
  shou: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "038daBnQqpGYLHbUmhvehFv", "shou");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onStop_equip: function onStop_equip() {
        this.node.opacity = 0;
      }
    });
    cc._RF.pop();
  }, {} ],
  "start-Script": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "61243lbcTxMBL1XhF9FdeZY", "start-Script");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        start_zi: cc.Node,
        start_long: cc.Node,
        start_ren: cc.Node,
        start_btn: cc.Node
      },
      onLoad: function onLoad() {
        cc.director.preloadScene("main-scene", function() {
          cc.log("Next scene preloaded");
        });
        this.start_zi.opacity = 0;
        this.start_long.opacity = 0;
        this.start_ren.opacity = 0;
        this.start_btn.opacity = 0;
      },
      start: function start() {
        var seq = cc.sequence(cc.delayTime(.5), cc.fadeIn(1.5), cc.fadeOut(1));
        var seq2 = cc.sequence(cc.delayTime(3), cc.fadeIn(1.5));
        var seq3 = cc.sequence(cc.delayTime(5), cc.fadeIn(1.5));
        var seq4 = cc.sequence(cc.delayTime(6), cc.fadeIn(1));
        this.start_zi.runAction(seq);
        this.start_long.runAction(seq2);
        this.start_ren.runAction(seq3);
        this.start_btn.runAction(seq4);
      },
      update: function update() {
        this.start_btn.on("touchstart", this.playGame, this);
      },
      playGame: function playGame() {
        cc.director.loadScene("main-scene");
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "Common", "Joystick", "JoystickBG", "JoystickBar", "attack-script", "enemy-1", "enemy-generator", "enemy-test-script", "entity-data", "equip-2", "equip-test", "hp-tips-script", "player--test-script", "player-zhuanxiang", "restart-script", "root", "shou", "start-Script" ]);