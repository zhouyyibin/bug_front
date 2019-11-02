
# 接口文档

##登陆
	@post: /login
	@payload:
	    account:string:账号
	    password:string:密码
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
  	        - 50101:账号或者密码不正确
	    success:bool:是否成功
	    msg:string:操作提示
	    data:令牌

####  获取我的信息
	@get: /my/information

    @header:
        Authorization:令牌(必须)
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
	    data:object:用户信息
			id:string:用户主键
 			department_id:string:所属部门
			department:string:部门信息
				id:string:主键
				name:string:名称
	    	role_id:string:角色
			account:string:账号
			name:string：姓名
			parent_id:string:上级
			nice:string:用户名
			position:string:职位
			sex:int:性别，0=女，1=男，2=未知
			phone:String:移动电话
			tel:String:固话
			qq:string:qq
			wechar:string:微信
			login_number:int:登陆次数
			login_number：date：登陆时间

## 用户
####  新增用户
	@post: /user

    @header:
        Authorization:令牌(必须)

	@payload:
	    department_id:string:所属部门
	    role_id:string:角色
		account:string:账号
		name:string：姓名
		parent_id:string:上级
		nice:string:用户名
		position:string:职位
		sex:int:性别，0=女，1=男，2=未知
		phone:String:移动电话
		tel:String:固话
		qq:string:qq
		wechar:string:微信
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	        - 50102:账号已经存在
	    success:bool:是否成功
	    msg:string:操作提示
	    data:
	        
####  获取用户信息
	@get: /user/:id

    @header:
        Authorization:令牌(必须)
	
	@param:
        id:string:用户主键
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
	    data:object:用户信息
			id:string:用户主键
 			department_id:string:所属部门
			department:string:部门信息
				id:string:主键
				name:string:名称
	    	role_id:string:角色
			role:object:角色信息
				id:string:角色主键
 				name:string:角色名称
	    		describe:string:角色描述
				permission:object:权限信息
					name:string:模块名称
					defaultCheck:boolean:是否选中
					action:string:方法标识
					actionEntitySet：array<obje>:方法列表
						action:string:方法标识
						defaultCheck:boolean:是否选中
						describe:string:描述
			account:string:账号
			name:string：姓名
			parent_id:string:上级
			nice:string:用户名
			position:string:职位
			sex:int:性别，0=女，1=男，2=未知
			phone:String:移动电话
			tel:String:固话
			qq:string:qq
			wechar:string:微信
			login_number:int:登陆次数
			login_number：date：登陆时间
	    
####  获取用户信息列表
	@get: /user/list/:page

    @header:
        Authorization:令牌(必须)
	
	@param:
        page:int:页数
		size:int:条数(默认25，当size=-1时，表示获取所有用户信息)
		department_id:string:部门主键
		keyword:string:姓名模糊搜索
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
	    data:array<object>:用户信息列表
			count:int:总条数
			List:array<object>:用户信息
				id:string:用户主键
 				department_id:string:所属部门
				department:string:部门信息
					id:string:主键
					name:string:名称
	    		role_id:string:角色
				account:string:账号
				name:string：姓名
				parent_id:string:上级
				nice:string:用户名
				position:string:职位
				sex:int:性别，0=女，1=男，2=未知
				phone:String:移动电话
				tel:String:固话
				qq:string:qq
				wechar:string:微信
				login_number:int:登陆次数
				login_number：date：登陆时间
	    
####  用户删除
	@delete: /user/:id

    @header:
        Authorization:admin令牌(必须)
	
	@param:
        id:string:用户主键
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示

####  修改用户
	@put: /user/:id

    @header:
        Authorization:令牌(必须)

	@payload:
	    department_id:string:所属部门
	    role_id:string:角色
		name:string：姓名
		parent_id:string:上级
		nice:string:用户名
		position:string:职位
		sex:int:性别，0=女，1=男，2=未知
		phone:String:移动电话
		tel:String:固话
		qq:string:qq
		wechar:string:微信
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	        - 50102:账号已经存在
	    success:bool:是否成功
	    msg:string:操作提示
	    data:

