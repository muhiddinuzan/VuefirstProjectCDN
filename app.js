new Vue({
    el: '#app',
    data: {
        me_health: 100,
        monster_health: 100,
        game_is_on : false,
        logs : []
    },
    methods: {
        start_game: function() {
            this.game_is_on = true;
        },

        attack : function() {
            var point = Math.ceil(Math.random() * 10);
            this.monster_health -= point;
            this.monster_attack();
            this.add_to_log({turn : "Player", text : "Player Attack (" + point + ")"});
        },

        special_attack : function() {
            var point = Math.ceil(Math.random() * 25);
            this.monster_health -= point;
            this.monster_attack();
            this.add_to_log({turn : "Player", text : "Special Player Attack (" + point + ")"});
        },

        heal_up : function() {
            var point = Math.ceil(Math.random() * 25);
            this.me_health += point;
            this.monster_attack();
            this.add_to_log({turn : "Player", text : "Heal (" + point + ")"});
        },

        give_up : function() {
            this.me_health = 0; 
            this.add_to_log({turn : "Player", text : "Player Give Up..."});
    

        },
        monster_attack : function() {
            var point = Math.ceil(Math.random() * 10);
            this.me_health -= point;
            this.add_to_log({turn : "Monster", text : "Monster Attack (" + point + ")"});
        },
        add_to_log : function(log) {
            this.logs.push(log);
        }
    },
    watch : {
        me_health : function(value) {
            if (value <= 0) {
                this.me_health = 0;
                if(confirm("You Lose! New Game?")) {
                    this.me_health = 100;
                    this.monster_health = 100;
                    this.logs = [];
                }
            }else if (value > 100) {
                this.me_health = 100;
            }
        },
        monster_health : function(value) {
            if (value <= 0) {
                this.monster_health = 0;
                if(confirm("You Win! New Game?")) {
                    this.me_health = 100;
                    this.monster_health = 100;
                    this.logs = [];
                }
            }
        },
    }
})