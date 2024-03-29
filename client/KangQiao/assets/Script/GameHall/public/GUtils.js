window.GUtils = {
    //转换16进制
    toHex2: function (num) {
        if (!num) return "00";
        if (num < 16) {
            return "0" + num.toString(16);
        }
        return num.toString(16);
    },
    to2d: function (num) {
        if (num < 10) {
            return "0" + num.toString(10);
        }
        return num.toString(10);
    },
    scaleToSize: function (node, w, h) {
        node.setScaleX(w / node.getContentSize().width);
        node.setScaleY(h / node.getContentSize().height);
    },
    parseName: function (max, name) {
        try {
            var l = name.length;
            var blen = 0;
            var len = [];
            var n = 0;
            for (var i = 0; i < l; i++) {
                n = 0;
                if ((name.charCodeAt(i) & 0xff00) != 0) {
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
    getAvatarURI: function (uid, avatar) {
        if (avatar < 1000000) {
            return "user_head/" + avatar + ".png";
        }
        return "user_head/" + uid + "/" + avatar + ".png";
    },
    getSavePath: function () {
        return jsb.fileUtils.getWritablePath() + "Assets/";
    },
    getImageSavePath: function (fileUrl) {
        if (!fileUrl) {
            return;
        }
        var findFlag = "/chess_img/";
        var cutPos = fileUrl.indexOf(findFlag);
        if (cutPos < 0) {
            findFlag = "https://";
            cutPos = fileUrl.indexOf(findFlag);
            if (cutPos < 0) {
                findFlag = "http://";
                cutPos = fileUrl.indexOf(findFlag);
            }
            if (cutPos < 0) {
                return this.getSavePath() + "images/" + fileUrl;
            } else {
                fileUrl = fileUrl.slice(cutPos + findFlag.length);
                findFlag = "/";
                cutPos = fileUrl.indexOf(findFlag);
                var localPath = fileUrl.slice(cutPos + findFlag.length);
                return this.getSavePath() + "images/" + localPath;
            }
            return this.getSavePath() + "images/" + fileUrl;
        } else {
            var localPath = fileUrl.slice(cutPos + findFlag.length);
            return this.getSavePath() + "images/" + localPath;
        }
    },
    hasImageFile: function (f) {
        return jsb.fileUtils.isFileExist(this.getImageSavePath(f));
    },
    format: function (string) {
        var args = arguments;
        var pattern = new RegExp("%([0-9]+)", "g");
        return String(string).replace(pattern
            , function (match, index) {
                if (index == 0 || index >= args.length)
                    throw "Invalid index in format string";
                return args[index];
            });
    },
    Random: function (start, end) {
        return Math.floor(Math.random() * (end - start + 1)) + start;
    },
    randomf: function (start, end) {
        return Math.random() * (end - start) + start;
    },

    pad: function (num, n) {
        var len = num.toString().length;
        while (len < n) {
            num = "0" + num;
            len++;
        }
        return num + "";
    },

    setSpriteFrame: function (node, url) {
        var spriteFrame = cc.loader.getRes(url, cc.SpriteFrame);
        if (spriteFrame) {
            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        } else {
            cc.loader.loadRes(url, cc.SpriteFrame, (err, spriteFrame) => {
                node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        }
    },
    createSprite: function (url) {
        var node = new cc.Node();
        node.addComponent(cc.Sprite);
        this.setSpriteFrame(node, url);
        return node;
    },
    createSprteByURL: function (url, size) {
        cc.log("createSprteByURL:" + url);
        var node = new cc.Node();
        node.addComponent(cc.Sprite);
        if (cc.sys.isNative) {
            var savePath = this.getImageSavePath(url);
            if (this.hasImageFile(savePath)) {
                cc.loader.load(savePath, function (err, img) {
                    if (img) {
                        try {
                            var spriteFrame = new cc.SpriteFrame(img);
                            spriteFrame.name = savePath;
                            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                            node.width = size.width;
                            node.height = size.height;
                        } catch (e) {

                        }
                    }
                });
            } else {
                GHttp.sendHttpImage(url, savePath, function () {
                    cc.loader.load(savePath, function (err, img) {
                        if (img) {
                            try {
                                var spriteFrame = new cc.SpriteFrame(img);
                                spriteFrame.name = savePath;
                                node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                                node.width = size.width;
                                node.height = size.height;
                            } catch (e) {

                            }
                        }
                    });
                });
            }
        } else {
            cc.loader.load(url, function (err, img) {
                if (err) {
                    console.log('loadHeadSpriteFrame--------- 0');
                    console.log(err);
                } else {
                    if (img) {
                        try {
                            console.log('loadHeadSpriteFrame--------- 1');
                            var spriteFrame = new cc.SpriteFrame(img);
                            spriteFrame.name = url;
                            node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                            node.width = size.width;
                            node.height = size.height;
                        } catch (e) {

                        }
                    } else {
                        console.log('loadHeadSpriteFrame--------- 2');
                    }
                }
            });
        }
        return node;
    },
    createLabel: function (txt, fontSize, color, horizontalAlign, verticalAlign) {
        color = undefined == color ? new cc.Color(255, 255, 255) : color;
        var node = new cc.Node();
        var label = node.addComponent(cc.Label);
        label.string = txt;
        label.fontSize = fontSize;
        label.lineHeight = fontSize;
        node.color = color;
        if (undefined != horizontalAlign) {
            label.horizontalAlign = horizontalAlign;
        }
        if (undefined != verticalAlign) {
            label.verticalAlign = verticalAlign;
        }
        return node;
    },
    createSpriteButton: function (noreFrame, pressFrame) {
        var node = new cc.Node();
        node.addComponent(cc.Sprite);
        var btn = node.addComponent(cc.Button);
        btn.transition = cc.Button.Transition.SPRITE;
        btn.name = name;
        cc.loader.loadRes(noreFrame, cc.SpriteFrame, function (err, spriteFrame) {
            btn.normalSprite = spriteFrame;
        });

        cc.loader.loadRes(pressFrame, cc.SpriteFrame, function (err, spriteFrame) {
            btn.pressedSprite = spriteFrame;
        });

        return node;
    },
    setLabelText: function (node, text) {
        var tf = node.getComponent(cc.Label);
        if (tf) tf.string = text;
    },
    setNodeVis: function (node, v) {
        if (node) node.active = v;
    },
    setCmpVis: function (cmp, v) {
        if (cmp) cmp.node.active = v;
    },
    getNodeVis: function (node) {
        if (node) return node.active;
        return false;
    },
    setNodeEnable: function (node, v) {
        if (node) node.getComponent(cc.Button).interactable = v;
    },
    playAnimation: function (node, an) {
        var ani = node.getComponent(cc.Animation);
        if (ani) ani.play(an);
    },
    playAnimationWithDragon: function (node, an, n) {
        var ani = node.getComponent(dragonBones.ArmatureDisplay);
        if (ani) ani.playAnimation(an, n);
    },
    createArray: function (max, value) {
        let arr = [];
        for (var i = 0; i < max; i++) {
            arr.push(value);
        }
        return arr;
    },
    getSex: function (id) {
        if (id == 1) return "man";
        return "female";
    },
    createPrefabNode: function (prefabPath, p, parent, isNeedLoad, callback) {
        if (isNeedLoad) {
            cc.loader.loadRes(prefabPath, cc.Prefab, function (error, prefab) {
                cc.log("lin=createCard:" + error);
                let nodepr = cc.instantiate(prefab);
                if (nodepr) {
                    if (p) nodepr.setPosition(p);
                    if (parent) nodepr.parent = parent;
                    if (callback) callback(nodepr);
                }
            })
        } else {
            let nodepr = cc.instantiate(prefabPath);
            if (nodepr) {
                nodepr.setPosition(p);
                nodepr.parent = parent;
                if (callback) callback(nodepr);
            }
        }
    },

    toHall: function () {
        GSceneMgr.runScene("GameHall");
    },

    addBtnClick: function (btn, btnCallback) {
        let self = this;
        if (!btn) return;
        btn.on('click', btnCallback, this);
    },
    checkMobile: function (s) {
        let length = s.length;
        if (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|)+\d{8})$/.test(s)) {
            return true;
        } else {
            return false;
        }
    },
    copyObject: function (obj) {
        var newobj = {};
        for (var attr in obj) {
            newobj[attr] = obj[attr];
        }
        return newobj;
    },

    timeFormatter: function (value) {
        var da = new Date(parseInt(value.replace("/Date(", "").replace(")/", "").split("+")[0]));
        return da.getFullYear() + "-" + GUtils.polish(da.getMonth() + 1,2) + "-" + GUtils.polish(da.getDate(),2) + " " + GUtils.polish(da.getHours(),2) + ":" + GUtils.polish(da.getMinutes(),2) + ":" + GUtils.polish(da.getSeconds(),2);
    },

    polish: function (num, n) {
        var len = num.toString().length;//num的值转换成字符串并且将它的长度赋值
        while (len < n) {//n是总位数
            num = "0" + num;
            len++;
        }
        return num;
    }
};