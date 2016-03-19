var Services = require("../../services");
var config = require("../../../config");
var loader = require("loader");
var Project = Services.Project;
var Note = Services.Note;
var User = Services.User;
var render = require("../../../common/render");
var markdown = require("../../../common/markdownHelper");

//list page controller
exports.index = function *(id){
    var pageno = this.request.query.pageno;
	pageno = pageno || config.pageno;
	var page_size = config.page_size;
    
    //读取数据
    var data = yield [
        Project.findById(id),
        Note.findAll({projectId: id},null,{limit: config.page_size,skip: page_size * (pageno-1)})
    ];
	var exeauthor = [];
	data[1].forEach(function(item){
		exeauthor.push(User.findById(item.createId,"_id name avatar"));	
	});
	var authors = yield exeauthor;
	for(var i = 0;i<data[1].length;i++){
		data[1][i].author = authors[i];
	}	
	data[0].content = markdown.markdown(data[0].content);
    //读取模板
	this.body = yield render('opensrc/note_list',{
		project: data[0],
        notes: data[1],
		Loader: loader,
		config: config,
		title: '开源笔记-技术说',
		curpos: 'opensrc_notelist',
		curuser: this.session && this.session.passport && this.session.passport.user
	});	
}

exports.add = function *(){
     var projectId = this.query.proid;
     var data = yield Project.findById(projectId,"_id name starred watchers forks language github_url home like_count visit_count");
     console.log(data);
     this.body = yield render('opensrc/note_add',{
        project: data,
		Loader: loader,
		config: config,
        projectId: projectId,
		title: '添加开源笔记-技术说',
		curpos: 'opensrc_noteadd',
		curuser: this.session && this.session.passport && this.session.passport.user
	});	

}
