define(function() {
	return {
		/***********会议状态************/
		MeetingState_Idle: 0,       //未开会议
		MeetingState_UnderWay: 1,   //正在召开
		MeetingState_Waiting: 2,    //预约中
		MeetingState_End: 3,        //会议已结束
		
		/***********以下是设备类型常量************/
		EquType_SDI: 0,    //SDI摄像机
		EquType_H323: 1,   //远程H323会场
		EquType_SIP: 2,    //远程SIP会场
		EquType_RTSP: 3,   //远程RTSP会场
		EquType_AUX: 4,    //辅流
		EquType_MP: 5,     //多画面
		EquType_PLAYER: 6, //播放器
		EquType_OUTPUT: 7, //输出设备
		EquType_RECORD: 8, //录制
		EquType_RTMP: 9,   //推送
		EquType_Cnt: 10,
		
		/***********以下是网站中所有URL常量************/
		
		/***********以下是select中需要用到的常量************/
		//音频协议
		AudCode_G711A: 0,
		AudCode_G711C: 1,
		AudCode_G723: 2,
		AudCode_G728: 3,
		AudCode_G729: 4,
		AudCode_G722: 5,
		AudCode_MP3: 6,
		AudCode_AACPlus: 7,
		AudCode_AAC: 8,
		AudCode_G722_1: 9,
		AudCode_G722_1C: 10,
		AudCode_Auto: 11,
		AudCode_Cnt: 12,
		
		//视频协议
		VidProt_H263: 0,
		VidProt_H263P: 1,   //H263 plus
		VidProt_H264: 2,
		VidProt_H264MP: 4,
		VidProt_H264HP: 5,
		VidProt_H264SVC: 3,
		VidProt_Auto: 6,
		VidProt_Cnt: 7,
		
		//视频格式
		VidFmt_QCif: 0,
		VidFmt_Cif: 1,     //CIF
		VidFmt_WCif: 2,    
		VidFmt_480: 3,
		VidFmt_4Cif: 4,     //  4 CIF
		VidFmt_576: 5,
		VidFmt_720: 6,       //720
		VidFmt_1080: 7,      //1080
		VidFmt_640X480: 8,     //VGA
		VidFmt_800X600: 9,     //SVGA
		VidFmt_1024X768: 10,    //XGA
		VidFmt_1280X768: 11,  //WXGA
		VidFmt_1280X800: 12,  //WXGA
		VidFmt_1366X768: 13,    //WXGA
		VidFmt_1280X1024: 14,   //SXGA
		VidFmt_1600X1200: 15,   //UXGA
		VidFmt_1920X1200: 16,   //WUXGA
		VidFmt_Custom: 17, //自定义
		VidFmt_Auto: 18,       //自动
		VidFmt_Cnt: 19,
		
		//图像质量
		VidQuality_Fluency: 0,//流畅
		VidQuality_Clear: 1, //清晰
		
		//视频输入
		VidInPort_CAMERA_DVI1:0,  //HDMI+Ypbpr+VGA
	    VidInPort_CAMERA_3GSDI1:1,
	    VidInPort_PC_VGA:2,       //Ypbpr+VGA
	
	    VidInPort_MBSDI1:3,   //主板SDI输入口1
	    VidInPort_MBSDI2:0,   //主板SDI输入口2
	    VidInPort_MBSDI3:0,   //主板SDI输入口3
	    VidInPort_MBVGA1:0,   //主板VGA输入口1
	    VidInPort_MBVGA2:0,   //主板VGA输入口2
	
	    VidInPort_EXB1SDI1:0, //扩展板1SDI输入口1
	    VidInPort_EXB1SDI2:0, //扩展板1SDI输入口2
	    VidInPort_EXB1SDI3:0, //扩展板1SDI输入口3
	    VidInPort_EXB1VGA1:0, //扩展板1VGA输入口1
	    VidInPort_EXB1VGA2:0, //扩展板1VGA输入口2
	
	    VidInPort_EXB2SDI1:0, //扩展板2SDI输入口1
	    VidInPort_EXB2SDI2:0, //扩展板2SDI输入口2
	    VidInPort_EXB2SDI3:0, //扩展板2SDI输入口3
	    VidInPort_EXB2VGA1:0, //扩展板2VGA输入口1
	    VidInPort_EXB2VGA2:0, //扩展板2VGA输入口2
	
	    VidInPort_MB1VPIN1:0,
	    VidInPort_MB1VPIN2:0,
	    VidInPort_MB2VPIN1:0,
	    VidInPort_MB2VPIN2:0,
	
	    VidInPort_EXB11VPIN1:0,
	    VidInPort_EXB11VPIN2:0,
	    VidInPort_EXB12VPIN1:0,
	    VidInPort_EXB12VPIN2:0,
	
	    VidInPort_EXB21VPIN1:0,
	    VidInPort_EXB21VPIN2:0,
	    VidInPort_EXB22VPIN1:0,
	    VidInPort_EXB22VPIN2:0, 
	    VidInPort_FPGA_MP:30,
	    VidInPort_FPGA_MP2:31,
	    
	    VidInPort_Cnt:32,
	    
	    
	    //视频输出
	    VidOutPort_DVI1:0,   //Ypbpr
	    VidOutPort_DVI2:0,   //HDMI+Ypbpr+VGA
	    VidOutPort_CVBS:0,   
	    VidOutPort_VGA:0,
	    VidOutPort_VGA1:0,
	    VidOutPort_HDMI:0, 
	    VidOutPort_HDMI1:0, 
	    VidOutPort_3GSDI:0,
	
	    VidOutPort_MBDVI1:8,   //主板DVI输出口1 
	    VidOutPort_MBDVI2:9,   //主板DVI输出口2 
	    VidOutPort_MBDVI3:10,   //主板DVI输出口3 
	    VidOutPort_MBDVI4:11,   //主板DVI输出口4 
	
	    VidOutPort_EXB1DVI1:12, //扩展板1DVI输出口1 
	    VidOutPort_EXB1DVI2:13, //扩展板1DVI输出口2 
	    VidOutPort_EXB1DVI3:14, //扩展板1DVI输出口3 
	    VidOutPort_EXB1DVI4:15, //扩展板1DVI输出口4 
	
	    VidOutPort_EXB2DVI1:16, //扩展板2DVI输出口1 
	    VidOutPort_EXB2DVI2:17, //扩展板2DVI输出口2 
	    VidOutPort_EXB2DVI3:18, //扩展板2DVI输出口3 
	    VidOutPort_EXB2DVI4:19, //扩展板2DVI输出口4 
	
	    VidInPort_MB1VPOUT1:20,
	    VidInPort_MB1VPOUT2:21,
	    VidInPort_MB2VPOUT1:22,
	    VidInPort_MB2VPOUT2:23,
	
	    VidInPort_EXB11VPOUT1:24,
	    VidInPort_EXB11VPOUT2:25,
	    VidInPort_EXB12VPOUT1:26,
	    VidInPort_EXB12VPOUT2:27,
	
	    VidInPort_EXB21VPOUT1:28,
	    VidInPort_EXB21VPOUT2:29,
	    VidInPort_EXB22VPOUT1:30,
	    VidInPort_EXB22VPOUT2:31, 
	
	    VidOutPort_MPOut1:32,
	    VidOutPort_MPOut2:33,
	    VidOutPort_MPOut3:34,
	    VidOutPort_MPOut4:35,
	    VidOutPort_MPOut5:36,
	    VidOutPort_MPOut6:37,
	    VidOutPort_MPOut7:38,
	    VidOutPort_MPOut8:39,
	    VidOutPort_MPOut9:40,
	    VidOutPort_MPOut:41,
	
	    VidOutPort_Cnt:42
	};
});
