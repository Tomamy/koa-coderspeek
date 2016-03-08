/*
* config
*/

module.exports = {
	// debug 为 true 时，用于本地调试
	debug: true,
	port: 3000,
	// 社区的域名
	host: 'localhost',
	name: 'Coderspeek', //社区名字
	description: '',
	keywords: '',
	
	// mongodb 配置
	db: 'mongodb://127.0.0.1/coderspeek',

	// redis 配置，默认是本地
	redis_host: '127.0.0.1',
	redis_port: 6379,
	redis_db: 0,
    
    //cookie key
    cookie_name: 'coderspeek',//default 'koa.sid'
    cookie_sign: ['koa','coderspeek'],
	//日志
	logfile: 'storage/logs/cheese.log',

    //auth
    github: {
        clientID: '10bd9e6edd19bff27d67',
        clientSecret: 'a3dcd5328c050aa995ef198eb924c3acb741e1cb',
        callbackURL: 'http://localhost:3000/auth/github/callback' 
    },
	
	//分页
	page_size: 3,
	pageno: 1,
	
	//导航
	navis: [
		{
			id: 1,
			name: '大牛',
			code: 'daniel_list',
			url: '/daniel/list'
		},
		{
			id: 2,
			name: '开源项目',
			code: 'opensrc_list',
			url: '/opensrc/list'
		},
		{
			id: 3,
			name: '实践',
			code: 'practice_list',
			url: '/practice/list'
		},
        {
            id: 4,
            name: '程序故事',
            code: 'code_list',
            url: '/code/list'
        }
	]	
}
