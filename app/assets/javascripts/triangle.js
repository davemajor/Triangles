function draw_triangle(r, x1,y1,x2,y2,x3,y3,opacity,draggable) {	
	var a = r.circle(x1, y1,20).attr({fill: "#000", stroke: "none", opacity:opacity});
	var b = r.circle(x2, y2,20).attr({fill: "#000", stroke: "none", opacity:opacity});
	var c = r.circle(x3, y3,20).attr({fill: "#000", stroke: "none", opacity:opacity});

	var abline = r.path("M" + (a.getBBox().x +20)+ " " + (a.getBBox().y+ 20) + " L" + (b.getBBox().x + 20) + " " + (b.getBBox().y + 20)).attr({color:"#000","stroke-width": "5", opacity:opacity});
	var bcline = r.path("M" + (b.getBBox().x +20)+ " " + (b.getBBox().y+ 20) + " L" + (c.getBBox().x + 20) + " " + (c.getBBox().y + 20)).attr({color:"#000","stroke-width": "5", opacity:opacity});
	var caline = r.path("M" + (c.getBBox().x +20)+ " " + (c.getBBox().y+ 20) + " L" + (a.getBBox().x + 20) + " " + (a.getBBox().y + 20)).attr({color:"#000","stroke-width": "5", opacity:opacity});
	var aangle = r.text((a.getBBox().x +25),(a.getBBox().y+70),Math.round(find_angle(b.getBBox(),c.getBBox(),a.getBBox()) * (180 / Math.PI)) + "\u00B0").attr({fill: '#000', 'font-size': 28, opacity:opacity});
	var bangle = r.text((b.getBBox().x +25),(b.getBBox().y+70),Math.round(find_angle(a.getBBox(),c.getBBox(),b.getBBox()) * (180 / Math.PI)) + "\u00B0").attr({fill: '#000', 'font-size': 28, opacity:opacity});
	var cangle = r.text((c.getBBox().x+30),(c.getBBox().y-40),Math.round(find_angle(a.getBBox(),b.getBBox(),c.getBBox()) * (180 / Math.PI)) + "\u00B0").attr({fill: '#000', 'font-size': 28, opacity:opacity});

	var atext = r.text((a.getBBox().x+20),(a.getBBox().y+20),"A").attr({fill:"#FFF", 'font-size': 20, opacity:opacity});
	var btext = r.text((b.getBBox().x+20),(b.getBBox().y+20),"B").attr({fill:"#FFF", 'font-size': 20, opacity:opacity});
	var ctext = r.text((c.getBBox().x+20),(c.getBBox().y+20),"C").attr({fill:"#FFF", 'font-size': 20, opacity:opacity});
	
	var acover = r.circle(x1, y1,20).attr({fill: "#000", stroke: "none", opacity:0.0});
	var bcover = r.circle(x2, y2,20).attr({fill: "#000", stroke: "none", opacity:0.0});
	var ccover = r.circle(x3, y3,20).attr({fill: "#000", stroke: "none", opacity:0.0});
	
	$('input:hidden[id=triangle_x1]').val(Math.round(a.getBBox().x +20));
	$('input:hidden[id=triangle_y1]').val(Math.round(a.getBBox().y +20));
	$('input:hidden[id=triangle_x2]').val(Math.round(b.getBBox().x +20));
	$('input:hidden[id=triangle_y2]').val(Math.round(b.getBBox().y +20));		
	$('input:hidden[id=triangle_x3]').val(Math.round(c.getBBox().x +20));
	$('input:hidden[id=triangle_y3]').val(Math.round(c.getBBox().y +20));

	function distance_between(x1,y1, x2,y2) {
		deltaX = x1 - x2;
    	deltaY = y1 - y2;
    	return Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2));
	}

	function mid_point (x,y) {
		return Math.min(x,y) + ((Math.max(x,y) - Math.min(x,y))/2);
	}
 	

	var ac = r.text(mid_point(a.getBBox().x,c.getBBox().x)-20,mid_point(a.getBBox().y,c.getBBox().y)-20,(distance_between(a.getBBox().x,a.getBBox().y,c.getBBox().x,c.getBBox().y)/50).toFixed(1)).attr({fill:"#000", 'font-size': 20, opacity:opacity});

	var bc = r.text(mid_point(b.getBBox().x,c.getBBox().x)+40,mid_point(b.getBBox().y,c.getBBox().y)-20,(distance_between(b.getBBox().x,b.getBBox().y,c.getBBox().x,c.getBBox().y)/50).toFixed(1)).attr({fill:"#000", 'font-size': 20, opacity:opacity});

	var ab = r.text(mid_point(a.getBBox().x,b.getBBox().x)+20,mid_point(a.getBBox().y,b.getBBox().y)+80,(distance_between(a.getBBox().x,a.getBBox().y,b.getBBox().x,b.getBBox().y)/50).toFixed(1)).attr({fill:"#000", 'font-size': 20, opacity:opacity});

