﻿var vo = require( "./vo" ),
    oldpage = -1;

/**
*  
*  Pagination Node.js Library
*  
*  Author    : Kenshin
*  Emil      : kenshin@ksria.com
*  version   : 1.0
*  Date      : 2012-5-5
*  Blog      : http://www.k-zone.cn/zblog
*  Project   : https://github.com/kenshin/node-pagination
*  Dual licensed under the MIT or GPL Version 2 licenses
*  
*  Copyright 2012
* 
* total      : 总数
* page       : 当前页
* pagesize   : 每页包含的内容
* offset     : 偏移量（例如1 2 3 4 5 6，点击6时，产生4 5 6 7 8 9，而非 7 8 9 10 11 12）
* length     : 步长
* 
*/
exports.build = function( total, page, pagesize, offset, length ) {
	
	//最后一页
	//计算方法：最大文章数 / 每页文章数
	var lastpage   = Math.ceil( total / pagesize );
	
	//共有多少个分页
	var loopcount  = Math.ceil( lastpage / pagesize );
	
	//重新计算
	page = page    > lastpage ? 1 : page;
	
	//前一页、后一页
	var previous   = parseInt( page ) - 1;
	var next       = parseInt( page ) + 1;
	
	//是否显示前一页/后一页
	var isprevious, isnext;
	isnext     = next - 1             < lastpage ? true : false;
	isprevious = parseInt( previous ) > 0        ? true : false;

	//开始 结束 步长
	var begin, end, step;
	//计算步长
	step       = lastpage >  length       ? length         : lastpage;
	//计算开始
	//1 2 3 4 5 6
	//点击6时，产生4 5 6 7 8 9
	//而非 7 8 9 10 11 12
	//if ( lastpage - page < step ) {
	//	begin   = lastpage - step + 1;
	//}
	//else if ( offset > 0 ) {
	//	begin   = page    <= offset        ? 1              : page - offset;
	//}
	if ( offset > 0 ) {
		begin   = page   <= offset         ? 1              : page - offset;
	}
	else if ( offset == 0 && page == 1 ) {
		begin   = 1;
	}
	else if ( page != 1 && oldpage < page ) {
		begin   = page    < pagesize        ? 1             : page;
	}
	else if ( page != 1 && oldpage >= page ) {
		begin   = page    < pagesize        ? 1             : page - step + 1;
	}
	//计算结束
	end     = parseInt( begin )    +  parseInt( step );
	//如果end比lastpage大的话，赋值为lastpage
	end     = end      >= lastpage ? lastpage + 1 : end;

	if ( end - begin + 1 != step ) {
		end = begin + step;
	}
	if ( begin + step - 1 > lastpage ) {
		begin = lastpage - step + 1;
		end   = lastpage + 1;
	}

	//前滚、后滚
	//是否显示>> and <<
	var isforward, isback;
	isforward = lastpage - end >= 1          ? true         : false;
	isback    = begin          >  1          ? true         : false;

	//前进/后退到第几页
	var forward , back;
	back      = begin - 1      <= 0          ? 1            : begin - 1;
	forward   = end;

	//backup page
	oldpage = page;

	//////////////////////////////////////////////////////
	//////////////////////////////////////////////////////

	var pv = new vo.pagination_vo();
	//总数
	pv.total     = total;
	//当前页
	pv.page      = parseInt( page );
	//每页的内容数
	pv.pagesize  = pagesize;
	//最后一页
	pv.lastpage  = lastpage;
	//共计多少分页
	pv.loopcount = loopcount;
	//前一页
	pv.previous  = previous;
	//后一页
	pv.next      = next;
	//是否显示前一页
	pv.isprevious = isprevious;
	//是否显示后一页
	pv.isnext     = isnext;
	//开始
	pv.begin    = begin;
	//结束
	pv.end      = end;
	//步长
	pv.step     = step;
	//是否可以前进，指">>"
	pv.isforward  = isforward;
	//是否可以后退，指"<<"
	pv.isback     = isback;
	//前进到第几页
	pv.forward  = forward;
	//后退到第几页
	pv.back     = back;
	//偏移量
	pv.offset   = offset;
	//begin -> end 时的步长
	pv.length   = length;

	console.log( "pv.page           = " + pv.page );
	console.log( "pv.total          = " + pv.total );
	console.log( "pv.loopcount      = " + pv.loopcount );
	console.log( "pv.pagesize       = " + pv.pagesize );
	console.log( "pv.lastpage       = " + pv.lastpage );
	console.log( "pv.begin          = " + pv.begin );
	console.log( "pv.end            = " + pv.end );
	console.log( "pv.previous       = " + pv.previous );
	console.log( "pv.next           = " + pv.next );
	console.log( "pv.isprevious     = " + pv.isprevious );
	console.log( "pv.isnext         = " + pv.isnext );
	console.log( "pv.isforward      = " + pv.isforward );
	console.log( "pv.isback         = " + pv.isback );
	console.log( "pv.forward        = " + pv.forward );
	console.log( "pv.back           = " + pv.back );
	console.log( "pv.offset         = " + pv.offset );
	console.log( "pv.length         = " + pv.length );

	return pv;
}