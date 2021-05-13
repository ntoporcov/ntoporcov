import React, { useEffect } from "react";
import "../../App.css";
import PropTypes from "prop-types";

const ParticleCanvas = ({ title }) => {
  useEffect(() => {
    let canvas = document.querySelector("#scene");
    let ctx = canvas.getContext("2d");
    let amount = 0;
    let particles = [];
    let mouse = { x: 0, y: 0 };
    let radius = 0.7;

    let colors = ["#fff"];

    let ww = window.innerWidth;
    let wh = window.innerHeight;

    function Particle(x, y) {
      this.x = Math.random() * ww;
      this.y = Math.random() * wh;
      this.dest = {
        x: x,
        y: y,
      };
      this.origins = {
        x: this.x,
        y: this.y,
      };
      this.r = 1;
      this.vx = (Math.random() - 0.5) * 20;
      this.vy = (Math.random() - 0.5) * 20;
      this.accX = 0;
      this.accY = 0;
      this.friction = 0.9;

      this.color = colors[0];
    }

    Particle.prototype.render = function () {
      this.accX = (this.dest.x - this.x) / 200;
      this.accY = (this.dest.y - this.y) / 150;
      this.vx += this.accX;
      this.vy += this.accY;
      this.vx *= this.friction;
      this.vy *= this.friction;

      this.x += this.vx;
      this.y += this.vy;

      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, Math.PI * 2, 0);
      ctx.fill();

      let a = this.x - mouse.x;
      let b = this.y - mouse.y;

      let distance = Math.sqrt(a * a + b * b);
      if (distance < radius * 70) {
        this.accX = (this.x - mouse.x) / 100;
        this.accY = (this.y - mouse.y) / 100;
        this.vx += this.accX;
        this.vy += this.accY;
      }
    };

    Particle.prototype.explode = function () {
      this.accX = this.origins.x;
      this.accY = this.origins.y;
      this.vx += this.accX;
      this.vy += this.accY;
    };

    function onMouseMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function initScene() {
      const canvasWidth = (canvas.width = window.innerWidth);
      const canvasHeight = (canvas.height = window.innerHeight);

      // ctx.rect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = "red";

      ctx.font = "bold " + ww / 12 + "px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(title, 50, 130);

      const data = ctx.getImageData(0, 0, ww, wh).data;
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.globalCompositeOperation = "screen";

      particles = [];
      for (let i = 0; i < ww; i += Math.round(ww / 500)) {
        for (let j = 0; j < wh; j += Math.round(ww / 500)) {
          if (data[(i + j * ww) * 4 + 3] > 150) {
            particles.push(new Particle(i, j));
          }
        }
      }
      amount = particles.length;
    }

    function render() {
      requestAnimationFrame(render);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < amount; i++) {
        particles[i].render();
      }
    }

    window.addEventListener("mousemove", onMouseMove);

    initScene();
    requestAnimationFrame(render);
  }, [title]);

  return (
    <div className="fixed top-0 -z-1 bg-black w-screen h-screen">
      <canvas id={"scene"} />
    </div>
  );
};

ParticleCanvas.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ParticleCanvas;
