---
title: Lab
layout: page
---

# Lab

This is the lab page content.



<link rel="stylesheet" href="/css/styles.css">

<div class="canvas-container" id="canvas-container">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
  <script>
    // let ball
    let balls = []
    let colors = "fff400-ffdb00-ff7a00-ff5000-ff0000".split("-").map(a=>"#"+a)
    let particleGraphics
    class Ball{
    	constructor(p,v,a,r,t){
    		this.p=p
    		this.v=v
    		this.a=a
    		this.r=r
    		this.color = color(random(colors))
    		this.time = t
    	}
    	update(){
    		this.p.add(this.v)
    		this.v.add(this.a)
    		this.time-=0.2
    		colorMode(HSB)
    		if (this.r<=0.05 || this.time<-20){
    			// this.r = 0
            // this.color.setAlpha(0); // 將顏色的透明度設置為 0，讓物件消失
            let index = balls.indexOf(this);
            if (index !== -1) {
                balls.splice(index, 1);
            }	
        } else if (this.time>=0){
    				this.r -=0.1
            let h = hue(this.color); // 获取当前颜色的色相
            let s = saturation(this.color); // 获取当前颜色的饱和度
    				// brightness(this.color)
            let b = map(this.time, 2,10 , 1, 255); // 根据时间调整亮度，这里使用了 0 到 100 的范围
            this.color = color(h, s, b); // 使用调整后的 HSB 值创建新的颜色
        }
    		if ((this.p.y >= 400) && (this.v.y >0)){
    			this.v.y = -this.v.y*0.5
    		}		
    	}
    	draw(){
    		drawingContext.shadowColor = color(0) 
    		noStroke()
    		fill(this.color)
    		circle(this.p.x,this.p.y,this.r)
    	}
    }
    function setup() {
        let canvas = createCanvas(400, 400);
        canvas.parent('canvas-container'); // 將畫布添加到容器中
        // resizeCanvasToContainer();        
    	particleGraphics = createGraphics(width, height);
    	background(100);
    }
    // function windowResized() {
    //   resizeCanvasToContainer();
    // }    
    // function resizeCanvasToContainer() {
    //   let containerWidth = document.getElementById('canvas-container').offsetWidth;
    //   let containerHighe = document.getElementById('canvas-container').offsetHighet;
    //   resizeCanvas(containerWidth, containerHighe);
    // }    
    function draw() {
    	particleGraphics.clear(0, 0, width, height)
    	background(100);
    	// circle(ball.p.x, ball.p.y, ball.r);
    	for(let obj of balls){
    		obj.update()
    		obj.draw()
    	}
    	push();
    	blendMode(ADD);
    	// drawingContext.filter = "blur(4px)";
    	image(particleGraphics, 0 ,0);
    	pop();
    }
    function mousePressed() {
    		for(let i = 0;i<200;i++){
    			let newBall = new Ball(
    				createVector(mouseX+random(-10,10)*sin(random(PI)),mouseY+random(-2,2)),
    				createVector(random(-5,5),random(-2,3)),
    				createVector(0,9.8/8),
    				random(10),
    				random(8,12)
    				)
    			      // 添加新球体之前检查是否已存在具有相同位置的球体对象，并且未被移除
          let existingBall = balls.find(ball => ball.p.equals(newBall.p));
          if (!existingBall) {
              balls.push(newBall);
          }
		// balls.push(newBall)
    	}
    }
  </script>
</div>