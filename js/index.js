(function (window) {
    var ua = navigator.userAgent.toLowerCase() || navigator.vendor || window.opera;
    var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 /=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f  );r=e.charCodeAt(f  );i=e.charCodeAt(f  );s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t this._keyStr.charAt(s) this._keyStr.charAt(o) this._keyStr.charAt(u) this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9 /=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f  ));o=this._keyStr.indexOf(e.charAt(f  ));u=this._keyStr.indexOf(e.charAt(f  ));a=this._keyStr.indexOf(e.charAt(f  ));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t String.fromCharCode(n);if(u!=64){t=t String.fromCharCode(r)}if(a!=64){t=t String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n  ){var r=e.charCodeAt(n);if(r<128){t =String.fromCharCode(r)}else if(r>127&&r<2048){t =String.fromCharCode(r>>6|192);t =String.fromCharCode(r&63|128)}else{t =String.fromCharCode(r>>12|224);t =String.fromCharCode(r>>6&63|128);t =String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t =String.fromCharCode(r);n  }else if(r>191&&r<224){c2=e.charCodeAt(n 1);t =String.fromCharCode((r&31)<<6|c2&63);n =2}else{c2=e.charCodeAt(n 1);c3=e.charCodeAt(n 2);t =String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n =3}}return t}}
    var data = {
        searchTxt: "",
        viewHeight: document.body.clientHeight,
        AllowLogIn: false,
        groupId: "",
        userId: "",
        password:"",
        game: game,
        lineName:"",
        params: params,
        gameName: "",
        isFirst: true,
        work: "",
        loading:false
    }
    var vm = new Vue({
        el: "#main",
        data: data,
        computed: {
            PageHeight: function () {
                return this.viewHeight - 147 + "px"
            },
            quest_List: function () {
                var newList = [];
                for (var i = 0; i < this.allContent.length; i++) {
                    if (this.allContent[i].question.indexOf(this.searchTxt) != -1) {
                        newList.push(this.allContent[i])
                    }
                }
                return newList
            },
            args: function () {
                var ret = {};
                var str = this.params;
                if (!str) {
                    return ret;
                }
                var seg = str.replace(/^\?/, "").split('&');

                for (var i = seg.length - 1; i >= 0; i--) {
                    if (!seg[i]) {
                        continue;
                    }
                    var s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }

                return ret;
            },
            canSubmit: function () {
                if (this.gameName != "" && this.work != "" && this.loading!=true) {
                    return true
                } else {
                    return false
                }
            }
        },
        mounted: function () {
            this.viewHeight = document.body.clientHeight;
            window.addEventListener('resize', this.heightChange);
        },
        created: function () {
            if (this.args.groupId && this.args.userId) {
                this.groupId = this.args.groupId;
                this.userId = this.args.userId;
                this.lineName= Base64.decode(this.args.displayName);
                this.isFirst = (this.args.isFirst == '1') ? false : true;
                // var xhr = new XMLHttpRequest();
                // var self = this;
                // self.AllowLogIn = true;
                // xhr.open("GET", "https://spreadsheets.google.com/feeds/list/1K8IaCofyQGbxJD9tvzAWthDGGUyM_JwYuNhgBKbpSsA/1/public/values?alt=json");
                // xhr.send();
                // xhr.onreadystatechange = function () {
                //     if (xhr.readyState == 4) {
                //         if (xhr.status == 200) {
                //             var data = JSON.parse(xhr.responseText);
                //             var ListData = [];
                //             var str;
                //             if(data['feed']['entry']){
                //                 for (var i = 0; i < data['feed']['entry'].length; i++) {
                //                     if (data['feed']['entry'][i]['gsx$groupid']['$t'] == self.groupId && data['feed']['entry'][i]['gsx$userid']['$t'] == self.userId) {
                //                         self.gameName = data['feed']['entry'][i]['gsx$gamename']['$t'];
                //                         self.work = data['feed']['entry'][i]['gsx$gamework']['$t'];
                                       
                //                     }
                //                 }
                //             }

                //         }
                //     }
                // }

            }

        },

        methods: {
            heightChange: function (event) {
                var screenHeight = document.body.clientHeight;
                this.viewHeight = screenHeight;
            },
            submitForm: function () {
                var today = new Date();
                var self = this;
                this.loading=true;
                var currentDateTime =

                    today.getFullYear() + '/' +

                    (today.getMonth() + 1) + '月/' +

                    today.getDate() + '日 ' +

                    today.getHours() + ':' + today.getMinutes();
                // $.ajax({
                //     type: "post",
                //     url: "https://script.google.com/macros/s/AKfycbyq_Pqe593G_Z2kz3U2niiUGDOqDHx6-a8vTu8nKuZMz7oWKKU/exec",
                //     data: {
                //         "time": currentDateTime,
                //         "groupID": self.groupId,
                //         "userID": self.userId,
                //         "name": self.gameName,
                //         "work": self.work,
                //         "game": self.game
                //     },

                //     success: function (response) {
                //         alert("簽到成功");
                //         window.location.reload();
                //     }
                // });

            }

        }
    })
})(window);