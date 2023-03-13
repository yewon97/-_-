export default class Clock {
  constructor() {
    this.clock = document.getElementById("clock");
    this.requestId = null;
  }

  #format(time) {
    return String(time).padStart(2, 0);
  }

  getTime() {
    const date = new Date();
    const hour = this.#format(date.getHours());
    const minute = this.#format(date.getMinutes());
    const second = this.#format(date.getSeconds());
    return `${hour}:${minute}:${second}`;
  }


  renderClock() {
    const render = () => {
      this.clock.innerHTML = this.getTime();
      this.requestId = requestAnimationFrame(render);
    };

    render();
  }

  stopClock() {
    cancelAnimationFrame(this.requestId);
  }
}