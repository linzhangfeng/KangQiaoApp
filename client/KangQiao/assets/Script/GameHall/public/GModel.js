var playerData = {
    userName:'',
    nickName:'',
    token:'',
    money:0,
    userId:0,
    phone:"",
    parentId:0,
    parentNickName:"",
    parentUserName:"",
    reset(){
        this.userId = 0;
        this.nickName = "";
        this.token = "";
        this.userName = "";
        this.phone = "";
        this.money = 0;
        this.parentId = 0;
        this.parentNickName = "";
        this.parentUserName = "";
    }
}
window.GModel = {
    player:null,
    init(){
          this.player = GUtils.copyObject(playerData);
    },

    getPlayerData(){
        return this.player
    },

    reset(){
        this.player.reset();
    },

    saveUserLocalStorage(UserData){
        let str = JSON.stringify(UserData);
        cc.sys.localStorage.setItem("UserData",str);
    },

    getUserLocalStorage(){
        let str = cc.sys.localStorage.getItem("UserData");
        if(str){
            return JSON.parse(str);
        }
        return {};
    }
};