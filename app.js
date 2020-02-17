const Server = require('./server');

App({
  userInfo: null,
  server: Server,

  getUserInfo() {
    return new Promise((resolve, reject) => {
      console.log('begin get user info');
      if (this.userInfo) resolve(this.userInfo);

      my.getAuthCode({
        scopes: ['auth_user'],
        success: authcode => {
          console.info(authcode);
          my.getAuthUserInfo({
            success: res => {
              this.userInfo = res;
              this.server.init(authcode, (err) => {
                if (err) { return reject(err); }
                resolve(this.userInfo);
              });
            },
            fail: (err) => {
              reject(err);
            },
          });
        },
        fail: () => {
          reject({});
        },
      });
    });
  },
});
