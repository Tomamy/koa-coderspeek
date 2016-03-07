var url = require("url");
var Services = require("../../services");
var config = require("../../../config");
var https = require("../../../common/https");
var auth = require("../../middlewares/auth");
var loader = require("loader");
var Project = Services.Project;

/*
	* 获取大牛列表数据，分页查询数据
	* @params {string} [pageno] page number
	* return null;
*/
exports.list = function *(){
	var pageno = this.request.query['pageno'];
	pageno = pageno ||  config.pageno;
	var page_size = config.page_size;
	
	this.type = 'json';
	//读取数据
    var data = yield Project.findAll(null,'name language starred visit_count like_count',{limit: config.page_size,skip: page_size * (pageno-1)});

	if(!data || data.length <= 0){
		this.body = JSON.stringify({status: false,count: 2,data:'Empty'});
	}else {
        var ret = {
            list: data,
            pageno: pageno
        };
		this.body = JSON.stringify({status: true,count: 0,data: ret});
	}
}

/*
    * 保存数据
    * @params {string} 
*/
exports.saveProject = function *(){
	this.type = 'json';
    //权限检查
	if(!auth.isAuth(this)){	
		this.body = JSON.stringify({status: false,count: 1,data:'Not Auth'});
		return;	
	}
    var project = yield Project.findOne({github_url: this.request.body.github_url},"_id");
    if(project){
	    this.body = JSON.stringify({status: false,count: 6,data:{id: project._id} });
        return;
    }
	console.log(this.request.body);
    var result = yield Project.insertOpensrc(this.request.body,this.session.passport.user._id);
    if(result){
        this.body = JSON.stringify({status: true,count: 1,data: {id: result._id}});
    }else {
        this.body = JSON.stringify({status: false,count: 3,data: "Failed"});
    } 	
}

exports.getGitProject = function *(){
	var github_url = this.query.giturl;
	if(!github_url || github_url && !/(http|https)\:\/\/github\.com\/[^\/\s]+\/[^\/\s]+$/.test(github_url)){
        this.body = {status: false,count: 0,data: "Invalid Arguments"};
		return;
	}
	var api_url = github_url.replace(/https:\/\/[^\/]+/,"https://api.github.com/repos");
	var options = url.parse(api_url);
	options.headers = {
		"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36",
		"Accept":"application/json, text/javascript"	
	};
	var saveData = yield Project.findOne({github_url: github_url},"_id");	
	if(saveData){
        this.body = { status: false,count: 4,data: saveData };
		return;
	}
	var data = yield https.get(options);
	this.type = "json";
	if(!data){
        this.body = {status: false,count: 6,data: "Down Failed！" };
		return;
	}
	try{
		this.body = {status: true,count: 0,data: JSON.parse(data)};
	}catch(e){
		this.body = {status: true,count: 3,data: "Json Parse Failed"};
	}
}