if (draggable) {
	function move(dx, dy) {
		this.update(dx - (this.dx || 0), dy - (this.dy || 0));
		this.dx = dx;
		this.dy = dy;
	}
	function up() {
		this.dx = this.dy = 0;
	}

	acover.drag(move, up);
	acover.update = function(x,y) {
		this.translate(x,y);
		a.translate(x,y);				
		update_angle_labels();
		abline.attr({path:"M" + (a.getBBox().x +20)+ " " + (a.getBBox().y + 20) + " L" + (b.getBBox().x + 20) + " " + (b.getBBox().y + 20)});
		caline.attr({path:"M" + (c.getBBox().x + 20) + " " + (c.getBBox().y +20) + " L" + (a.getBBox().x + 20) + " " + (a.getBBox().y + 20)});
		aangle.translate(x,y);
		atext.translate(x,y);
		$('input:hidden[id=triangle_x1]').val(Math.round(a.getBBox().x +20));
		$('input:hidden[id=triangle_y1]').val(Math.round(a.getBBox().y +20));
	}

	bcover.drag(move, up);
	bcover.update = function(x,y) {
		this.translate(x,y);
		b.translate(x,y);
		update_angle_labels();
		bcline.attr({path:"M" + (b.getBBox().x +20) + " " + (b.getBBox().y + 20) + " L" + (c.getBBox().x + 20) + " " + (c.getBBox().y + 20)});
		abline.attr({path:"M" + (a.getBBox().x + 20) + " " + (a.getBBox().y + 20) + " L" + (b.getBBox().x + 20) + " " + (b.getBBox().y + 20)});
		bangle.translate(x,y);
		btext.translate(x,y);
		$('input:hidden[id=triangle_x2]').val(Math.round(b.getBBox().x +20));
		$('input:hidden[id=triangle_y2]').val(Math.round(b.getBBox().y +20));
	}

	ccover.drag(move, up);
	ccover.update = function(x,y) {
		this.translate(x,y);
		c.translate(x,y);
		update_angle_labels();
		caline.attr({path:"M" + (c.getBBox().x + 20) + " " + (c.getBBox().y + 20) + " L" + (a.getBBox().x + 20) + " " + (a.getBBox().y + 20)});
		bcline.attr({path:"M" + (b.getBBox().x + 20) + " " + (b.getBBox().y + 20) + " L" + (c.getBBox().x + 20) + " " + (c.getBBox().y + 20)});
		cangle.translate(x,y);
		ctext.translate(x,y);
		$('input:hidden[id=triangle_x3]').val(Math.round(c.getBBox().x +20));
		$('input:hidden[id=triangle_y3]').val(Math.round(c.getBBox().y +20));
	}

	function find_angle(p0,p1,c) {
		var p0c = Math.sqrt(Math.pow(c.x-p0.x,2)+ Math.pow(c.y-p0.y,2)); // p0->c (b)   
		var p1c = Math.sqrt(Math.pow(c.x-p1.x,2)+Math.pow(c.y-p1.y,2)); // p1->c (a)
		var p0p1 = Math.sqrt(Math.pow(p1.x-p0.x,2)+Math.pow(p1.y-p0.y,2)); // p0->p1 (c)
		return Math.acos((p1c*p1c+p0c*p0c-p0p1*p0p1)/(2*p1c*p0c));
	}

	function update_angle_labels() {
		aangle.attr("text","" + Math.round(find_angle(b.getBBox(),c.getBBox(),a.getBBox()) * (180 / Math.PI)) + "\u00B0");
		bangle.attr("text","" + Math.round(find_angle(a.getBBox(),c.getBBox(),b.getBBox()) * (180 / Math.PI)) + "\u00B0");
		cangle.attr("text","" + Math.round(find_angle(a.getBBox(),b.getBBox(),c.getBBox()) * (180 / Math.PI)) + "\u00B0");
		ac.attr("x",mid_point(a.getBBox().x,c.getBBox().x)-20);
		ac.attr("y",mid_point(a.getBBox().y,c.getBBox().y)-20);
		ac.attr("text",((distance_between(a.getBBox().x,a.getBBox().y,c.getBBox().x,c.getBBox().y)/50).toFixed(1)));

		bc.attr("x",mid_point(b.getBBox().x,c.getBBox().x)+40);
		bc.attr("y",mid_point(b.getBBox().y,c.getBBox().y)-20);
		bc.attr("text",((distance_between(b.getBBox().x,b.getBBox().y,c.getBBox().x,c.getBBox().y)/50).toFixed(1)));

		ab.attr("x",mid_point(a.getBBox().x,b.getBBox().x)+20);
		ab.attr("y",mid_point(a.getBBox().y,b.getBBox().y)+80);
		ab.attr("text",((distance_between(a.getBBox().x,a.getBBox().y,b.getBBox().x,b.getBBox().y)/50).toFixed(1)));
	}
}
}