var host = 'https://kungfunion.club/';
// http://192.168.1.17:8000/
var config = {
  wxlogin: `${host}wx/login/3/`,   //首页
  wxindex: `${host}wx/userinfo/`,   //用户个人
  wxlist: `${host}wx/project/?create_user__serviceteam_id=3`,   //项目列表
  wxslider: `${host}wx/lionimages/?lion=3`,      //轮播图
  wxjilu: `${host}wx/history/`,                  //个人纪录
  wxproject: `${host}wx/project`,
  wxusername: `${host}wx/userinfo/1/`,
  wxzhifu: `${host}wx/order/`,  
  wxallshi: `${host}wx/order/?rid_4_id`,
  wxfenxiang: `${host}wx/project/`                //分享
}
module.exports = config     