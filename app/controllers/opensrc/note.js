var Services = require("../../services");
var config = require("../../../config");
var loader = require("loader");
var Project = Services.Project;
var Note = Services.Note;
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
	data[0].content = markdown.markdown(data[0].content);

    //读取模板
	this.body = yield render('opensrc/note_list',{
		data: data,
		Loader: loader,
		config: config,
		title: '开源笔记-技术说',
		curpos: 'opensrc_notelist',
		curuser: this.session && this.session.passport && this.session.passport.user
	});	
}


