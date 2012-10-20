function draw_triangle(r, x1,y1,x2,y2,x3,y3) {
	var a = r.circle(x1, y1,20).attr({fill: "#000", stroke: "none"});
	var b = r.circle(x2, y2,20).attr({fill: "#000", stroke: "none"});
	var c = r.circle(x3, y3,20).attr({fill: "#000", stroke: "none"});
	var abline = r.path("M" + (a.getBBox().x +20)+ " " + (a.getBBox().y+ 20) + " L" + (b.getBBox().x + 20) + " " + (b.getBBox().y + 20)).attr({color:"#000","stroke-width": "5"});
	var bcline = r.path("M" + (b.getBBox().x +20)+ " " + (b.getBBox().y+ 20) + " L" + (c.getBBox().x + 20) + " " + (c.getBBox().y + 20)).attr({color:"#000","stroke-width": "5"});
	var caline = r.path("M" + (c.getBBox().x +20)+ " " + (c.getBBox().y+ 20) + " L" + (a.getBBox().x + 20) + " " + (a.getBBox().y + 20)).attr({color:"#000","stroke-width": "5"});
	var aangle = r.text((a.getBBox().x +25),(a.getBBox().y+70),Math.round(find_angle(b.getBBox(),c.getBBox(),a.getBBox()) * (180 / Math.PI)) + "\u00B0").attr({fill: '#000', 'font-size': 28});
	var bangle = r.text((b.getBBox().x +25),(b.getBBox().y+70),Math.round(find_angle(a.getBBox(),c.getBBox(),b.getBBox()) * (180 / Math.PI)) + "\u00B0").attr({fill: '#000', 'font-size': 28});
	var cangle = r.text((c.getBBox().x+30),(c.getBBox().y-40),Math.round(find_angle(a.getBBox(),b.getBBox(),c.getBBox()) * (180 / Math.PI)) + "\u00B0").attr({fill: '#000', 'font-size': 28});

	var atext = r.text((a.getBBox().x+20),(a.getBBox().y+20),"A").attr({fill:"#FFF", 'font-size': 20});
	var btext = r.text((b.getBBox().x+20),(b.getBBox().y+20),"B").attr({fill:"#FFF", 'font-size': 20});
	var ctext = r.text((c.getBBox().x+20),(c.getBBox().y+20),"C").attr({fill:"#FFF", 'font-size': 20});

	var ac = r.text((caline.getBBox().x) + (caline.getBBox().width/2)-40,(caline.getBBox().y) +(caline.getBBox().height/2)-40,(caline.getBBox().width/500 * 10).toFixed(1)).attr({fill:"#000", 'font-size': 20});

	var bc = r.text((bcline.getBBox().x) + (bcline.getBBox().width/2)+40,(bcline.getBBox().y) +(bcline.getBBox().height/2)-40,(bcline.getBBox().height/500 * 10).toFixed(1)).attr({fill:"#000", 'font-size': 20});

	var ab = r.text((abline.getBBox().x) + (abline.getBBox().width/2),(abline.getBBox().y) +(abline.getBBox().height/2)+40,(abline.getBBox().width/500 * 10).toFixed(1)).attr({fill:"#000", 'font-size': 20});

	function move(dx, dy) {
		this.update(dx - (this.dx || 0), dy - (this.dy || 0));
		this.dx = dx;
		this.dy = dy;
	}
	function up() {
		this.dx = this.dy = 0;
	}

	aangle.drag(move, up);
	a.drag(move, up);
	a.update = function(x,y) {
		this.translate(x,y)				
		update_angle_labels();
		abline.attr({path:"M" + (a.getBBox().x +20)+ " " + (a.getBBox().y + 20) + " L" + (b.getBBox().x + 20) + " " + (b.getBBox().y + 20)});
		caline.attr({path:"M" + (c.getBBox().x + 20) + " " + (c.getBBox().y +20) + " L" + (a.getBBox().x + 20) + " " + (a.getBBox().y + 20)});
		aangle.translate(x,y);
		atext.translate(x,y);
	}

	bangle.drag(move, up);
	b.drag(move, up);
	b.update = function(x,y) {
		this.translate(x,y)				
		update_angle_labels();
		bcline.attr({path:"M" + (b.getBBox().x +20) + " " + (b.getBBox().y + 20) + " L" + (c.getBBox().x + 20) + " " + (c.getBBox().y + 20)});
		abline.attr({path:"M" + (a.getBBox().x + 20) + " " + (a.getBBox().y + 20) + " L" + (b.getBBox().x + 20) + " " + (b.getBBox().y + 20)});
		bangle.translate(x,y);
		btext.translate(x,y);
	}

	c.drag(move, up);
	c.update = function(x,y) {
		this.translate(x,y)				
		update_angle_labels();
		caline.attr({path:"M" + (c.getBBox().x + 20) + " " + (c.getBBox().y + 20) + " L" + (a.getBBox().x + 20) + " " + (a.getBBox().y + 20)});
		bcline.attr({path:"M" + (b.getBBox().x + 20) + " " + (b.getBBox().y + 20) + " L" + (c.getBBox().x + 20) + " " + (c.getBBox().y + 20)});
		cangle.translate(x,y);
		ctext.translate(x,y);
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
		ac.attr("x",((caline.getBBox().x) + (caline.getBBox().width/2))-40);
		ac.attr("y",((caline.getBBox().y) + (caline.getBBox().height/2))-40);
		ac.attr("text",(caline.getBBox().width/500 * 10).toFixed(1));
		

		bc.attr("x",((bcline.getBBox().x) + (bcline.getBBox().width/2))+40);
		bc.attr("y",((bcline.getBBox().y) + (bcline.getBBox().height/2))-40);
		bc.attr("text",(bcline.getBBox().width/500 * 10).toFixed(1));

		ab.attr("x",((abline.getBBox().x) + (abline.getBBox().width/2)));
		ab.attr("y",((abline.getBBox().y) + (abline.getBBox().height/2))+40);
		ab.attr("text",(abline.getBBox().width/500 * 10).toFixed(1));
	}
}