####  修改用户角色
	@put: /user/:id/role

    @header:
        Authorization:令牌(必须)

	@payload:
		id:string:用户主键
		role_id:string:角色主键
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
	    data:
	    

## 部门
####  新增部门
	@post: /department

    @header:
        Authorization:令牌(必须)

	@payload:
	    name:string:部门名称
	    user_id:string:负责人主键
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	        - 50104:部门已经存在
	    success:bool:是否成功
	    msg:string:操作提示
	    data:
	        
####  获取部门信息
	@get: /department/:id

    @header:
        Authorization:令牌(必须)
	
	@param:
        id:string:部门主键
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
	    data:object:=部门信息
			id:string:部门主键
 			name:string:部门名称
	    	user_id:string:负责人主键
	    
####  获取部门信息列表
	@get: /department/list/:page

    @header:
        Authorization:令牌(必须)
	
	@param:
        page:int:页数
		size:int:条数(默认25，当size=-1时，表示获取所有部门信息)
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
	    data:array<object>:用户信息列表
			count:int:总条数
			List:array<object>:用户信息
				id:string:部门主键
 				name:string:部门名称
	    		user_id:string:负责人主键
	    
####  部门删除
	@delete: /department/:id

    @header:
        Authorization:admin令牌(必须)
	
	@param:
        id:string:部门主键
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示


####  修改部门
	@put: /department/:id

    @header:
        Authorization:令牌(必须)

	@payload:
		id:string:部门主键
 		name:string:部门名称
	    user_id:string:负责人主键
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	        - 50103:部门已经存在
	    success:bool:是否成功
	    msg:string:操作提示
	    data:


## 公司
####  新增公司
	@post: /company

    @header:
        Authorization:令牌(必须)

	@payload:
	    name:string:公司名称
	    tax_identification_NO:string:纳税人识别号 
		registered_address：string：注册地址
		office_address：string：办公地址
		tel:string: 联系电话
		fax:string:传真
		zip_code：string:邮政编码
		official_website：string：官网
		intranet：string：内网
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	        - 50103:公司名称已经存在
	    success:bool:是否成功
	    msg:string:操作提示
	    data:
	        
####  获取公司信息
	@get: /company/:id

    @header:
        Authorization:令牌(必须)
	
	@param:
        id:string:公司主键
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
	    data:object:用户信息
			id:string:g公司主键
			name:string:公司名称
	    	tax_identification_NO:string:纳税人识别号 
			registered_address：string：注册地址
			office_address：string：办公地址
			tel:string: 联系电话
			fax:string:传真
			zip_code：string:邮政编码
			official_website：string：官网
			intranet：string：内网
	    	user_id:string:负责人主键
	    
####  获取公司信息列表
	@get: /company/list/:page

    @header:
        Authorization:令牌(必须)
	
	@param:
        page:int:页数
		size:int:条数(默认25，当size=-1时，表示获取所有公司信息)
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
	    data:array<object>:公司信息列表
			count:int:总条数
			List:array<object>:用户信息
				id:string:g公司主键
				name:string:公司名称
	    		tax_identification_NO:string:纳税人识别号 
				registered_address：string：注册地址
				office_address：string：办公地址
				tel:string: 联系电话
				fax:string:传真
				zip_code：string:邮政编码
				official_website：string：官网
				intranet：string：内网
	    		user_id:string:负责人主键
	    
####  公司删除
	@delete: /company/:id

    @header:
        Authorization:admin令牌(必须)
	
	@param:
		id:string:g公司主键
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示


####  修改公司
	@put: /company/:id

    @header:
        Authorization:令牌(必须)

	@payload:
		id:string:g公司主键
		name:string:公司名称
	    tax_identification_NO:string:纳税人识别号 
		registered_address：string：注册地址
		office_address：string：办公地址
		tel:string: 联系电话
		fax:string:传真
		zip_code：string:邮政编码
		official_website：string：官网
		intranet：string：内网
	    user_id:string:负责人主键
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	        - 50103:公司已经存在
	    success:bool:是否成功
	    msg:string:操作提示
	    data:


