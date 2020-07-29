window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  BaseBox: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0ac6fsYImNIE7x+6TFQGsg8", "BaseBox");
    "use strict";
    cc.Class({
      extends: GBaseComponent,
      properties: {},
      onLoad: function onLoad() {},
      initData: function initData() {
        this.topNode = null;
        this.listenerFinish = null;
      },
      initUI: function initUI(topNode) {
        this.topNode = topNode;
        var backBtn = cc.find("BackBtn", this.topNode);
        var finishBtn = cc.find("FinishBtn", this.topNode);
        GUtils.setNodeVis(finishBtn, false);
        GUtils.addBtnClick(backBtn, function(event) {
          GUtils.setNodeVis(this.node, false);
        }.bind(this));
        GUtils.addBtnClick(finishBtn, function(event) {
          this.listenerFinish && this.listenerFinish();
        }.bind(this));
      },
      start: function start() {},
      addListenerFinish: function addListenerFinish(listener) {
        this.listenerFinish = listener;
        this.setFinishBtnVis(true);
      },
      setFinishBtnVis: function setFinishBtnVis(v) {
        var finishBtn = cc.find("FinishBtn", this.topNode);
        GUtils.setNodeVis(finishBtn, v);
      },
      setTitle: function setTitle(title) {
        var headTitle = cc.find("HeadTitle", this.topNode);
        GUtils.setLabelText(headTitle, title);
      }
    });
    cc._RF.pop();
  }, {} ],
  ChangeNameBox: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "02e6aYzLM1D6LOMNNpfHBm1", "ChangeNameBox");
    "use strict";
    var BasePopBox = require("BaseBox");
    cc.Class({
      extends: BasePopBox,
      properties: {},
      onLoad: function onLoad() {
        this.initData();
        this.initUI();
      },
      start: function start() {},
      initData: function initData() {},
      initUI: function initUI() {
        this.setRootNode(this.node);
        var headNode = this.findNode("PopHead");
        this._super(headNode);
        this.addListenerFinish(function() {
          PopBoxMgr.hideChangeNameBox();
        }.bind(this));
      }
    });
    cc._RF.pop();
  }, {
    BaseBox: "BaseBox"
  } ],
  Config: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4b147zZKhRO8ZwLwz/j1jbW", "Config");
    "use strict";
    window.PageType = {
      HomePage: 1,
      TradePage: 2,
      SpreadPage: 3,
      UserCenterPage: 4
    };
    window.PageName = {
      1: "\u9996\u9875",
      2: "\u4ea4\u6613",
      3: "\u63a8\u5e7f",
      4: "\u6211\u7684"
    };
    cc._RF.pop();
  }, {} ],
  Demo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "18878zKbjlK6ZhWCxXZVtxU", "Demo");
    "use strict";
    cc.Class({
      extends: GBaseComponent,
      properties: {},
      onLoad: function onLoad() {
        this.initData();
        this.initUI();
      },
      initData: function initData() {},
      initUI: function initUI() {
        this.setRootNode(this.node);
        this.addBtnClick(this.findNode("public/head/huodong_btn"));
        this.addBtnClick(this.findNode("public/head/wodetuiguang_btn"));
        this.addBtnClick(this.findNode("tuiguang/head/tuiguang_btn"));
        this.addBtnClick(this.findNode("tuiguang/head/zhishu_btn"));
        this.addBtnClick(this.findNode("tuiguang/head/yeji_btn"));
        this.setTuiGuangNodeVis(false);
      },
      start: function start() {},
      btnCallback: function btnCallback(event) {
        cc.log("btnCallback:", event.node.name);
        switch (event.node.name) {
         case "huodong_btn":
          this.setTuiGuangNodeVis(false);
          break;

         case "wodetuiguang_btn":
         case "tuiguang_btn":
          this.showTuiGuang(3);
          break;

         case "zhishu_btn":
          this.showTuiGuang(1);
          break;

         case "yeji_btn":
          this.showTuiGuang(2);
        }
      },
      showTuiGuang: function showTuiGuang(type) {
        this.setTuiGuangNodeVis(true);
        var zhishuchaxun = this.findNode("tuiguang/zhishuchaxun");
        var yejichaxun = this.findNode("tuiguang/yejichaxun");
        var wodetuiguang = this.findNode("tuiguang/wodetuiguang");
        if (1 == type) {
          GUtils.setNodeVis(zhishuchaxun, true);
          GUtils.setNodeVis(yejichaxun, false);
          GUtils.setNodeVis(wodetuiguang, false);
        } else if (2 == type) {
          GUtils.setNodeVis(zhishuchaxun, false);
          GUtils.setNodeVis(yejichaxun, true);
          GUtils.setNodeVis(wodetuiguang, false);
        } else if (3 == type) {
          GUtils.setNodeVis(zhishuchaxun, false);
          GUtils.setNodeVis(yejichaxun, false);
          GUtils.setNodeVis(wodetuiguang, true);
        }
      },
      setTuiGuangNodeVis: function setTuiGuangNodeVis(v) {
        var tuiguangNode = this.findNode("tuiguang");
        GUtils.setNodeVis(tuiguangNode, v);
      }
    });
    cc._RF.pop();
  }, {} ],
  GArrayUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "220b00wZ8NF1pKK7koMJfad", "GArrayUtils");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    window.GArrayUtils = {
      isArray: function isArray(ob) {
        if ("object" == ("undefined" === typeof ob ? "undefined" : _typeof(ob)) && "number" == typeof ob.length) return true;
        return false;
      },
      zeroArray: function zeroArray(pDstArray, wDstLen) {
        cc.assert(2 == arguments.length, "ErrorArgumentsLength.ZeroArray.");
        for (var i = 0; i < wDstLen; i++) pDstArray[i] = 0;
      },
      copyArray: function copyArray(srcArray) {
        cc.assert(1 == arguments.length);
        var newByteAry = [];
        newByteAry = newByteAry.concat(srcArray);
        return newByteAry;
      },
      memset: function memset() {
        if (!GArrayUtils.isArray(arguments[0])) return;
        if (3 == arguments.length) {
          if ("number" == typeof arguments[2]) {
            for (var i = 0; i < arguments[2]; i++) arguments[0][i] = arguments[1];
            return;
          }
          ZeroArrayStruct(arguments[0], arguments[1], arguments[2]);
        }
        if (4 == arguments.length) {
          "number" == typeof arguments[3] ? memset2(arguments[0], arguments[1], arguments[2], arguments[3]) : ZeroArrayStruct2(arguments[0], arguments[1], arguments[2], arguments[3]);
          return;
        }
      }
    };
    window.SetArrayFormUtf8 = function(pDstArray, szSrcString) {
      cc.assert(2 == arguments.length);
      var pCodeAry = ToUnicode(szSrcString);
      SetArray(pDstArray, pCodeAry);
    };
    window.SetArray = function(pDstArray, pSrcArray, wSrcLength) {
      cc.assert(arguments.length >= 2);
      var wMaxLen = pDstArray.length;
      var wCurLen = 3 == arguments.length ? wSrcLength : pSrcArray.length;
      wCurLen > wMaxLen && cc.assert(wCurLen < wMaxLen, "ErrorArray.SetArray.CurLen:" + wCurLen + ",MaxLen:" + wMaxLen);
      for (var i = 0; i < wCurLen; i++) pDstArray[i] = pSrcArray[i];
    };
    window.ZeroArray = function(pDstArray, wDstLen) {
      cc.assert(2 == arguments.length, "ErrorArgumentsLength.ZeroArray.");
      for (var i = 0; i < wDstLen; i++) pDstArray[i] = 0;
    };
    window.memset = function() {
      if (!IsArray(arguments[0])) {
        YQYAssertAlert(false, "memset.arguments.aryDst is not array");
        return;
      }
      if (3 == arguments.length) {
        if ("number" == typeof arguments[2]) {
          for (var i = 0; i < arguments[2]; i++) arguments[0][i] = arguments[1];
          return;
        }
        ZeroArrayStruct(arguments[0], arguments[1], arguments[2]);
      }
      if (4 == arguments.length) {
        "number" == typeof arguments[3] ? memset2(arguments[0], arguments[1], arguments[2], arguments[3]) : ZeroArrayStruct2(arguments[0], arguments[1], arguments[2], arguments[3]);
        return;
      }
    };
    window.memset2 = function(aryDst, value, wDstLen0, wDstLen1) {
      if (void 0 == aryDst || void 0 == value || void 0 == wDstLen0 || void 0 == wDstLen1) {
        cc.assert(false, "arguments.undefined");
        return false;
      }
      for (var i = 0; i < wDstLen0; i++) {
        aryDst[i] = [];
        for (var j = 0; j < wDstLen1; j++) aryDst[i][j] = value;
      }
    };
    window.memset3 = function(aryDst, value, wDstLen0, wDstLen1, wDstLen2) {
      if (void 0 == aryDst || void 0 == value || void 0 == wDstLen0 || void 0 == wDstLen1 || void 0 == wDstLen2) {
        cc.assert(false, "arguments.undefined");
        return false;
      }
      for (var i = 0; i < wDstLen0; i++) {
        aryDst[i] = [];
        for (var j = 0; j < wDstLen1; j++) {
          aryDst[i][j] = [];
          for (var k = 0; k < wDstLen2; k++) aryDst[i][j][k] = value;
        }
      }
    };
    window.ZeroArray2 = function(pDstArray, wArrayCount, wDstLen) {
      if (void 0 == pDstArray || void 0 == wArrayCount || void 0 == wDstLen) {
        cc.assert(false, "arguments.undefined");
        return false;
      }
      cc.assert(3 == arguments.length, "ErrorArgumentsLength.ZeroArray.");
      for (var i = 0; i < wArrayCount; i++) {
        pDstArray[i] = [];
        for (var j = 0; j < wDstLen; j++) pDstArray[i][j] = 0;
      }
    };
    window.ZeroArrayStruct = function(pDstArray, wDstLen, pDstObject) {
      if (void 0 == wDstLen || void 0 == pDstObject || void 0 == pDstArray) {
        cc.assert(false, "arguments.undefined");
        return false;
      }
      if (YQYAssertAlert(pDstObject)) return false;
      if (YQYAssertAlert(3 == arguments.length)) return false;
      for (var i = 0; i < wDstLen; i++) pDstArray[i] = new pDstObject();
    };
    window.ZeroArrayStruct2 = function(pDstArray, wArrayCount, wDstLen, pDstObject) {
      if (void 0 == pDstArray || void 0 == wArrayCount || void 0 == wDstLen || void 0 == pDstObject) {
        cc.assert(false, "arguments.undefined");
        return false;
      }
      if (YQYAssertAlert(pDstObject)) return false;
      if (YQYAssertAlert(4 == arguments.length)) return false;
      for (var i = 0; i < wArrayCount; i++) {
        pDstArray[i] = [];
        for (var j = 0; j < wDstLen; j++) pDstArray[i][j] = new pDstObject();
      }
    };
    window.CopyArray = function(srcArray) {
      cc.assert(1 == arguments.length);
      var newByteAry = [];
      newByteAry = newByteAry.concat(srcArray);
      return newByteAry;
    };
    window.CopyArray2 = function(srcArray) {
      cc.assert(1 == arguments.length);
      var newByteAry = [];
      for (var i = 0; i < srcArray.length; i++) newByteAry[i] = CopyArray(srcArray[i]);
      return newByteAry;
    };
    window.CopyObject = function(srcObject, objectType) {
      cc.assert(2 == arguments.length);
      var pNewObject = new objectType();
      var pProperty = Object.getOwnPropertyNames(srcObject);
      for (var i = 0; i < pProperty; i++) pNewObject[pProperty[i]] = srcObject[pProperty[i]];
      return pNewObject;
    };
    window.CopyArrayObject = function(srcObjectArray, objectType) {
      cc.assert(2 == arguments.length);
      var srcCount = srcObjectArray.length;
      var newArray = [];
      for (var i = 0; i < srcCount; i++) newArray[i] = CopyObject(srcObjectArray[i], objectType);
      return newArray;
    };
    window.CopyArrayValue = function(dstArray, srcArray) {
      cc.assert(srcArray.length <= dstArray.length);
      for (var i = 0; i < srcArray.length; i++) dstArray[i] = srcArray[i];
    };
    window.ConcatArray = function() {
      var newAry = [];
      for (var i = 0; i < arguments.length; i++) newAry = newAry.concat(arguments[i]);
      return newAry;
    };
    window.ShiftArray = function(srcArray, start, srcLen) {
      var newByteAry = srcArray.splice(start, srcLen);
      return newByteAry;
    };
    window.SliceArray = function(srcArray, start, srcLen) {
      var newByteAry = srcArray.slice(start, start + srcLen);
      return newByteAry;
    };
    window.ContainValue = function(srcArray, value) {
      for (var i = 0; i < srcArray.length; i++) if (srcArray[i] == value) return i;
      return -1;
    };
    window.FindArrayValue = function(srcArray, value) {
      for (var i = 0; i < srcArray.length; i++) if (srcArray[i] == value) return i;
      return -1;
    };
    window.YQLogicArrayCount = function(srcArray) {
      var wCount = 0;
      for (var i = 0; i < srcArray.length; i++) 0 != srcArray[i] && wCount++;
      return wCount;
    };
    window.IsFindArrayValue = function(srcArray, value) {
      for (var i = 0; i < srcArray.length; i++) if (srcArray[i] == value) return true;
      return false;
    };
    window.IsKeyArrayValue = function(srcArray, value) {
      for (var key in srcArray) if (srcArray[key] == value) return true;
      return false;
    };
    window.DeleteObject = function(srcArray, pObject) {
      for (var i = 0; i < srcArray.length; i++) if (srcArray[i] == pObject) {
        srcArray.splice(i, 1);
        return true;
      }
      return false;
    };
    window.ArrayDeleteObject = function(srcArray, pObject) {
      for (var i = 0; i < srcArray.length; i++) if (srcArray[i] == pObject) {
        srcArray.splice(i, 1);
        return true;
      }
      return false;
    };
    window.sizeof = function(obj) {
      var pObject = new obj();
      return TStruct.GetDataSize(pObject);
    };
    window.ToUnicode = function(str) {
      var codes = [];
      var len = str.length;
      for (var i = 0; i < len; i++) {
        cc.assert("string" == typeof str[i], "CMD_Value.Conver.Error.str is not string");
        codes[i] = str.charCodeAt(i);
      }
      return codes;
    };
    window.ToUtf8 = function(array) {
      var tempArray = "";
      for (var i = 0; i < array.length; i++) {
        if (0 == array[i]) break;
        "number" == typeof array[i] && (tempArray += String.fromCharCode(array[i]));
      }
      return tempArray;
    };
    window.AH_SetItemByKey = function(jsArray, key, tItemData) {
      jsArray[key] = tItemData;
    };
    window.AH_GetItemByKey = function(jsArray, key) {
      return jsArray[key];
    };
    window.AH_AddArrayItem = function(jsArray, key, tItemData) {
      void 0 == jsArray[key] && (jsArray[key] = []);
      jsArray[key].push(tItemData);
    };
    window.AH_DeleteItemByKey = function(jsArray, key) {
      jsArray[key] = void 0;
      return null;
    };
    window.ArrayToggle = cc.Class({
      name: "ArrayToggle",
      properties: {
        array: [ cc.Toggle ]
      }
    });
    window.ArrayNode = cc.Class({
      name: "ArrayNode",
      properties: {
        array: [ cc.Node ]
      }
    });
    window.ArrayLabel = cc.Class({
      name: "ArrayLabel",
      properties: {
        array: [ cc.Label ]
      }
    });
    window.InsertObject = function(array, value) {
      if (0 == array.length) {
        array.push(value);
        return;
      }
      var isInsert = false;
      for (var i = 0; i < array.length; i++) if (array[i] > value) {
        array.splice(i, 0, value);
        isInsert = true;
        return;
      }
      if (!isInsert) {
        array.push(value);
        return;
      }
    };
    window.IsNumber = function(str, strlen) {
      var n = Number(str);
      if (isNaN(n) || 0 == str.length) return false;
      if (2 == arguments.length && str.length != strlen) return false;
      return true;
    };
    window.GetArrInvalidNum = function(ary, data, length) {
      var num = 0;
      for (var i = 0; i < length; i++) ary[i] != data && num++;
      return num;
    };
    cc._RF.pop();
  }, {} ],
  GBaseComponent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c195dh7HkxKmaMJ7BdBumGl", "GBaseComponent");
    "use strict";
    window.GBaseComponent = cc.Class({
      extends: cc.Component,
      properties: {},
      rootNode: null,
      onLoad: function onLoad() {},
      start: function start() {},
      update: function update(dt) {},
      setRootNode: function setRootNode(rootNode) {
        this.rootNode = rootNode;
      },
      addBtnClick: function addBtnClick(btn) {
        var self = this;
        if ("help" == btn.name) {
          btn.on("touchstart", function() {
            GUtils.setNodeVis(cc.find("helptip", self.rootNode), true);
          }, this);
          btn.on("touchend", function() {
            GUtils.setNodeVis(cc.find("helptip", self.rootNode), false);
          }, this);
          btn.on("touchcancel", function() {
            GUtils.setNodeVis(cc.find("helptip", self.rootNode), false);
          }, this);
        } else btn.on("click", this.btnCallback, this);
      },
      btnCallback: function btnCallback(event) {},
      findNode: function findNode(path) {
        if (!this.rootNode) {
          cc.log("please set base rootNode");
          return null;
        }
        var node = cc.find(path, this.rootNode);
        node || cc.error("find node url:" + path + " fail");
        return node;
      },
      hide: function hide() {
        console.log("lin=hide:" + this.tag);
        GUtils.setNodeVis(this.node, false);
      },
      show: function show() {
        console.log("lin=show:" + this.tag);
        GUtils.setNodeVis(this.node, true);
      }
    });
    cc._RF.pop();
  }, {} ],
  GHotUpdateMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2e9c8MgN+ZDJ5rvQt1tJfSs", "GHotUpdateMgr");
    "use strict";
    var SubGameAssetsType = {
      CheckUpdate: 1,
      UpdateDownLoad: 2
    };
    var SubGameManager = {
      _storagePath: [],
      _hotupdateTask: [],
      _downloadCallback: null,
      _finishCallback: null,
      _assetsManager: null,
      _gameName: null,
      checkCallBack: function checkCallBack(event) {
        var update = false;
        switch (event.getEventCode()) {
         case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
          console.log("No local manifest file found, hot update skipped.");
          break;

         case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
         case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
          console.log("Fail to download manifest file, hot update skipped.");
          break;

         case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
          console.log("Already up to date with the latest remote version.");
          break;

         case jsb.EventAssetsManager.NEW_VERSION_FOUND:
          console.log("New version found, please try to update.");
          update = true;
          break;

         default:
          return;
        }
        this._assetsManager.setEventCallback(null);
        this._downloadCallback && this._downloadCallback(update);
      },
      updateCallBack: function updateCallBack(event) {
        var finished = false;
        var failed = false;
        cc.log("lin=======================\u6709\u66f4\u65b0\u56de\u8c03. code=" + event.getEventCode());
        switch (event.getEventCode()) {
         case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
          console.log("No local manifest file found, hot update skipped.");
          failed = true;
          break;

         case jsb.EventAssetsManager.UPDATE_PROGRESSION:
          var percentByFile = event.getPercentByFile();
          cc.log("=======================UPDATE_PROGRESSION." + percentByFile);
          cc.log("=======================UPDATE_PROGRESSION." + event.getMessage());
          isNaN(percentByFile) && (percentByFile = 0);
          var fPercent = (100 * percentByFile).toFixed(0);
          fPercent > 0 && this._downloadCallback && this._downloadCallback(percentByFile);
          break;

         case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
          console.log("ERROR_DOWNLOAD_MANIFEST");

         case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
          console.log("Fail to download manifest file, hot update skipped.");
          failed = true;
          break;

         case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
          console.log("Already up to date with the latest remote version.");
          failed = true;
          break;

         case jsb.EventAssetsManager.UPDATE_FINISHED:
          console.log("Update finished. " + event.getMessage());
          finished = true;
          break;

         case jsb.EventAssetsManager.UPDATE_FAILED:
          console.log("Update failed. " + event.getMessage());
          break;

         case jsb.EventAssetsManager.ERROR_UPDATING:
          console.log("Asset update error: " + event.getAssetId() + ", " + event.getMessage());
          break;

         case jsb.EventAssetsManager.ERROR_DECOMPRESS:
          console.log("ERROR_DECOMPRESS");
          console.log(event.getMessage());
        }
        if (failed) {
          this._assetsManager.setEventCallback(null);
          this._finishCallback && this._finishCallback(false);
        }
        if (finished) {
          this._assetsManager.setEventCallback(null);
          this._finishCallback && this._finishCallback(true);
        }
      },
      _getfiles: function _getfiles(name, type, downloadCallback, finishCallback) {
        this._storagePath[name] = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "ALLGame/" + name;
        this._downloadCallback = downloadCallback;
        this._finishCallback = finishCallback;
        this._gameName = name;
        var UIRLFILE = "http://119.23.221.227:80/hotupdate/" + name;
        var customManifestStr = JSON.stringify({
          packageUrl: UIRLFILE + "/",
          remoteManifestUrl: UIRLFILE + "/project.manifest",
          remoteVersionUrl: UIRLFILE + "/version.manifest",
          version: "0.0.1",
          assets: {},
          searchPaths: []
        });
        var cachedManifest = this._storagePath[name] + "/project.manifest";
        jsb.fileUtils.isDirectoryExist(this._storagePath[name]) || jsb.fileUtils.createDirectory(this._storagePath[name]);
        jsb.fileUtils.writeStringToFile(customManifestStr, cachedManifest);
        cc.log("lin=\u66f4\u65b0\u914d\u7f6e:" + customManifestStr);
        var assetsManager = new jsb.AssetsManager("", this._storagePath[name]);
        assetsManager.setMaxConcurrentTask(3);
        assetsManager.setVerifyCallback(this.verifyCB.bind(this));
        cc.log("lin=\u66f4\u65b0\u914d\u7f6e:" + customManifestStr);
        var manifest = new jsb.Manifest(customManifestStr, this._storagePath[name]);
        cc.log("lin=\u66f4\u65b0\u914d\u7f6e:" + JSON.stringify(manifest));
        assetsManager.loadLocalManifest(manifest, this._storagePath[name]);
        this._assetsManager = assetsManager;
        if (type == SubGameAssetsType.CheckUpdate) {
          assetsManager.setEventCallback(this.checkCallBack.bind(this));
          assetsManager.checkUpdate();
        } else if (type == SubGameAssetsType.UpdateDownLoad) {
          assetsManager.setEventCallback(this.updateCallBack.bind(this));
          assetsManager.update();
          cc.log("lin=\u5f00\u59cb\u66f4\u65b0");
        }
      },
      verifyCB: function verifyCB(filePath, asset) {
        cc.log("===========================filePath:", filePath);
        cc.log("===============asset_m:", asset.md5);
        cc.log("===============asset_p:", asset.path);
        cc.log("===============asset_c:", asset.compressed);
        cc.log("===============asset_d:", asset.downloadState);
        return true;
      },
      downloadSubGame: function downloadSubGame(name, progress, finish) {
        this._getfiles(name, 2, progress, finish);
      },
      enterSubgame: function enterSubgame(name) {
        if (!this._storagePath[name]) {
          this.downloadSubGame(name);
          return;
        }
        var path = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "ALLGame/";
        jsb && jsb.fileUtils && jsb.fileUtils.addSearchPath(path, true);
        cc.log("lin=mainJS=path:" + this._storagePath[name] + "/src/main.js");
        require("./JsTest");
        require("./JsTest.js");
        window.require((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "ALLGame/laohuji/src/main.js");
      },
      isSubGameDownLoad: function isSubGameDownLoad(name) {
        var file = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "ALLGame/" + name + "/project.manifest";
        return !!jsb.fileUtils.isFileExist(file);
      },
      checkSubGameUpdate: function checkSubGameUpdate(name, isUpdateCallback) {
        this._getfiles(name, SubGameAssetsType.CheckUpdate, isUpdateCallback, null);
      },
      startDownLoadSubGame: function startDownLoadSubGame(name, loadCallback, finishCallback) {
        this._getfiles(name, SubGameAssetsType.UpdateDownLoad, loadCallback, finishCallback);
      }
    };
    module.exports = SubGameManager;
    cc._RF.pop();
  }, {
    "./JsTest": "JsTest",
    "./JsTest.js": "JsTest"
  } ],
  GHotUpdate: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8bbd9EBUs5AkYmeKUMWaxT5", "GHotUpdate");
    "use strict";
    var SubGameManager = require("GHotUpdateMgr");
    cc.Class({
      extends: GBaseComponent,
      properties: {
        downloadBtn: {
          default: null,
          type: cc.Node
        },
        downloadLabel: {
          default: null,
          type: cc.Label
        }
      },
      onLoad: function onLoad() {
        this.initData();
        this.initUI();
        this.checkDownLoad();
      },
      checkDownLoad: function checkDownLoad() {
        var _this = this;
        if (!cc.sys.isNative) return;
        var name = this.name;
        cc.log("lin=\u5224\u65ad\u5b50\u6e38\u620f\u662f\u5426\u4e0b\u8f7d?");
        if (SubGameManager.isSubGameDownLoad(name)) {
          cc.log("lin=\u5224\u65ad\u5b50\u6e38\u620f\u5df2\u4e0b\u8f7d\uff0c\u68c0\u6d4b\u5b50\u6e38\u620f\u662f\u5426\u9700\u8981\u66f4\u65b0");
          SubGameManager.checkSubGameUpdate(name, function(success) {
            if (success) {
              cc.log("lin=\u5b50\u6e38\u620f\u9700\u8981\u66f4\u65b0");
              _this.downloadLabel.string = "\u5b50\u6e38\u620f\u9700\u8981\u66f4\u65b0";
            } else {
              cc.log("lin=\u5b50\u6e38\u620f\u4e0d\u9700\u8981\u66f4\u65b0");
              _this.downloadLabel.string = "\u5b50\u6e38\u620f\u4e0d\u9700\u8981\u66f4\u65b0";
            }
          });
        } else {
          cc.log("lin=\u5b50\u6e38\u620f\u672a\u4e0b\u8f7d!");
          this.downloadLabel.string = "\u5b50\u6e38\u620f\u672a\u4e0b\u8f7d";
        }
      },
      initUI: function initUI() {
        var downloadBtn = cc.find("DownBtn", this.node);
        this.addBtnClick(downloadBtn);
        if (!cc.sys.isNative) {
          GUtils.setNodeVis(this.downloadBtn, false);
          GUtils.setCmpVis(this.downloadLabel, false);
          return;
        }
      },
      initData: function initData() {
        this.name = "laohuji";
      },
      btnCallback: function btnCallback(event) {
        cc.log("btnCallback:", event.node.name);
        switch (event.node.name) {
         case "DownBtn":
          this.onBtnDownLaod();
        }
      },
      onBtnDownLaod: function onBtnDownLaod() {
        var _this2 = this;
        var name = this.name;
        var self = this;
        SubGameManager.startDownLoadSubGame(name, function(progress) {
          isNaN(progress) && (progress = 0);
          _this2.downloadLabel.string = "\u8d44\u6e90\u4e0b\u8f7d\u4e2d   " + parseInt(100 * progress) + "%";
        }, function(success) {
          if (success) {
            SubGameManager.enterSubgame(name);
            cc.log("lin=\u4e0b\u8f7d\u5b8c\u6210");
          } else cc.log("lin=\u4e0b\u8f7d\u5931\u8d25");
        });
      }
    });
    cc._RF.pop();
  }, {
    GHotUpdateMgr: "GHotUpdateMgr"
  } ],
  GSceneMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "85623h0mcpJ9L9hLpx4Bb/W", "GSceneMgr");
    "use strict";
    window.GSceneMgr = {
      loadScenePath: "LoadScene",
      runScene: function runScene(szSceneDesc, isShowLoad) {
        isShowLoad ? this.runLoadScene(function(scene) {
          var jsLoadScene = cc.find("Canvas", scene).getComponent("LoadScene");
          jsLoadScene.loadScene(szSceneDesc);
        }) : cc.director.loadScene(szSceneDesc);
      },
      runLoadScene: function runLoadScene(callback) {
        cc.director.loadScene(this.loadScenePath, function(err, scene) {
          !err && cc.sys.isNative;
          callback && void 0 != callback && callback(scene, err);
        });
      }
    };
    cc._RF.pop();
  }, {} ],
  GUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "53d04AL1DtLsbbL7WonIrW8", "GUtils");
    "use strict";
    window.GUtils = {
      toHex2: function toHex2(num) {
        if (!num) return "00";
        if (num < 16) return "0" + num.toString(16);
        return num.toString(16);
      },
      to2d: function to2d(num) {
        if (num < 10) return "0" + num.toString(10);
        return num.toString(10);
      },
      scaleToSize: function scaleToSize(node, w, h) {
        node.setScaleX(w / node.getContentSize().width);
        node.setScaleY(h / node.getContentSize().height);
      },
      parseName: function parseName(max, name) {
        try {
          var l = name.length;
          var blen = 0;
          var len = [];
          var n = 0;
          for (var i = 0; i < l; i++) {
            n = 0;
            if (0 != (65280 & name.charCodeAt(i))) {
              blen++;
              n++;
            }
            blen++;
            n++;
            len[i] = n;
          }
          if (blen > max) {
            n = 0;
            for (var i = 0; i < l; i++) {
              n += len[i];
              if (n >= max) {
                n = i + 1;
                break;
              }
            }
            return name.substr(0, n) + "..";
          }
          return name;
        } catch (e) {
          return "";
        }
      },
      getAvatarURI: function getAvatarURI(uid, avatar) {
        if (avatar < 1e6) return "user_head/" + avatar + ".png";
        return "user_head/" + uid + "/" + avatar + ".png";
      },
      getSavePath: function getSavePath() {
        return jsb.fileUtils.getWritablePath() + "Assets/";
      },
      getImageSavePath: function getImageSavePath(fileUrl) {
        if (!fileUrl) return;
        var findFlag = "/chess_img/";
        var cutPos = fileUrl.indexOf(findFlag);
        if (cutPos < 0) {
          findFlag = "https://";
          cutPos = fileUrl.indexOf(findFlag);
          if (cutPos < 0) {
            findFlag = "http://";
            cutPos = fileUrl.indexOf(findFlag);
          }
          if (cutPos < 0) return this.getSavePath() + "images/" + fileUrl;
          fileUrl = fileUrl.slice(cutPos + findFlag.length);
          findFlag = "/";
          cutPos = fileUrl.indexOf(findFlag);
          var localPath = fileUrl.slice(cutPos + findFlag.length);
          return this.getSavePath() + "images/" + localPath;
        }
        var localPath = fileUrl.slice(cutPos + findFlag.length);
        return this.getSavePath() + "images/" + localPath;
      },
      hasImageFile: function hasImageFile(f) {
        return jsb.fileUtils.isFileExist(this.getImageSavePath(f));
      },
      format: function format(string) {
        var args = arguments;
        var pattern = new RegExp("%([0-9]+)", "g");
        return String(string).replace(pattern, function(match, index) {
          if (0 == index || index >= args.length) throw "Invalid index in format string";
          return args[index];
        });
      },
      Random: function Random(start, end) {
        return Math.floor(Math.random() * (end - start + 1)) + start;
      },
      randomf: function randomf(start, end) {
        return Math.random() * (end - start) + start;
      },
      pad: function pad(num, n) {
        var len = num.toString().length;
        while (len < n) {
          num = "0" + num;
          len++;
        }
        return num + "";
      },
      setSpriteFrame: function setSpriteFrame(node, url) {
        var spriteFrame = cc.loader.getRes(url, cc.SpriteFrame);
        spriteFrame ? node.getComponent(cc.Sprite).spriteFrame = spriteFrame : cc.loader.loadRes(url, cc.SpriteFrame, function(err, spriteFrame) {
          node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
      },
      createSprite: function createSprite(url) {
        var node = new cc.Node();
        node.addComponent(cc.Sprite);
        this.setSpriteFrame(node, url);
        return node;
      },
      createSprteByURL: function createSprteByURL(url, size) {
        cc.log("createSprteByURL:" + url);
        var node = new cc.Node();
        node.addComponent(cc.Sprite);
        if (cc.sys.isNative) {
          var savePath = this.getImageSavePath(url);
          this.hasImageFile(savePath) ? cc.loader.load(savePath, function(err, img) {
            if (img) try {
              var spriteFrame = new cc.SpriteFrame(img);
              spriteFrame.name = savePath;
              node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
              node.width = size.width;
              node.height = size.height;
            } catch (e) {}
          }) : GHttp.sendHttpImage(url, savePath, function() {
            cc.loader.load(savePath, function(err, img) {
              if (img) try {
                var spriteFrame = new cc.SpriteFrame(img);
                spriteFrame.name = savePath;
                node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                node.width = size.width;
                node.height = size.height;
              } catch (e) {}
            });
          });
        } else cc.loader.load(url, function(err, img) {
          if (err) {
            console.log("loadHeadSpriteFrame--------- 0");
            console.log(err);
          } else if (img) try {
            console.log("loadHeadSpriteFrame--------- 1");
            var spriteFrame = new cc.SpriteFrame(img);
            spriteFrame.name = url;
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            node.width = size.width;
            node.height = size.height;
          } catch (e) {} else console.log("loadHeadSpriteFrame--------- 2");
        });
        return node;
      },
      createLabel: function createLabel(txt, fontSize, color, horizontalAlign, verticalAlign) {
        color = void 0 == color ? new cc.Color(255, 255, 255) : color;
        var node = new cc.Node();
        var label = node.addComponent(cc.Label);
        label.string = txt;
        label.fontSize = fontSize;
        label.lineHeight = fontSize;
        node.color = color;
        void 0 != horizontalAlign && (label.horizontalAlign = horizontalAlign);
        void 0 != verticalAlign && (label.verticalAlign = verticalAlign);
        return node;
      },
      createSpriteButton: function createSpriteButton(noreFrame, pressFrame) {
        var node = new cc.Node();
        node.addComponent(cc.Sprite);
        var btn = node.addComponent(cc.Button);
        btn.transition = cc.Button.Transition.SPRITE;
        btn.name = name;
        cc.loader.loadRes(noreFrame, cc.SpriteFrame, function(err, spriteFrame) {
          btn.normalSprite = spriteFrame;
        });
        cc.loader.loadRes(pressFrame, cc.SpriteFrame, function(err, spriteFrame) {
          btn.pressedSprite = spriteFrame;
        });
        return node;
      },
      setLabelText: function setLabelText(node, text) {
        var tf = node.getComponent(cc.Label);
        tf && (tf.string = text);
      },
      setNodeVis: function setNodeVis(node, v) {
        node && (node.active = v);
      },
      setCmpVis: function setCmpVis(cmp, v) {
        cmp && (cmp.node.active = v);
      },
      getNodeVis: function getNodeVis(node) {
        if (node) return node.active;
        return false;
      },
      setNodeEnable: function setNodeEnable(node, v) {
        node && (node.getComponent(cc.Button).interactable = v);
      },
      playAnimation: function playAnimation(node, an) {
        var ani = node.getComponent(cc.Animation);
        ani && ani.play(an);
      },
      playAnimationWithDragon: function playAnimationWithDragon(node, an, n) {
        var ani = node.getComponent(dragonBones.ArmatureDisplay);
        ani && ani.playAnimation(an, n);
      },
      createArray: function createArray(max, value) {
        var arr = [];
        for (var i = 0; i < max; i++) arr.push(value);
        return arr;
      },
      getSex: function getSex(id) {
        if (1 == id) return "man";
        return "female";
      },
      createPrefabNode: function createPrefabNode(prefabPath, p, parent, isNeedLoad, callback) {
        if (isNeedLoad) cc.loader.loadRes(prefabPath, cc.Prefab, function(error, prefab) {
          cc.log("lin=createCard:" + error);
          var nodepr = cc.instantiate(prefab);
          if (nodepr) {
            p && nodepr.setPosition(p);
            parent && (nodepr.parent = parent);
            callback && callback(nodepr);
          }
        }); else {
          var nodepr = cc.instantiate(prefabPath);
          if (nodepr) {
            nodepr.setPosition(p);
            nodepr.parent = parent;
            callback && callback(nodepr);
          }
        }
      },
      toHall: function toHall() {
        GSceneMgr.runScene("GameHall");
      },
      addBtnClick: function addBtnClick(btn, btnCallback) {
        var self = this;
        if (!btn) return;
        btn.on("click", btnCallback, this);
      }
    };
    cc._RF.pop();
  }, {} ],
  GameHall: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c6a728UG/tBt512sQPwEwKQ", "GameHall");
    "use strict";
    cc.Class({
      extends: GBaseComponent,
      properties: {
        tag: "GameHall"
      },
      onLoad: function onLoad() {
        console.log("lin=onLoad:" + this.tag);
      },
      initUI: function initUI() {
        this.setRootNode(this.node);
        var popLayer = this.findNode("PopLayer");
        PopBoxMgr.init(popLayer);
        var tableLayer = this.findNode("TableLayer");
        TableMgr.init(tableLayer);
        var publicLayer = this.findNode("PublicLayer");
        PublicMgr.init(publicLayer);
        this.addBtnClick(this.findNode("EnterGameBtn"));
      },
      btnCallback: function btnCallback(event) {
        cc.log("btnCallback:", event.node.name);
        switch (event.node.name) {
         case "EnterGameBtn":
          this.toGameRoom();
        }
      },
      initData: function initData() {},
      start: function start() {
        console.log("lin=start:" + this.tag);
        this.setRootNode(this.node);
        this.initUI();
        this.initData();
      },
      update: function update(dt) {},
      toGameRoom: function toGameRoom() {
        GSceneMgr.runScene("LaoHuJi");
      }
    });
    cc._RF.pop();
  }, {} ],
  GameLogin: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "895af01RXVN57FPyXI1+53E", "GameLogin");
    "use strict";
    cc.Class({
      extends: GBaseComponent,
      properties: {},
      onLoad: function onLoad() {
        this.setRootNode(this.node);
        this.initUI();
        this.initData();
      },
      initUI: function initUI() {
        cc.log("lin=initUI");
        this.addBtnClick(this.findNode("LoginBtn"));
      },
      initData: function initData() {},
      btnCallback: function btnCallback(event) {
        cc.log("btnCallback:", event.node.name);
        switch (event.node.name) {
         case "LoginBtn":
          this.toGameHall();
        }
      },
      toGameHall: function toGameHall() {
        GSceneMgr.runScene("GameHall_v", true);
      },
      start: function start() {},
      update: function update(dt) {}
    });
    cc._RF.pop();
  }, {} ],
  HeadMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6435f4aRjhF/r+i6qBEd+Aj", "HeadMgr");
    "use strict";
    var HeadMgr = {
      rootNode: null,
      init: function init(rootNode) {
        this.rootNode = rootNode;
        this.rootJs = node.getComponents("Head");
      },
      updateInfo: function updateInfo(playerData) {
        this.rootJs.setName(playerData.name);
        this.rootJs.setMoney(playerData.money);
      }
    };
    cc._RF.pop();
  }, {} ],
  Head: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3de00xpii5Ej77leENVeReW", "Head");
    "use strict";
    cc.Class({
      extends: GBaseComponent,
      properties: {},
      onLoad: function onLoad() {
        this.setRootNode(this.node);
        this.initData();
        this.initUI();
      },
      start: function start() {},
      initData: function initData() {},
      initUI: function initUI() {},
      setName: function setName(name) {
        var node = this.findNode("name");
        GUtils.setLabelText(node, name);
      },
      setMoney: function setMoney(money) {
        var node = this.findNode("money");
        GUtils.setLabelText(node, money);
      },
      setHeadSpriteFrame: function setHeadSpriteFrame(spriteFrame) {}
    });
    cc._RF.pop();
  }, {} ],
  HomePage: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ca479XtxC1PD7B2Z88I3H9l", "HomePage");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  JsTest: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9a378T4JKBET6SA94SU3vSe", "JsTest");
    "use strict";
    console.log("lin=test:requre:console");
    cc.log("lin=test:requre:cc.log");
    cc._RF.pop();
  }, {} ],
  LoadScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d4018V5sqpITZoLizfcV71h", "LoadScene");
    "use strict";
    cc.Class({
      extends: GBaseComponent,
      properties: {},
      onLoad: function onLoad() {
        this.setRootNode(this.node);
        this.initUI();
        this.initData();
      },
      initUI: function initUI() {
        this.setBarPercent(0);
      },
      initData: function initData() {
        "";
      },
      start: function start() {},
      update: function update(dt) {},
      setBarPercent: function setBarPercent(precent) {
        var progressbar = this.findNode("ProgressBar");
        progressbar.progress = precent / 100;
      },
      loadScene: function loadScene(scenePath) {
        var self = this;
        cc.director.preloadScene(scenePath, function(completedCount, totalCount, item) {
          var percent = (100 * completedCount / totalCount).toFixed(2);
          self.setBarPercent(percent);
        }, function(err, data) {
          setTimeout(function() {
            GSceneMgr.runScene(scenePath);
          }, 500);
        });
      }
    });
    cc._RF.pop();
  }, {} ],
  PopBoxMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "683f91/bXZDT6uN/SDT1ZjO", "PopBoxMgr");
    "use strict";
    window.PopBoxMgr = {
      rootNode: null,
      rootJs: null,
      init: function init(rootNode) {
        this.rootNode = rootNode;
        GUtils.setNodeVis(this.rootNode, true);
        var userInfoBox = cc.find("UserInfo", this.rootNode);
        GUtils.setNodeVis(userInfoBox, false);
        var changeNameBox = cc.find("ChangeName", this.rootNode);
        GUtils.setNodeVis(changeNameBox, false);
      },
      showUserInfoBox: function showUserInfoBox() {
        var box = cc.find("UserInfo", this.rootNode);
        var jsBox = box.getComponent("UserInfoBox");
        jsBox.show();
      },
      hideUserInfoBox: function hideUserInfoBox() {
        var box = cc.find("UserInfo", this.rootNode);
        var jsBox = box.getComponent("UserInfoBox");
        jsBox.hide();
      },
      showChangeNameBox: function showChangeNameBox() {
        var box = cc.find("ChangeName", this.rootNode);
        var jsBox = box.getComponent("ChangeNameBox");
        jsBox.show();
      },
      hideChangeNameBox: function hideChangeNameBox() {
        var box = cc.find("ChangeName", this.rootNode);
        var jsBox = box.getComponent("ChangeNameBox");
        jsBox.show();
      },
      showUserCenter: function showUserCenter(type) {
        var userCenterLayout = cc.find("UserCenterLayout", this.rootNode);
        var jsUserCenterLayout = userCenterLayout.getComponent("UserCenterPopBox");
        var userInfoLayout = cc.find("UserCenterLayout/UserInfoLayout", this.rootNode);
        var changNameLayout = cc.find("UserCenterLayout/ChangeNameLayout", this.rootNode);
        if (type == PopBoxMgr.UserCenter.None) {
          GUtils.setNodeVis(userCenterLayout, false);
          jsUserCenterLayout.return;
        }
        GUtils.setNodeVis(userCenterLayout, true);
        GUtils.setNodeVis(userInfoLayout, PopBoxMgr.UserCenter.UserInfo == type);
        GUtils.setNodeVis(changNameLayout, PopBoxMgr.UserCenter.ChangeName == type);
      },
      reset: function reset() {}
    };
    PopBoxMgr.UserCenter = {
      None: -1,
      ChangeName: 1,
      UserInfo: 2
    };
    cc._RF.pop();
  }, {} ],
  PublicMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c65e4nGXsZL+IMpwQWBUW6S", "PublicMgr");
    "use strict";
    window.PublicMgr = {
      tag: "PublicMgr",
      rootNode: null,
      rootJs: null,
      init: function init(rootNode) {
        this.rootNode = rootNode;
        for (var key in PageType) {
          var nodeName = "BottomNode/Button_" + PageType[key];
          GUtils.addBtnClick(cc.find(nodeName, this.rootNode), this.btnCallback.bind(this));
        }
      },
      btnCallback: function btnCallback(event) {
        cc.log("btnCallback:", event.node.name);
        var btnName = event.node.name;
        if (-1 != btnName.indexOf("Button_")) {
          var nameArr = btnName.split("_");
          TableMgr.showPage(parseInt(nameArr[1]));
          this.setTitleName(PageName[nameArr[1]]);
        }
      },
      setTitleName: function setTitleName(titleName) {
        var titleLabel = cc.find("HeadNode/Title", this.rootNode);
        GUtils.setLabelText(titleLabel, titleName);
      },
      reset: function reset() {}
    };
    cc._RF.pop();
  }, {} ],
  SpreadPage: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9e9054YVuJKmJPvhP9OByrO", "SpreadPage");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  TableMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aa5d6Xka3FKzL0V0CdhY1EG", "TableMgr");
    "use strict";
    window.TableMgr = {
      rootNode: null,
      rootJs: null,
      init: function init(rootNode) {
        this.rootNode = rootNode;
      },
      showPage: function showPage(type) {
        var homePage = cc.find("HomePageLayer", this.rootNode);
        var OrderPage = cc.find("OrderPageLayer", this.rootNode);
        var UserPage = cc.find("UserPageLayer", this.rootNode);
        var SpreadPage = cc.find("SpreadPageLayer", this.rootNode);
        GUtils.setNodeVis(homePage, PageType.HomePage == type);
        GUtils.setNodeVis(OrderPage, PageType.TradePage == type);
        GUtils.setNodeVis(UserPage, PageType.UserCenterPage == type);
        GUtils.setNodeVis(SpreadPage, PageType.SpreadPage == type);
      },
      reset: function reset() {}
    };
    cc._RF.pop();
  }, {} ],
  TradePage: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e236bTI8qdCYKGTXqX4OaQ9", "TradePage");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  UserCenterPage: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8df16flN+JJc6bTFtWxlEiK", "UserCenterPage");
    "use strict";
    cc.Class({
      extends: GBaseComponent,
      properties: {},
      onLoad: function onLoad() {},
      start: function start() {
        this.initData();
        this.initUI();
      },
      initData: function initData() {},
      initUI: function initUI() {
        this.setRootNode(this.node);
        this.addBtnClick(this.findNode("ContentLayout/UserInfo"));
        this.addBtnClick(this.findNode("ContentLayout/SettingItem"));
      },
      btnCallback: function btnCallback(event) {
        cc.log("btnCallback:", event.node.name);
        switch (event.node.name) {
         case "UserInfo":
          PopBoxMgr.showUserInfoBox();
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  UserInfoBox: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b091aSaNkhER5GnZYNeMW0r", "UserInfoBox");
    "use strict";
    var BasePopBox = require("BaseBox");
    cc.Class({
      extends: BasePopBox,
      properties: {
        tag: "UserInfoBox"
      },
      onLoad: function onLoad() {
        console.log("lin=onLoad:" + this.tag);
      },
      start: function start() {
        console.log("lin=start:" + this.tag);
        this.initData();
        this.initUI();
      },
      initData: function initData() {},
      initUI: function initUI() {
        this.setRootNode(this.node);
        var headNode = this.findNode("PopHead");
        this._super(headNode);
        var userInfoItem = this.findNode("ContentLayout/UserInfoItem_1");
        GUtils.addBtnClick(userInfoItem, function() {
          PopBoxMgr.showChangeNameBox();
        });
      }
    });
    cc._RF.pop();
  }, {
    BaseBox: "BaseBox"
  } ]
}, {}, [ "GBaseComponent", "BaseBox", "ChangeNameBox", "UserInfoBox", "HomePage", "SpreadPage", "TradePage", "UserCenterPage", "Config", "GameHall", "GameLogin", "GHotUpdate", "GHotUpdateMgr", "JsTest", "LoadScene", "GSceneMgr", "PopBoxMgr", "PublicMgr", "TableMgr", "GArrayUtils", "GUtils", "Demo", "HeadMgr", "Head" ]);