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
	
	//日志
	logfile: 'storage/logs/cheese.log',

	//projects type
	projectType: {
		1:	'javascript',
		2: 'java',
		3: 'php',
		4: 'python',
		5: 'c++/c',
		6: 'css'
	},

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
		}
	]	
}