## 角色
####  新增角色
	@post: /role

    @header:
        Authorization:令牌(必须)

	@payload:
	    name:string:角色名称
	    describe:string:角色描述
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	        - 50105:角色已经存在
	    success:bool:是否成功
	    msg:string:操作提示
	    data:
	        
####  获取角色信息
	@get: /role/:id

    @header:
        Authorization:令牌(必须)
	
	@param:
        id:string:角色主键
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
	    data:object:角色信息
			id:string:角色主键
 			name:string:角色名称
	    	describe:string:角色描述
	    
####  获取角色信息列表
	@get: /role/list/:page

    @header:
        Authorization:令牌(必须)
	
	@param:
        page:int:页数
		size:int:条数(默认25，当size=-1时，表示获取所有角色信息)
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
	    data:array<object>:角色信息列表
			count:int:总条数
			List:array<object>:角色信息
				id:string:角色主键
 				name:string:角色名称
	    		describe:string:角色描述
	    
####  角色删除
	@delete: /role/:id

    @header:
        Authorization:admin令牌(必须)
	
	@param:
        id:string:角色主键
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示


####  修改角色基础信息
	@put: /role/:id

    @header:
        Authorization:令牌(必须)

	@payload:
		id:string:角色主键
 		name:string:角色名称
	    describe:string:角色描述
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	        - 50105:角色已经存在
	    success:bool:是否成功
	    msg:string:操作提示

####  修改角色权限
	@put: /role/:id/permissions

    @header:
        Authorization:令牌(必须)

	@payload:
		id:string:角色主键
 		permissions:array<object>:角色权限列表
			id:string:模块主键
			name:string:模块名称
			actionEntitySet：array<obje>:方法列表
				action:string:方法标识
				defaultCheck:boolean:是否选中
				describe:string:描述
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示

## 权限列表
####  新增权限
	@post: /permission

    @header:
        Authorization:令牌(必须)

	@payload:
		name:string:模块名称
		defaultCheck:boolean:是否选中
		action:string:方法标识
		actionEntitySet：array<obje>:方法列表
			action:string:方法标识
			defaultCheck:boolean:是否选中
			describe:string:描述
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
	    data:

####  修改权限
	@post: /permission/:id

    @header:
        Authorization:令牌(必须)

	@payload:
		id:string:主键
		name:string:模块名称
		defaultCheck:boolean:是否选中
		action:string:方法标识
		actionEntitySet：array<obje>:方法列表
			action:string:方法标识
			defaultCheck:boolean:是否选中
			describe:string:描述
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
	    data:
	        
####  获取权限信息
	@get: /permission/:id

    @header:
        Authorization:令牌(必须)
	
	@param:
        id:string:权限主键
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
	    data:object:权限信息
			id:string:权限主键
			name:string:模块名称
			actionEntitySet：array<obje>:方法列表
			action:string:方法标识
			defaultCheck:boolean:是否选中
			describe:string:描述
	    
####  获取所有权限信息列表
	@get: /permission/list

    @header:
        Authorization:令牌(必须)
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
	    data:array<object>:角色信息列表
			count:int:总条数
			List:array<object>:权限信息
				id:string:权限主键
				name:string:模块名称
				actionEntitySet：array<obje>:方法列表
				action:string:方法标识
				defaultCheck:boolean:是否选中
				describe:string:描述
	    
####  权限删除
	@delete: /permission/:id

    @header:
        Authorization:admin令牌(必须)
	
	@param:
        id:string:权限主键
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示

