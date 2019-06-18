var joystick = new Vue({
  el: '#joystick',
  data: {
    message: 'Hello Vue!',
    seen: true
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    },

    click: function(){
    	this.seen = false
    }
  }
})