document
  .getElementById("open-popup-btn")
  .addEventListener("click", function () {
    document.getElementsByClassName("popup")[0].classList.add("active");
  });

document
  .getElementById("dismiss-popup-btn")
  .addEventListener("click", function () {
    document.getElementsByClassName("popup")[0].classList.remove("active");
  });Vue.config.devtools = true;

Vue.component('card', {
  template: `
    <div class="card-wrap"
      @mousemove="handleMouseMove"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      ref="card">
      <div class="card"
        :style="cardStyle">
        <div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>
        <div class="card-info">
          <slot name="header"></slot>
          <slot name="content"></slot>
        </div>
      </div>
    </div>`,
  mounted() {
    this.width = this.$refs.card.offsetWidth;
    this.height = this.$refs.card.offsetHeight;
  },
  props: ['dataImage'],
  data: () => ({
    width: 0,
    height: 0,
    mouseX: 0,
    mouseY: 0,
    mouseLeaveDelay: null
  }),
  computed: {
    mousePX() {
      return this.mouseX / this.width;
    },
    mousePY() {
      return this.mouseY / this.height;
    },
    cardStyle() {
      const rX = this.mousePX * 30;
      const rY = this.mousePY * -30;
      return {
        transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
      };
    },
    cardBgTransform() {
      const tX = this.mousePX * -40;
      const tY = this.mousePY * -40;
      return {
        transform: `translateX(${tX}px) translateY(${tY}px)`
      }
    },
    cardBgImage() {
      return {
        backgroundImage: `url(${this.dataImage})`
      }
    }
  },
  methods: {
    handleMouseMove(e) {
      this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width/2;
      this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height/2;
    },
    handleMouseEnter() {
      clearTimeout(this.mouseLeaveDelay);
    },
    handleMouseLeave() {
      this.mouseLeaveDelay = setTimeout(()=>{
        this.mouseX = 0;
        this.mouseY = 0;
      }, 1000);
    }
  }
});

const app = new Vue({
  el: '#app'
});
Vue.component('recpatcha', {
  data: function () {
    return {
      show: false
    }
  },
  props: {
    showerror: Boolean,
  },
  template: `<div class="recaptcha-cover">
  <div class="recaptcha flex items-center px-3 py-2 pt-3 rounded-sm">
    <div class="w-3/4 text-sm">
      <div class="flex items-center cursor-pointer -mx-2" @click="show = !show">
        <div class="px-2">
          <div class="checkbox w-8 h-8 bg-white border-2 border-gray-400 rounded-sm hover:border-gray-600"></div>
        </div>
        <div class="px-2 punchline">
          <p>I'm not a robot</p>
        </div>
      </div>
    </div>
    <div class="recaptcha-info w-1/4 text-center text-gray-700">
      <div>
        <img class="w-2/4 mx-auto mb-1" src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="Recaptch logo">
        <p>reCAPTCHA</p>
      </div>
      <div>
        <a href="" class="hover:underline">Privacy</a> - <a href="" class="hover:underline">Terms</a>
      </div>
    </div>
  </div>
  <transition name="fade">
    <recpatcha-test v-if="show" :show="show"></recpatcha-test>
  </transition>
</div>`
});

Vue.component('recpatcha-test', {
  data: function () {
    return {
    }
  },
  props: {
    show: Boolean,
  },
  template: `<div class="recaptcha-test bg-white shadow m-2 p-2">
  <div class="bg-blue-600 text-white p-6">
    <p>Select the box with</p>
    <p class="sub font-bold">Correct captcha</p>
  </div>
  <div class="pt-2">
    <div class="flex flex-wrap">
      <div class="w-1/3 mb-2">
        <recpatcha class="nomargin"></recpatcha>
      </div>
      <div class="w-1/3 mb-2">
        <recpatcha class="nomargin"></recpatcha>
      </div>
      <div class="w-1/3 mb-2">
        <recpatcha class="nomargin"></recpatcha>
      </div>
      <div class="w-1/3 mb-2">
        <recpatcha class="nomargin"></recpatcha>
      </div>
      <div class="w-1/3 mb-2">
        <recpatcha class="nomargin"></recpatcha>
      </div>
      <div class="w-1/3 mb-2">
        <recpatcha class="nomargin"></recpatcha>
      </div>
      <div class="w-1/3">
        <recpatcha class="nomargin"></recpatcha>
      </div>
      <div class="w-1/3">
        <recpatcha class="nomargin"></recpatcha>
      </div>
      <div class="w-1/3">
        <recpatcha class="nomargin"></recpatcha>
      </div>
      <div class="w-full text-center">
         <p v-if="show" class="text-red-700 mt-2">Please check the correct captcha.</p>
      </div>
    </div>
  </div>
  <div class="flex items-center justify-between pt-2">
    <div class="flex">
      <div>
        <img src="https://www.gstatic.com/recaptcha/api2/refresh_black.png" alt="Refresh icon" class="w-10 h-10 cursor-pointer">
      </div>
      <div>
        <img src="https://www.gstatic.com/recaptcha/api2/audio_black.png" alt="Audio icon" class="w-10 h-10 cursor-pointer">
      </div>
      <div>
        <img src="https://www.gstatic.com/recaptcha/api2/info_black.png" alt="Info icon" class="w-10 h-10 cursor-pointer">
      </div>
    </div>
    <div>
      <button type="button" class="bg-blue-600 text-white px-6 py-3 uppercase rounded cursor-pointer">Verify</button>
    </div>
  </div>
</div>`
});

new Vue({ el: '#recaptcha-app' })