## BUG列表
####  新增BUG
	@post: /bug

    @header:
        Authorization:令牌(必须)

	@payload:
		sendMails:string:抄送者主键，中间用逗号隔开
		project:string:项目（可动态添加）
		model:string:模块（可动态添加）
		edition:string:版本（可动态添加）
		type:string:bug类型
			- 代码错误
			- 界面优化
			- 配置相关
			- 安装部署
			- 安全相关
			- 性能问题
			- 标准规范
			- 测试脚本
			- 其他
			- 设计缺陷
		hardware_platform:string:硬件平台
			- all
			- pc
			- macintosh
			- other
		operating_system:string:操作系统
			- all
			- windows
			- Mac OS
			- other
		browser:string:浏览器
			- 全部
			- IE系列
			- chrome
			- firefox系列
			- opera系列
			- safari
			- 遨游
			- UC
		title:string:标题
		describe:string:描述
		severity:string:严重程度
			-1=功能改进
			-2=普通问题
			-3=功能缺失
			-4=严重奔溃
			-5=阻碍进度
		priority:int:优先级
			-1=低
			-2=一般
			-3=高
			-4=紧急
		leading_id:string:负责人主键
		start_time:date:开始时间
		settling_time:date:要求解决时间
		annexs:array<string>:附件地址
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 50108:bug已存在
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示

####  修改BUG信息
	@post: /bug/:id/base

    @header:
        Authorization:令牌(必须)

	@payload:
		id:string:主键
		sendMails:string:抄送者主键，中间用逗号隔开
		project:string:项目（可动态添加）
		model:string:模块（可动态添加）
		edition:string:版本（可动态添加）
		type:string:bug类型
			- 代码错误
			- 界面优化
			- 配置相关
			- 安装部署
			- 安全相关
			- 性能问题
			- 标准规范
			- 测试脚本
			- 其他
			- 设计缺陷
		hardware_platform:string:硬件平台
			- all
			- pc
			- macintosh
			- other
		operating_system:string:操作系统
			- all
			- windows
			- Mac OS
			- other
		browser:string:浏览器
			- 全部
			- IE系列
			- chrome
			- firefox系列
			- opera系列
			- safari
			- 遨游
			- UC
		title:string:标题
		describe:string:描述
		severity:string:严重程度
			-1=功能改进
			-2=普通问题
			-3=功能缺失
			-4=严重奔溃
			-5=阻碍进度
		priority:int:优先级
			-1=低
			-2=一般
			-3=高
			-4=紧急
		leading_id:string:负责人主键
		start_time:date:开始时间
		settling_time:date:要求解决时间
		annexs:array<string>:附件地址
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 50108:bug已存在
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
	        
####  获取BUG信息
	@get: /bug/:id

    @header:
        Authorization:令牌(必须)
	
	@param:
        id:string:bug主键
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
	    data:object:bug信息
			id:string:bug主键
			code:int:编号
			sendMailUsers:object:邮件发送人
				id:stirong:主键
				name:string:姓名
				account:string:账号
			project:string:项目
			model:string:模块
			edition:string:版本
			type:string:bug类型
				- 代码错误
				- 界面优化
				- 配置相关
				- 安装部署
				- 安全相关
				- 性能问题
				- 标准规范
				- 测试脚本
				- 其他
				- 设计缺陷
			hardware_platform:string:硬件平台
				- all
				- pc
				- macintosh
				- other
			operating_system:string:操作系统
				- all
				- windows
				- Mac OS
				- other
			browser:string:浏览器
				- 全部
				- IE系列
				- chrome
				- firefox系列
				- opera系列
				- safari
				- 遨游
				- UC
			title:string:标题
			describe:string:描述
			severity:string:严重程度
				-1=功能改进
				-2=普通问题
				-3=功能缺失
				-4=严重奔溃
				-5=阻碍进度
			priority:int:优先级
				-1=低
				-2=一般
				-3=高
				-4=紧急
			leading_id:string:负责人主键
			leading:object:负责人信息
				id:string:主键
				name:string：姓名
				account:string:账号
			start_time:date:开始时间
			settling_time:date:要求解决时间
			annexs:array<string>:附件地址
			status:int:状态：
				0=未确认
				1=已确认
				2=处理中
				3=已解决
				4=已通过
			creator_id:string:创建者主键
			creator_name:string:创建者名称
			creator_time:date:创建时间
			modifier_id:string:更新者主键
			modifier_name:string:更新者姓名
			modifier_time:date:更新时间
			
	    
