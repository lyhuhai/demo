$(function(){
	var reg = /^[1-9]\d*$/;//判断整数
	var reg1 = /^\d{0,8}\.{0,1}(\d{1,2})?$/;//判断两位小数
	var reg2 = /^13[123569]{1}\d{8}|15[1235689]\d{8}|166\d{8}|177\d{8}|188\d{8}$/;//判断手机号
	$(".inputTime").each(function(){
		fn($(this),reg,'需要输入正整数');
	});
	$(".inputMoney").each(function(){
		fn($(this),reg1,'金额最多两位小数');
	});
	$("#price_night").each(function(){
		fn($(this),reg1,'金额最多两位小数');
	});
	$("#phone").each(function(){
		fn($(this),reg2,'输入正确的电话号码');
	});
	// 判断输入是否正确
	function  fn(t,reg,info) {
		t.on('change', function () {
			if (!reg.test(t.val())) {
			　　layer.msg(info, {
			　　icon: 2
			　　})
				t.focus();
				t.val("");
				
			};

		});
	}
	// 协议弹窗
	 $("#checkBox span").on('click', function () {
		 layer.confirm("寄租条款： 1.寄租之后禁止私自改密码、租号到期之后，我们客服会联系您进行改密码，改成客服指定的密码。 " +
			 "2.租客租了号，在租号期间内，账号属于租客，滚刀骗人骂人、使用账号内物品等行为肯定会有发生，同时租客在租号期间获得的收益等也都是号主的。 " +
			 "3.如果QQ登录的账号，请打开QQ设备锁，防止租客上您的QQ进行骗人。 " +
			 "4.请清理号里的好友、金币、钻石等物品，防止租客骗好友，刷礼物等行为 " +
			 "6.分成55开，每周一上午9点----下午6点按顺序结账，直接打款给寄租时使用的微信。 " +
			 "7.寄租账号有几率被禁赛、封号等情况，无法避免." +
			 "重要： 1.禁止私聊租客私下租号，如有发现或租客投诉私自联系租客在平台外交易，平台有权没收本号所有收益并下架，把收益全部赠送给举报人，永封该微信ID。 " +
			 "2.禁止顶号及私自改密码，如有客人投诉租号密码错误或有人顶号，平台将扣除该笔订单金额，如多次发生该问题，平台有权没收您全部收益，并强制下架。 " +
			 "3.账号到期超过5小时不进行密码修改，有权对超时商品进行下架处理。 租客的利益永远是我们的根本利益，没有租号的人，我们平台什么也不是，我们什么钱都赚不到，所以请大家一起维护。" +
			 " 平台有人，你们才有钱赚，我们要共同维护平台利益。 本平台最终解释权由北京租手游科技有限公司所有。" +
			 "客服电话:15733995169",{
			 btn: ["同意","取消"]
		 }, function(){
		 	$("#checkBox input").attr("checked",true);
			 layer.close(layer.index);
		 }, function(){
			layer.close(layer.index);
		 });

	 });
	// 提交验证
	$("#submit").on("click",function  () {
		var checked = $("#checkBox input").is(':checked')
        if($('#games option:selected').val()==""){
			$('#games').focus();
			layer.msg('您还未选择游戏类型!',{
				icon: 0
			})
			return false;
		}
		if($('#title').val()==""){
			$('#title').focus();
			layer.msg('您还未填写标题!',{
				icon: 0
			})
			return false;
		}
		// if($('.inputTime').eq(0).val()==""){
		// 	$('.inputTime').eq(0).focus();
		// 	layer.msg('请填写相应时间!',{
		// 		icon: 0
		// 	});
		// 	return false;
		// }else if($('.inputMoney').eq(0).val()==""){
		// 	$('.inputMoney').eq(0).focus();
		// 	layer.msg('请填写相应价格!',{
		// 		icon: 0
		// 	});
		// 	return false;
		// }

		if($('#details').val()==""){
			$('#details').focus();
			layer.msg('您还未填写详情!',{
				icon: 0
			});
			return false;
		}
		if($('#account').val()==""){
			$('#account').focus();
			layer.msg('您还未填写账号!',{
				icon: 0
			});
			return false;
		}
		if($('#password').val()==""){
			$('#password').focus();
			layer.msg('您还未填写密码!',{
				icon: 0
			})
			return false;
		}
		if($('#phone').val()==""){
			$('#phone').focus();
			layer.msg('您还未填写电话!',{
				icon: 0
			})
			return false;
		}
		if(!checked){
			$("#checkBox input").focus();
			layer.msg('您还未阅读协议！', {
				icon: 5
			})
        	return false;
	    }else{
			upload();
			return false;
		}
	})
	// 上传函数
	function upload(){
			var formData = new FormData();
			formData["games"]=$('#games option:selected').val();
			formData["title"]=$('#inputTitle').val();

			formData["time"] = new FormData();
			$(".inputTime").each(function(){
				formData["time"][$(".inputTime").index(this)] = new FormData();
				formData["time"][$(".inputTime").index(this)]["t"] =$(this).val();
				formData["time"][$(".inputTime").index(this)]["m"] =$(".inputMoney").eq($(".inputTime").index(this)).val();
			})

			formData["price"]=$('#inputPrice').val();
			formData["details"]=$('#textarea').val();
			formData["account"]=$('#account').val();
			formData["password"]=$('#inputPassword3').val();
			formData["tel"]=$('#inputTel3').val();
			console.log(JSON.stringify(formData))
			$.ajax({
				url: "upload.php",//接收地址
				type: "POST",
				data: formData,
				contentType: false,
				processData: false,
				success: function (data) {
					if (data.status == "true") {
						layer.msg('上传成功！',{
							icon: 6
						})
					}
					if (data.status == "error") {
						layer.msg(data.msg,{
							icon: 0
						})
					}
				},
				error: function () {
					layer.msg("上传失败！",{
						icon: 5
					})
				}
			});
	}
	// 标题提示信息
	$("#title").on("focus",function  () {
		$("#titleInfo").slideDown();
	})
	$("#title").on("blur",function  () {
		$("#titleInfo").slideUp();
	})

 })