####  获取BUG信息列表
	@get: /bug/list/:page

    @header:
        Authorization:令牌(必须)
	
	@param:
		keyword:string:标题，模糊搜索
		department:string:部门主键，全部传0或者不传
    	page:int:页码
		size:int:条数
		type:int:类型
			-0=全部
			-1=指派给我的
			-2=由我创建的
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
	    data:array<object>:bug信息列表
			count:int:总条数
			List:array<object>:bug信息
			id:string:bug主键
			code:int:编号
			project:string:项目
			model:string:模块
			edition:string:版本
			type:string:bug类型
				- 代码错误
				- 界面优化
				- 配置相关
				- 安装部署
				- 安全相关
				- 性能问题
				- 标准规范
				- 测试脚本
				- 其他
				- 设计缺陷
			hardware_platform:string:硬件平台
				- all
				- pc
				- macintosh
				- other
			operating_system:string:操作系统
				- all
				- windows
				- Mac OS
				- other
			browser:string:浏览器
				- 全部
				- IE系列
				- chrome
				- firefox系列
				- opera系列
				- safari
				- 遨游
				- UC
			title:string:标题
			describe:string:描述
			severity:string:严重程度
				-1=功能改进
				-2=普通问题
				-3=功能缺失
				-4=严重奔溃
				-5=阻碍进度
			priority:int:优先级
				-1=低
				-2=一般
				-3=高
				-4=紧急
			leading_id:string:负责人主键
			leading:object:负责人信息
				id:string:主键
				name:string：姓名
				account:string:账号
			start_time:date:开始时间
			settling_time:date:要求解决时间
			annexs:array<string>:附件地址
			status:int:状态：
				0=未确认
				1=已确认
				2=处理中
				3=已解决
				4=已通过
			creator_id:string:创建者主键
			creator_name:string:创建者名称
			creator_time:date:创建时间
			modifier_id:string:更新者主键
			modifier_name:string:更新者姓名
			modifier_time:date:更新时间

####  获取BUGTOP前10
	@get: /bug/top/list

    @header:
        Authorization:令牌(必须)
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
	    data:array<object>:bug信息列表
			count:int:总条数
			List:array<object>:bug信息
			id:string:bug主键
			code:int:编号
			project:string:项目
			model:string:模块
			edition:string:版本
			type:string:bug类型
				- 代码错误
				- 界面优化
				- 配置相关
				- 安装部署
				- 安全相关
				- 性能问题
				- 标准规范
				- 测试脚本
				- 其他
				- 设计缺陷
			hardware_platform:string:硬件平台
				- all
				- pc
				- macintosh
				- other
			operating_system:string:操作系统
				- all
				- windows
				- Mac OS
				- other
			browser:string:浏览器
				- 全部
				- IE系列
				- chrome
				- firefox系列
				- opera系列
				- safari
				- 遨游
				- UC
			title:string:标题
			describe:string:描述
			severity:string:严重程度
				-1=功能改进
				-2=普通问题
				-3=功能缺失
				-4=严重奔溃
				-5=阻碍进度
			priority:int:优先级
				-1=低
				-2=一般
				-3=高
				-4=紧急
			leading_id:string:负责人主键
			leading:object:负责人信息
				id:string:主键
				name:string：姓名
				account:string:账号
			start_time:date:开始时间
			settling_time:date:要求解决时间
			annexs:array<string>:附件地址
			status:int:状态：
				0=未确认
				1=已确认
				2=处理中
				3=已解决
				4=已通过
			creator_id:string:创建者主键
			creator_name:string:创建者名称
			creator_time:date:创建时间
			modifier_id:string:更新者主键
			modifier_name:string:更新者姓名
			modifier_time:date:更新时间

####  更新BUG状态
	@put: /bug/:id

    @header:
        Authorization:令牌(必须)

	@payload:
		id:string:bug主键
		describe:string:描述
		annexs:array<string>:附件地址
		status:int:状态：
			0=激活
			1=确认
			2=处理中
			3=解决
			4=通过
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示

####  BUG报表
	@get: /bug/statistics/count

    @header:
        Authorization:令牌(必须)

	@param:
		project:string:项目名称
		department:string:部门主键，全部时传0或者不传
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
		data:arrty<objetc>:数据列表
			name:string:名称
			code:int:类型
				0=所有未解决
				1=所有已解决
				2=所有超时
				10=指派给我未解决
				11=指派给我已解决
				12=指派给我超时
				20=我创建的未解决
				21=我创建的已解决
				22=我创建的超时
				30=项目未解决
				31=项目已解决
				32=项目超时
				40=部门未解决
				41=部门已解决
				42=部门超时
			count:数量

####  获取BUG历史记录信息列表
	@get: /bug/log/list/:bug_id

    @header:
        Authorization:令牌(必须)
	
	@param:
    	bug_id:String:所属BUG
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
	    data:array<object>:bug历史记录信息列表
			count:int:总条数
			List:array<object>:bug历史记录信息
				id:string:bug主键
				bug_id:string:所属BUG
				describe:string:描述
				annexs:array<string>:附件URL
				status:int:状态：
					0=创建
					1=确认
					2=处理中
					3=解决
					4=通过
				creator_id:string:创建者主键
				creator_name:string:创建者名称
				creator_time:date:创建时间


####  根据部门获取BUG信息列表
	@get: /bug/:department/list

    @header:
        Authorization:令牌(必须)
	
	@param:
		department:string:部门ID，全部的话传0
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
	    data:array<object>:bug信息列表
			count:int:总条数
			List:array<object>:bug信息
			id:string:bug主键
			code:int:编号
			project:string:项目
			model:string:模块
			edition:string:版本
			type:string:bug类型
				- 代码错误
				- 界面优化
				- 配置相关
				- 安装部署
				- 安全相关
				- 性能问题
				- 标准规范
				- 测试脚本
				- 其他
				- 设计缺陷
			hardware_platform:string:硬件平台
				- all
				- pc
				- macintosh
				- other
			operating_system:string:操作系统
				- all
				- windows
				- Mac OS
				- other
			browser:string:浏览器
				- 全部
				- IE系列
				- chrome
				- firefox系列
				- opera系列
				- safari
				- 遨游
				- UC
			title:string:标题
			describe:string:描述
			severity:string:严重程度
				-1=功能改进
				-2=普通问题
				-3=功能缺失
				-4=严重奔溃
				-5=阻碍进度
			priority:int:优先级
				-1=低
				-2=一般
				-3=高
				-4=紧急
			leading_id:string:负责人主键
			leading:object:负责人信息
				id:string:主键
				name:string：姓名
				account:string:账号
			start_time:date:开始时间
			settling_time:date:要求解决时间
			annexs:array<string>:附件地址
			status:int:状态：
				0=未确认
				1=已确认
				2=处理中
				3=已解决
				4=已通过
			creator_id:string:创建者主键
			creator_name:string:创建者名称
			creator_time:date:创建时间
			modifier_id:string:更新者主键
			modifier_name:string:更新者姓名
			modifier_time:date:更新时间

####  文件上传
	@post: /upload
	
	@payload:
    	file:文件流
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
	    data:string:文件下载路径

####  富文本文件上传
	@post: /uploadImageData
	
	@payload:文件流
	
	@return:
	    state:String:操作状态
	        - SUCCESS:成功
	        - FAIL:失败
	    url:String:路径
	    title:string:标题
	    original:string:文件名


####  文件下载
	@get: /download
	
	@param:
    	path:string:文件下载路径
	
	@return:
	    文件流


## 系统类别
####  新增系统类别
	@post: /system/classification
    @header:
        Authorization:令牌(必须)
	@payload:
		name:string:系统类别名称
		type:stirng:类型
			-1=项目
			-2=模块
			-3=版本
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	        - 50106：系统类别名字已存在
	    success:bool:是否成功
	    msg:string:操作提示
	    data:
	
####  获取系统类别信息列表
	@get: /system/classification/list/:type
    @header:
        Authorization:令牌(必须)
	@param:
		type:stirng:类型
			-1=项目
			-2=模块
			-3=版本
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
	    data:array<object>:系统类别信息列表
			count:int:总条数
			List:array<object>:系统类别信息
				id:string:系统类别主键
				name:string:系统类别名称
				type:stirng:类型
					-1=项目
					-2=模块
					-3=版本

####  获取系统类别信息
	@get: /system/classification/:id

    @header:
        Authorization:令牌(必须)
	
	@param:
        id:string:权限主键
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
	    data:object:系统类别信息
			id:string:系统类别主键
			name:string:系统类别名称
			type:stirng:类型
				-1=项目
				-2=模块
				-3=版本

####  系统类别删除
	@delete: /system/classification/:id

    @header:
        Authorization:admin令牌(必须)
	
	@param:
        id:string:系统类别主键
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示

## 系统操作日志
####  获取系统操作日志列表
	@get: /system/log/list/:page
    @header:
        Authorization:令牌(必须)
	@param:
		page:int:分页
		size:int:页数
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
	    data:array<object>:系统类别信息列表
			count:int:总条数
			List:array<object>:系统日志信息
				id:string:系统日志主键
				action:string:操作
				content:string:内容
				creatorId:string:创建者主键
				creatorName:string:创建者姓名
				creatorTime:date:创建者时间
				dataId:操作数据主键
				dataName：操作数据名称
	    
	    
####  根据部门下载excel
	@get: /:department/export

    @header:
        Authorization:令牌(必须)
	
	@param:
		department:string:部门ID，全部的话传0
	
	@return:
		数据流



## 项目列表
####  新增项目
	@post: /project

    @header:
        Authorization:令牌(必须)

	@payload:
		name:string:项目名称
		modelBeans:array<Object>:模块列表
			name:string:名称
			leadingId:string:负责人主键
		senderBeans:array<Object>:抄送者列表
			id:用户主键
		versionBeans：array<String>:版本数组
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
	    data:

####  修改项目
	@post: /project/:id

    @header:
        Authorization:令牌(必须)

	@payload:
		id:string:主键
		name:string:项目名称
		modelBeans:array<Object>:模块列表
			name:string:名称
			leadingId:string:负责人主键
		senderBeans:array<Object>:抄送者列表
			id:用户主键
		versionBeans：array<String>:版本数组
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
	    data:
	        
####  获取项目信息
	@get: /project/:id

    @header:
        Authorization:令牌(必须)
	
	@param:
        id:string:权限主键
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
	    data:object:权限信息
			id:string:权限主键
			name:string:项目名称
			modelBeans:array<Object>:模块列表
				name:string:名称
				leadingId:string:负责人主键
				leadingName:string:负责人名称
				leadingAccount:string:负责人账号
			senderBeans:array<Object>:抄送者列表
				id:string:主键
				name:string:名称
				account:string:账号
		versionBeans：array<String>:版本数组
	    
####  获取项目列表
	@get: /project/list/:page

    @header:
        Authorization:令牌(必须)
	
	@param:
		page:int:分页
		size:int:页数
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示
	    data:array<object>:角色信息列表
			count:int:总条数
			List:array<object>:权限信息
				id:string:权限主键
				name:string:项目名称
				modelBeans:array<Object>:模块列表
					name:string:名称
					leadingId:string:负责人主键
					leadingName:string:负责人名称
					leadingAccount:string:负责人账号
				senderBeans:array<Object>:抄送者列表
					id:string:主键
					name:string:名称
					account:string:账号
	    
####  项目删除
	@delete: /project/:id

    @header:
        Authorization:admin令牌(必须)
	
	@param:
        id:string:主键
	
	@return:
	    code:int:操作状态
	        - 200:操作成功
	        - 500:未知错误
	    success:bool:是否成功
	    msg:string:操作提示



